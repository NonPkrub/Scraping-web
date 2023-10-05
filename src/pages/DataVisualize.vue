<template>
  <div class="centered-container bg-black">
    <div class="case-1">
      <div class="text-h6 text-bold text-white">Take two scraped file</div>
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
    </q-card>
    <!-- <q-card class="my-card">
      <q-img class="card" src="../assets/images/JSON-vs-CSV.jpg"> </q-img>
      <q-card-section>
        <div class="text-h6">Upload JSON or CSV File</div>
        <q-input
          ref="fileInput2"
          outlined
          type="file"
          accept=".json, .csv"
          @change="handleFileChange2($event)"
        />
      </q-card-section>

      <q-card-section v-if="data2">
        <div class="text-h6">Uploaded: {{ name2 }}</div>
      </q-card-section>
    </q-card> -->
    <div class="button">
      <q-btn class="btn" @click="back" label="Back" />
      <q-btn class="btn" @click="clearInput" label="Clear" />
      <q-btn class="btn" @click="confirm" label="Confirm" />
    </div>
  </div>
</template>

<script>
import { useStore } from "../stores/scraped-data";

export default {
  data() {
    return {
      data1: null,
      //data2: null,
      name1: null,
      //name2: null,
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
          // console.log(text);
          // this.data1 = JSON.parse(text);

          console.log(Object.values(text));
          this.data1 = Object.values(text);
          // this.data1 = JSON.parse(JSON.stringify(text));
          this.name1 = selectedFile.name;
        } else if (selectedFile.name.endsWith(".csv")) {
          const csvData = await this.readFileAsCsv(selectedFile);
          console.log("Parsed CSV data:", csvData);
          this.data1 = csvData;
          this.name1 = selectedFile.name;
        }
      }
    },

    // async handleFileChange2() {
    //   const selectedFile = event.target.files[0];
    //   console.log("Files:", selectedFile);
    //   // const files = event.target.files; // Use event.target.files to access selected files
    //   if (selectedFile) {
    //     const blob = new Blob([selectedFile], { type: selectedFile.type });
    //     console.log("Blob:", blob);

    //     if (selectedFile.name.endsWith(".json")) {
    //       const text = await this.readFileAsJson(blob);
    //       // console.log(text);
    //       // this.data2 = JSON.parse(text);
    //       // console.log("Parsed JSON data:", this.data2);
    //       // this.data2 = JSON.parse(JSON.stringify(text));
    //       this.data2 = Object.values(text);
    //       this.name2 = selectedFile.name;
    //     } else if (selectedFile.name.endsWith(".csv")) {
    //       const csvData = await this.readFileAsCsv(selectedFile);
    //       console.log("Parsed CSV data:", csvData);
    //       this.data2 = csvData;
    //       this.name2 = selectedFile.name;
    //     }
    //   }
    // },
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
    clearInput() {
      const fileInput1 = this.$refs.fileInput1;
      //const fileInput2 = this.$refs.fileInput2;

      if (fileInput1) {
        fileInput1.$el.querySelector('input[type="file"]').value = "";
      }

      // if (fileInput2) {
      //   fileInput2.$el.querySelector('input[type="file"]').value = "";
      // }

      // Clear both data properties
      this.data1 = null;
      //this.data2 = null;
    },
    async confirm() {
      if (this.data1) {
        // const combinedData = [...this.data1, ...this.data2];
        // console.log(combinedData);
        const store = useStore();

        store.setData1(this.data1);

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
  padding-top: 10%;
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
  padding-bottom: 10%;
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
</style>
