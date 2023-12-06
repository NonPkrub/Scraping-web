import { defineStore } from "pinia";

export const useStore = defineStore("myStore", {
  state: () => ({
    data1: null,
    newData: null,
  }),

  getters: {
    getData1() {
      return this.data1;
    },
    getNewData() {
      return this.newData;
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
    setNewData(newData) {
      // Set newData
      this.newData = newData;
    },
  },
});
