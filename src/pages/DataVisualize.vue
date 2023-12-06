<template>
  <div class="centered-container bg-black">
    <div class="case-1">
      <div class="text-h6 text-bold text-white">Take scraped file</div>
    </div>
    <q-card class="my-card backdrop-blur-md">
      <q-img class="card" src="../assets/images/JSON-vs-CSV.jpg"> </q-img>
      <q-card-section>
        <div class="text-h6">Upload JSON or CSV File</div>
        <q-input
          ref="fileInput1"
          outlined
          type="file"
          accept=".json, .csv"
          @change="handleFileChange1($event)"
        />
      </q-card-section>
      <q-card-section v-if="data1">
        <div class="text-h6">Uploaded: {{ name1 }}</div>
      </q-card-section>
      <!-- <div class="select">
        <q-card-section>
          <div class="text">X-Axis:</div>
          <q-select v-model="xAxis" :options="xAxisOptions" outlined />
        </q-card-section>

        <q-card-section>
          <div class="text">Y-Axis:</div>
          <q-select v-model="yAxis" :options="yAxisOptions" outlined />
        </q-card-section>
      </div> -->
    </q-card>

    <div class="button">
      <q-btn class="btn" @click="back" label="Back" />
      <q-btn class="btn" @click="clearInput" label="Clear" />
      <q-btn class="btn" @click="confirm" label="Confirm" />
    </div>
  </div>
</template>

<script>
import { useStore } from "../stores/scraped-data";
import Papa from "papaparse";
export default {
  data() {
    return {
      data1: null,
      name1: null,
      // xAxis: null,
      // yAxis: null,
      xAxisOptions: [],
      yAxisOptions: [],
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },

    async handleFileChange1() {
      const selectedFile = event.target.files[0];
      console.log("Files:", selectedFile);
      if (selectedFile) {
        const blob = new Blob([selectedFile], { type: selectedFile.type });
        console.log("Blob:", blob);

        if (selectedFile.name.endsWith(".json")) {
          const text = await this.readFileAsJson(blob);

          console.log(Object.values(text));
          this.data1 = Object.values(text);

          this.name1 = selectedFile.name;
        } else if (selectedFile.name.endsWith(".csv")) {
          const csvData = await this.readFileAsCsv(selectedFile);
          console.log("Parsed CSV data:", csvData);
          this.data1 = csvData;
          this.name1 = selectedFile.name;
        }
      }
    },

    readFileAsJson(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target.result;
          try {
            const jsonData = JSON.parse(text);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (event) => {
          reject(event.target.error);
        };
        reader.readAsText(file);
      });
    },
    async readFileAsCsv(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const csvData = reader.result;
          Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
              resolve(result.data);
            },
            error: (error) => {
              reject(error.message);
            },
          });
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsText(file);
      });
    },
    createAxisOptions() {
      const xAxisOptions = [];
      const yAxisOptions = [];

      for (let i = 0; i < this.data1.length; i++) {
        const innerArray = this.data1[i];

        for (let j = 0; j < innerArray.length; j++) {
          const dayInfo = innerArray[j][j];
          const infoArray = dayInfo.split(",");

          const dayOfWeek = infoArray[0];
          const AQI = Number(infoArray[3]);

          // Assuming dayOfWeek and AQI are strings, you can add them to options
          xAxisOptions.push({
            label: dayOfWeek,
            value: dayOfWeek,
          });
          yAxisOptions.push({
            label: AQI,
            value: AQI,
          });

          // console.log(`Day ${j + 1}: ${dayInfo}`);
        }
      }

      // Set the options to the component's data properties
      this.xAxisOptions = xAxisOptions;
      this.yAxisOptions = yAxisOptions;
    },
    createCsvAxisOptions() {
      const xAxisOptions = [];
      const yAxisOptions = [];

      for (let i = 0; i < this.data1.length; i++) {
        const dayInfo = this.data1[i];

        if (dayInfo && dayInfo.Header1 && dayInfo.Header4) {
          const dayOfWeek = dayInfo.Header1;
          const AQI = dayInfo.Header4;

          xAxisOptions.push({
            label: dayOfWeek,
            value: dayOfWeek,
          });

          yAxisOptions.push({
            label: AQI,
            value: AQI,
          });
        }
      }

      // Set the options to the component's data properties
      this.xAxisOptions = xAxisOptions;
      this.yAxisOptions = yAxisOptions;
    },
    clearInput() {
      const fileInput1 = this.$refs.fileInput1;
      //const fileInput2 = this.$refs.fileInput2;

      if (fileInput1) {
        fileInput1.$el.querySelector('input[type="file"]').value = "";
      }

      this.data1 = null;
    },
    async confirm() {
      if (this.data1) {
        const store = useStore();
        if (this.name1.endsWith(".json")) {
          this.createAxisOptions();
          const graph = {
            xAxisOptions: this.xAxisOptions,
            yAxisOptions: this.yAxisOptions,
          };
          console.log(graph);
          store.setData1(graph);
        } else if (this.name1.endsWith(".csv")) {
          this.createCsvAxisOptions();
          const graph = {
            xAxisOptions: this.xAxisOptions,
            yAxisOptions: this.yAxisOptions,
          };
          console.log(graph);
          store.setData1(graph);
        }

        this.$router.push({
          path: "/display",
        });
      } else {
        alert("Please upload both JSON and CSV files before confirming.");
      }
    },
  },
};
</script>

<style scoped>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  padding-top: 5%;
  height: 100vh;
}
.my-card {
  margin: 16px;
}

.btn {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 16px;
  white-space: nowrap; /* Prevents text from wrapping */
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  padding-bottom: 1%;
  width: 100%;
}

.card {
  width: 100%;
  height: 100%;
}
.case-1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}
.black-theme {
  background-color: #000; /* Black background */
  color: white; /* Text color */
}
.select {
  display: flex;
  justify-content: space-around;
}
</style>
