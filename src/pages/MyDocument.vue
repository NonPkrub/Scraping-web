<template>
  <div class="q-pa-md">
    <!-- <q-toolbar>
      <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
      <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
    </q-toolbar> -->
    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      :width="200"
      class="bg-black text-white"
      :breakpoint="500"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple>
            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section> Star </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section> Drafts </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page style="padding-top: 60px" class="q-pa-md text-white">
        <p v-for="n in 10" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
          praesentium molestias a adipisci, dolore vitae odit, quidem
          consequatur optio voluptates asperiores pariatur eos numquam rerum
          delectus commodi perferendis voluptate?
        </p>
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
    </q-page-container>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      drawerLeft: ref(false),
      drawerRight: ref(true),
    };
  },
};
</script>
