import { defineStore } from 'pinia';
import * as Service from '@/server';
import { ApiCalledListRes } from '@/typings/comment';
import { normalizeResult } from '@/utils';

export const useApiCallsStore = defineStore('apiCalls', {
  state: () => ({
    total: 0,
    apiCalledList: [],
  }),
  actions: {
    async getApiCallsTotal() {
      const res = normalizeResult<{ total: number; id: string }>(await Service.getApiCallsTotal());
      console.log(res, res.data);
      this.total = res.data.total;
    },
    async getApiCalledList() {
      const res = normalizeResult<ApiCalledListRes[]>(await Service.getApiCalledList());
      console.log(res, res.data, 'apiCalledList');
      this.apiCalledList = res.data;
    },
  },
});
