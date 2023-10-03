<template>
  <div class="centered-container bg-black">
    <div class="case">
      <div class="text-h6 text-bold text-white">Display Scraped Data</div>
    </div>
    <q-card class="my-card backdrop-blur-md">
      <div class="card-body">
        <apexchart
          ref="chart"
          :options="chartOptions"
          :series="chartData"
          type="line"
        />
      </div>
      <q-card-section>
        <div class="text-h6">Upload Config File</div>
      </q-card-section>
    </q-card>
    <div class="button">
      <q-btn class="btn" @click="back" label="Back" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // inputData: {
    //   type: Array, // Adjust the type based on your data structure
    //   required: true,
    // },
    inputData: [],
  },
  data() {
    return {
      chartOptions: {
        // Configure ApexCharts options as needed
      },
      chartSeries: [
        {
          name: "Series 1",
          data: this.inputData, // Pass the data to ApexCharts
        },
      ],
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    created() {
      const inputData = this.$route.query.inputData;
      console.log(inputData);
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
  height: 100vh;
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
