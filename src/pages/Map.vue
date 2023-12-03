<template>
  <div>
    <div id="phuket-map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
export default {
  name: "PhuketMap",
  data() {
    return {
      map: null,
      locations: [],
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    async initializeMap() {
      const map = L.map("phuket-map").setView([8.2884, 98.647], 8); // Adjust coordinates and zoom level
      this.map = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
      // Marker for Phuket
      // L.marker([8.032003, 98.333466])
      //   .addTo(map)
      //   .bindPopup("Thalang")
      //   .openPopup();
      // L.marker([7.91779, 98.33322]).addTo(map).bindPopup("Kathu").openPopup();
      // L.marker([7.907632, 98.385529])
      //   .addTo(map)
      //   .bindPopup("Mueang Phuket")
      //   .openPopup();
      // // Marker for Phang Nga
      // L.marker([8.45091, 98.52985])
      //   .addTo(map)
      //   .bindPopup("Mueang Phang Nga")
      //   .openPopup();

      // L.marker([7.996338, 98.594765])
      //   .addTo(map)
      //   .bindPopup(" Ko Yao")
      //   .openPopup();

      // L.marker([8.74139, 98.47542]).addTo(map).bindPopup("Kapong").openPopup();

      // L.marker([8.28433, 98.3895])
      //   .addTo(map)
      //   .bindPopup("Takua Thung")
      //   .openPopup();

      // L.marker([8.87509, 98.352654])
      //   .addTo(map)
      //   .bindPopup("Takua Pa")
      //   .openPopup();

      // L.marker([9.223691, 98.440357])
      //   .addTo(map)
      //   .bindPopup("Khura Buri")
      //   .openPopup();

      // L.marker([8.53768, 98.63208])
      //   .addTo(map)
      //   .bindPopup("Thap Put")
      //   .openPopup();

      // L.marker([8.48995, 98.31292])
      //   .addTo(map)
      //   .bindPopup("Thai Mueang")
      //   .openPopup();
      await this.fetchMarkerData();
      this.addMarkers();
    },
    async fetchMarkerData() {
      try {
        const response = await axios.get("http://localhost:8080/api/district");
        this.locations = response.data;
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    },
    addMarkers() {
      console.log(this.map);
      if (this.map) {
        this.locations.forEach((location) => {
          L.marker([location.lat, location.long])
            .addTo(this.map)
            .bindPopup(location.name)
            .openPopup();
        });
      } else {
        console.error("Map object is not initialized.");
      }
    },
  },
};
</script>

<style scoped>
#phuket-map {
  height: 100vh; /* Adjust the height as needed */
}
</style>
