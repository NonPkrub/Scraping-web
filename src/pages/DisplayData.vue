<template>
  <div class="centered-container bg-black">
    <div class="case">
      <div class="text-h6 text-bold text-white">Display Scraped Data</div>
    </div>
    <q-card class="my-card backdrop-blur-md">
      <div class="card-body">
        <apexchart
          width="500"
          type="line"
          :options="chartOptions"
          :series="chartSeries"
        ></apexchart>
      </div>
    </q-card>

    <div class="button">
      <q-btn class="btn" @click="back" label="Back" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { useStore } from "../stores/scraped-data"; //

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    inputData: [],
  },

  methods: {
    back() {
      this.$router.push("/map");
    },
  },
  setup() {
    const store = useStore(); // Get the Pinia store instance
    const data1 = store.getNewData;

    console.log(data1);
    const categories = data1.map((item) => item.day);
    console.log(
      "🚀 ~ file: DisplayData.vue:78 ~ setup ~ categories:",
      categories
    );
    const seriesData = data1.map((item) => item.AQI);
    console.log(
      "🚀 ~ file: DisplayData.vue:80 ~ setup ~ seriesData:",
      seriesData
    );
    const chartOptions = {
      xaxis: {
        categories: categories,
      },
    };

    const chartSeries = [
      {
        name: "Air Quality Index",
        data: seriesData,
      },
    ];
    return {
      chartOptions,
      chartSeries,
    };
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
  height: 100vh;
  padding-top: 5%;
}
.my-card {
  margin: 16px;
}

.card {
  width: 100%;
  height: 100%;
}

.black-theme {
  background-color: #000; /* Black background */
  color: white; /* Text color */
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
.case {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
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
</style>
