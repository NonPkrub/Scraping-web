<template>
  <div class="q-pa-md">
    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      :width="200"
      class="bg-black text-white"
      :breakpoint="500"
    >
      <q-item clickable v-ripple @click="scrollToSection('dataSection')">
        <q-item-section> Data Selector </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="scrollToSection('scrapeSection')">
        <q-item-section> Scraping Engine API </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="scrollToGraphInput">
        <q-item-section> Graph input </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="scrollToSection('mapSection')">
        <q-item-section> Map </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md text-white">
        <h5 id="dataSection">Data Selector</h5>
        <p>
          Open the target website and inspect the website to select the target
          element.Next, execute the Data Selector extension and fill in the
          target element and configuration data in the popup of the extension to
          generate the config file
        </p>
        <q-img class="card" src="../assets/images/Picture1.jpg"> </q-img>
        <h5 id="scrapeSection">Scraping Engine API</h5>
        <p>
          The output of the Data Selector is imported into web scraping website
          to call the Scraping Engine API as request body to trigger the
          execution of Puppeteer, which then controls Chrome to perform web
          scraping of data
        </p>
        <q-img class="card" src="../assets/images/ds.jpg"> </q-img>
        <h5 id="graphInputSection">Graph input</h5>
        <p>
          Transfer the data obtained through scraping onto the input page
          dedicated to graph visualization. This process involves seamlessly
          integrating the scraped data into the graph input page, providing a
          comprehensive and visual representation of the collected data. Users
          can leverage this feature to gain insights, trends, and patterns from
          the visualized data through the scraping process.
        </p>
        <q-img class="card" src="../assets/images/scrape.jpg"> </q-img>
        <h5 id="mapSection">Map</h5>
        <p>
          The inclusion of a map is an optional feature in the daily scraping
          routine, allowing users to choose whether to incorporate geographical
          data into their daily scraping activities. This optional map
          functionality provides flexibility in the data collection process.
          Users can decide whether to store location-based information along
          with the scraped data in the database, tailoring the system to meet
          specific project requirements. This additional feature enhances the
          adaptability of the tool, accommodating a variety of scraping needs
          while maintaining the convenience of daily data storage in the
          database.
        </p>
        <q-img class="card" src="../assets/images/sa.jpg"> </q-img>
      </q-page>
    </q-page-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const drawerLeft = ref(false);
    const drawerRight = ref(true);
    const scrollToGraphInput = () => {
      const graphInputElement = document.getElementById("graphInputSection");
      if (graphInputElement) {
        graphInputElement.scrollIntoView({ behavior: "smooth" });
      }
    };

    const scrollToSection = (sectionId) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    };
    // onMounted(() => {
    //   scrollToGraphInput();
    // });
    return {
      drawerLeft,
      drawerRight,
      scrollToGraphInput,
      scrollToSection,
    };
  },
};
</script>
