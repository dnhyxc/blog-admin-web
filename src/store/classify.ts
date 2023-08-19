import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { userStore } from '@/store';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ClassifyList, ClassifyItem } from '@/typings/comment';
import { PAGESIZE } from '@/constant';

interface IProps {
  pageNo: number;
  pageSize: number;
  total: number;
  loading: boolean;
  classifyList: ClassifyItem[];
}

export const useClassifyStore = defineStore('classify', {
  state: (): IProps => ({
    pageNo: 0,
    pageSize: PAGESIZE,
    classifyList: [],
    loading: false,
    total: 0,
  }),
  actions: {
    // 创建分类
    async createClassify(classifyName: string) {
      const res = normalizeResult<ClassifyItem>(await Service.createClassify(classifyName));
      if (res.success) {
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    },

    // 获取分类
    async getClassifyList() {
      if (this.classifyList.length !== 0 && this.classifyList.length >= this.total) return;
      this.pageNo = this.pageNo + 1;
      this.loading = true;
      const res = normalizeResult<ClassifyList>(
        await Service.getClassifyList({ pageNo: this.pageNo, pageSize: this.pageSize }),
      );
      this.loading = false;
      if (res.success) {
        this.classifyList = [...this.classifyList, ...res.data.list];
        this.total = res.data.total;
      } else {
        ElMessage.error(res.message);
      }
    },

    // 更新分类
    async updateClassify(classifyName: string) {
      const res = normalizeResult<ClassifyItem>(await Service.updateClassify(classifyName));
      if (res.success) {
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    },

    // 添加分类
    async addClassify(id: string, type: string) {
      const res = normalizeResult<ClassifyItem>(
        await Service.addClassify({ id, bindUsers: userStore.bindAccount || [], type }),
      );
      if (res.success) {
        this.classifyList.forEach((i) => {
          if (i.id === id) {
            if (type === 'add') {
              if (Array.isArray(i.addUserIds)) {
                i.addUserIds = (
                  i.addUserIds ? [...i.addUserIds, userStore.userId] : i.addUserIds ? [...i.addUserIds] : []
                ) as string[];
              }
              i.userCount = new Set([...i.userIds!, ...userStore.bindAccount!]).size;
            } else {
              i.addUserIds = i.addUserIds?.filter((i) => i !== userStore.userId);
              i.userCount -= userStore.bindAccount?.length!;
            }
          }
        });
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    },

    // 删除分类
    async deleteClassify(ids: string | string[]) {
      const res = normalizeResult<ClassifyItem>(await Service.deleteClassifys(ids));
      if (res.success) {
        ElMessage.success(res.message);
        this.clearClassifyList();
        this.getClassifyList();
      } else {
        ElMessage.error(res.message);
      }
    },

    // 清除数据
    clearClassifyList() {
      this.pageNo = 0;
      this.total = 0;
      this.classifyList = [];
    },
  },
});
