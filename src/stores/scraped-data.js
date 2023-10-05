import { defineStore } from "pinia";

export const useStore = defineStore("myStore", {
  state: () => ({
    data1: null,
  }),

  getters: {
    getData1() {
      return this.data1;
    },
  },

  actions: {
    // increment() {
    //   this.counter++;
    // },
    setData1(data) {
      // Add an action to set data1
      this.data1 = data;
    },
  },
});
