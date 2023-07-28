import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ToolsParams, ToolListRes } from '@/typings/comment';
import { userStore } from '@/store';
import { PAGESIZE } from '@/constant';

interface IParams extends ToolListRes {
  loading: boolean;
  pageNo: number;
}

export const useToolsStore = defineStore('tools', {
  state: (): IParams => ({
    loading: false,
    list: [],
    total: 0,
    pageNo: 1,
  }),

  actions: {
    // 添加工具
    async addTools(params: ToolsParams) {
      try {
        if (!userStore.userId) {
          ElMessage.warning('请先登录后再试');
          return;
        }
        const res = normalizeResult<ToolsParams>(
          await Service.addTools({
            ...params,
            sort: '',
          }),
        );
        if (res.success) {
          ElMessage.success(res.message);
          this.getToolList();
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 获取工具列表
    async getToolList() {
      try {
        const { userId } = userStore;
        this.loading = true;
        if (!userId) {
          ElMessage.warning('请先登录后再试');
          return;
        }
        const res = normalizeResult<ToolListRes>(
          await Service.getToolList({
            pageNo: this.pageNo,
            pageSize: PAGESIZE,
          }),
        );
        this.loading = false;
        if (res.success) {
          const { list, total } = res.data;
          this.list = list;
          this.total = total;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 更新工具
    async updateTools(params: ToolsParams) {
      try {
        if (!userStore.userId) {
          ElMessage.warning('请先登录后再试');
          return;
        }
        const res = normalizeResult<ToolsParams>(await Service.updateTools(params));
        if (res.success) {
          ElMessage.success(res.message);
          this.getToolList();
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },

    // 删除工具
    async deleteTools(ids: string | string[]) {
      try {
        if (!userStore.userId) {
          ElMessage.warning('请先登录后再试');
          return;
        }
        const res = normalizeResult<ToolsParams>(await Service.deleteTools(ids));
        if (res.success) {
          ElMessage.success(res.message);
          this.getToolList();
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        return false;
      }
    },
  },
});
