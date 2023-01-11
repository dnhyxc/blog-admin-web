import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    count: 0,
    list: [],
  }),

  actions: {
    setCount() {
      this.count++;
    },
  },
});
