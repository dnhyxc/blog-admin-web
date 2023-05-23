import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { PAGESIZE } from '@/constant';
import { InteractListRes } from '@/typings/comment';
import { normalizeResult } from '@/utils';
import { userStore } from '@/store';

interface IProps extends InteractListRes {
  loading: boolean;
  pageNo: number;
  pageSize: number;
}

export const useInteractStore = defineStore('interact', {
  state: (): IProps => ({
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: PAGESIZE,
    loading: false,
  }),

  actions: {
    async getInteractList() {
      try {
        this.loading = true;
        const res = normalizeResult<InteractListRes>(
          await Service.getInteractList({
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            userId: userStore?.userId!,
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

    // 下架文章
    async removeInteracts(ids: string | string[]) {
      if (!ids.length) {
        ElMessage.info('没有可隐藏的留言');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult(
          await Service.removeInteracts({
            ids,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.list.forEach((i) => {
            if (ids.includes(i.id)) {
              i.isDelete = true;
            }
          });
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 上架文章
    async restoreInteracts(ids: string | string[]) {
      if (!ids.length) {
        ElMessage.info('没有可显示的留言');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult(
          await Service.restoreInteracts({
            ids,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.list.forEach((i) => {
            if (ids.includes(i.id)) {
              delete i.isDelete;
            }
          });
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 删除文章（支持批量删除）
    async delInteracts(ids: string | string[]) {
      if (!ids.length) {
        ElMessage.info('没有可删除的留言');
        return;
      }
      try {
        this.loading = true;
        const res = normalizeResult<number>(
          await Service.delInteracts({
            ids,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.getInteractList();
          ElMessage.success(res.message);
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 清除文章列表数据
    removeInteractList() {
      this.list = [];
      this.total = 0;
      this.pageNo = 1;
    },
  },
});
