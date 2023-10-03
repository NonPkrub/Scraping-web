<template>
  <div class="centered-container bg-black">
    <div class="case">
      <div class="text-h3 text-bold text-white">
        Scrape Data Case Study: Air Quality
      </div>
    </div>
    <div class="case-1">
      <div class="text-h6 text-bold text-white">Step1: Scraping Engine</div>
      <div class="text-h6 text-bold text-white">
        Step2: Scraped Data Visualize
      </div>
    </div>
    <q-card class="my-card" clickable v-ripple @click="find">
      <q-img class="card" src="../assets/images/puppeteer.jpg">
        <div class="absolute-bottom">
          <div class="text-h2 text-bold">Scrape Data</div>
        </div>
      </q-img>
    </q-card>

    <q-card class="my-card" clickable v-ripple @click="valet">
      <q-img
        class="card"
        src="../assets/images/10-types-of-data-visualization-1-1024x614.jpg"
      >
        <div class="absolute-bottom">
          <div class="text-h2 text-bold">Visualize Data</div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<style>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  justify-content: space-evenly;
}
.my-card {
  margin: 16px;
}

.card {
  width: 300px;
  height: 300px;
}

.clickable:hover {
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
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
.case-1 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
}
</style>

<script>
export default {
  name: "PageIndex",
  methods: {
    find() {
      this.$router.push("/scrape");
    },
    valet() {
      this.$router.push("/visual");
    },
  },
};
</script>
