import { defineStore } from 'pinia';
import * as Service from '@/server';
import { ApiCalledListRes } from '@/typings/comment';
import { normalizeResult } from '@/utils';

interface IParams {
  loading: boolean;
  total: 0;
  apiCalledList: ApiCalledListRes[];
  dayTotal: 0;
}

export const useApiCallsStore = defineStore('apiCalls', {
  state: (): IParams => ({
    loading: false,
    total: 0,
    apiCalledList: [],
    dayTotal: 0,
  }),
  actions: {
    async getApiCallsTotal() {
      const res = normalizeResult<{ total: number; id: string }>(await Service.getApiCallsTotal());
      this.total = res.data.total;
    },

    async getApiCallsTotalByDay() {
      const res = normalizeResult<{ total: number; id: string }>(await Service.getApiCallsTotalByDay());
      this.dayTotal = res.data.total;
    },

    async getApiCalledList() {
      const res = normalizeResult<ApiCalledListRes[]>(await Service.getApiCalledList());
      this.apiCalledList = res.data;
    },
  },
});
