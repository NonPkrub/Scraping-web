<template>
  <div>
    <div id="phuket-map"></div>
    <button @click="createNewMarker">Create New Marker</button>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useStore } from "../stores/scraped-data";
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

      await this.fetchMarkerData();
      this.addMarkers();
    },
    async fetchMarkerData() {
      try {
        const response = await axios.get(
          "https://scrape-api-jcvs4udnka-as.a.run.app/api/district"
        );
        this.locations = response.data;
      } catch (error) {
        console.error("Error fetching marker data:", error);
      }
    },
    createNewMarker() {
      // Assuming you want to create a marker at the center of the map
      // const center = this.map.getCenter();
      // const newMarker = L.marker(center)
      //   .addTo(this.map)
      //   .bindPopup("New Marker")
    },
    addMarkers() {
      const store = useStore();
      if (this.map) {
        this.locations.forEach((location) => {
          const marker = L.marker([location.lat, location.long])
            .addTo(this.map)
            .bindPopup(location.name);

          marker.on("click", async () => {
            const data = await this.fetchAdditionalData(location.id);
            console.log(data);
            store.setNewData(data);

            this.$router.push("/database");
          });
          marker.on("mouseover", () => {
            marker
              .bindTooltip(location.name, {
                permanent: true,
                className: "custom-tooltip",
              })
              .openTooltip();
          });

          marker.on("mouseout", () => {
            marker.closeTooltip();
          });
        });
      } else {
        console.error("Map object is not initialized.");
      }
    },
    async fetchAdditionalData(locationId) {
      try {
        const response = await axios.get(
          `https://scrape-api-jcvs4udnka-as.a.run.app/api/data/district/${locationId}`
        );
        const additionalData = response.data;
        return additionalData;
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    },
  },
};
</script>

<style scoped>
#phuket-map {
  height: 100vh; /* Adjust the height as needed */
}

.custom-tooltip {
  background-color: white;
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 3px;
}
</style>
