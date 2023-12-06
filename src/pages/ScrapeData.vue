<template>
  <div class="centered-container bg-black">
    <div class="case-1">
      <div class="text-h6 text-bold text-white">
        Put the config file from Data Selector
      </div>
      <div class="text-h6 text-bold text-white">
        If the target element has a pattern like element(1),element(2) you can
        change it to element(i) for any element that you set for the dataset.
        Also, nth-child
      </div>
    </div>
    <q-card class="my-card backdrop-blur-md">
      <q-img class="card" src="../assets/images/config.jpg"> </q-img>
      <q-card-section>
        <div class="text-h6">Upload Config File</div>
        <q-input
          ref="fileInput"
          outlined
          type="file"
          accept=".json"
          @change="handleFileChange($event)"
        />
      </q-card-section>
      <q-card-section v-if="data">
        <div class="text-h6">Uploaded: {{ name }}</div>
      </q-card-section>
    </q-card>
    <div class="overlay" v-if="loading">
      <q-spinner-hourglass
        :size="100"
        :color="spinnerColor"
        :thickness="5"
        v-if="loading"
      />
    </div>
    <div class="button">
      <q-btn class="btn" @click="back" label="Back" />
      <q-btn class="btn" @click="clearInput" label="Clear" />
      <q-btn class="btn" @click="startScraping" label="Confirm" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      name: null,
      loading: false,
      spinnerColor: "secondary",
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },

    async handleFileChange() {
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      if (selectedFile) {
        const blob = new Blob([selectedFile], { type: selectedFile.type });

        if (selectedFile.name.endsWith(".json")) {
          const text = await this.readFileAsJson(blob);
          this.data = JSON.parse(text);
          this.name = selectedFile.name;
        }
      }
    },
    readFileAsJson(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (event) => {
          reject(event.target.error);
        };
        reader.readAsText(file);
      });
    },
    clearInput() {
      const fileInput = this.$el.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
      this.data = null;
    },
    async startScraping() {
      try {
        this.loading = true;
        const fileInput = this.data;
        if (fileInput === "db") {
          const collect = await fetch(
            "https://scrape-api-jcvs4udnka-as.a.run.app/api/config",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fileInput),
            }
          );
          console.log(collect);
          this.$router.push("/database");
        } else {
          const response = await fetch(
            "https://scrape-api-jcvs4udnka-as.a.run.app/api/scrape",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(fileInput),
            }
          );
          console.log(response);
          if (response.ok) {
            const scrapedData = await response.json();
            console.log("Scraping complete!");
            console.log(scrapedData);
            if (fileInput.format === "json") {
              const jsonDataBlob = new Blob([JSON.stringify(scrapedData)], {
                type: "application/json",
              });
              const blobUrl = URL.createObjectURL(jsonDataBlob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = blobUrl;
              a.download = `${fileInput.filename}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
            } else if (fileInput.format === "csv") {
              const data = scrapedData.data;
              const header = data[0]
                .split(",")
                .map((value, index) => `Header${index + 1}`)
                .join(",");
              let csv = `${header}\n`;

              for (let index = 0; index < data.length; index++) {
                const values = data[index].split(",");
                csv += `${values.slice(0, 5).join(",")},${values
                  .slice(6)
                  .join(",")}\n`;
              }

              const csvBlob = new Blob([csv], { type: "text/csv" });
              const blobUrl = URL.createObjectURL(csvBlob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = blobUrl;
              a.download = `${fileInput.filename}.csv`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
            }
          } else {
            console.error("Error during scraping:", response.statusText);
          }
        }

        console.log("Scraping complete!");
      } catch (error) {
        console.error("Error during scraping:", error);
      } finally {
        this.loading = false;
        console.log("Loading completed.");
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
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
  /* height: 100vh; */
  padding-top: 6%;
  height: 115vh;
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
.case-1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}
.card {
  width: 100%;
  height: 100%;
}

.black-theme {
  background-color: #000; /* Black background */
  color: white; /* Text color */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
