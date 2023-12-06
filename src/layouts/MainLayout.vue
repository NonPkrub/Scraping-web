<template>
  <q-layout container="true" style="background-color: black">
    <q-header elevated>
      <q-toolbar class="bg-green text-white shadow-2 rounded-borders">
        <q-btn
          @click="home"
          flat
          label=" ☁️ Data Scrape Website Case Study: Air quality 🌥️"
        />

        <q-space />
        <q-btn stretch flat label="add map" @click="openMapDialog" />
        <q-btn stretch flat label="docs" @click="docs" />
      </q-toolbar>
    </q-header>

    <q-page-container style="padding-top: 0">
      <router-view />
    </q-page-container>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
    <!-- Map Dialog -->
    <q-dialog v-model="mapDialogVisible" persistent>
      <q-card>
        <q-card-section class="text-h6">Map Popup Content</q-card-section>
        <q-card-section>
          <q-input
            v-model="formData.name"
            outlined
            label="Name of district"
            dense
            :rules="[(value) => !!value || 'Name is required']"
          />
          <br />
          <q-input
            v-model="formData.lat"
            outlined
            label="Latitude"
            dense
            :rules="[(value) => !!value || 'Latitude is required']"
          />
          <br />
          <q-input
            v-model="formData.long"
            outlined
            label="Longitude"
            dense
            :rules="[(value) => !!value || 'Longitude is required']"
          />
          <br />

          <q-btn
            label="Send POST Request"
            color="secondary"
            @click="sendPostRequest"
            :disable="isButtonDisabled"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Close" color="secondary" @click="closeMapDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      mapDialogVisible: false,
      formData: {
        name: "",
        lat: "",
        long: "",
      },
    };
  },
  computed: {
    isButtonDisabled() {
      return !this.formData.name || !this.formData.lat || !this.formData.long;
    },
  },
  methods: {
    docs() {
      this.$router.push("/docs");
    },
    home() {
      this.$router.push("/");
    },
    openMapDialog() {
      this.mapDialogVisible = true;
    },

    closeMapDialog() {
      this.mapDialogVisible = false;
    },
    async sendPostRequest() {
      try {
        const response = await axios.post(
          "https://scrape-api-jcvs4udnka-as.a.run.app/api/data/district",
          this.formData
        );

        // Handle the response as needed
        console.log(response.data);
      } catch (error) {
        // Handle errors
        console.error("Error making POST request:", error);
      }
    },
  },
});
</script>
