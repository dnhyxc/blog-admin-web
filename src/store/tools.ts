import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { normalizeResult } from '@/utils';
import { ToolsParams, ToolListRes } from '@/typings/comment';
import { userStore } from '@/store';
import { PAGESIZE } from '@/constant';

interface IParams extends ToolListRes {
  loading: boolean;
  pageLoading: boolean;
  pageNo: number;
  pageInfo: {
    iconUrl: string;
    title: string;
  };
}

export const useToolsStore = defineStore('tools', {
  state: (): IParams => ({
    loading: false,
    pageLoading: false,
    list: [],
    total: 0,
    pageNo: 1,
    pageInfo: {
      iconUrl: '',
      title: '',
    },
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
    async getToolList(pageNo?: number) {
      try {
        const { userId } = userStore;
        this.loading = true;
        if (!userId) {
          ElMessage.warning('请先登录后再试');
          return;
        }
        const res = normalizeResult<ToolListRes>(
          await Service.getToolList({
            pageNo: pageNo || this.pageNo,
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

    // 根据url获取网页信息
    async getPageInfo(url: string): Promise<{ title: string; iconUrl: string }> {
      if (userStore.userId) {
        this.pageLoading = true;
        const res = normalizeResult<string>(await Service.getPageInfo(url));
        this.pageLoading = false;
        if (res.success) {
          // 创建一个虚拟的 DOM，用于解析 HTML 内容
          const parser = new DOMParser();
          const doc = parser.parseFromString(res.data, 'text/html');
          // 获取网页标题
          const title = doc.querySelector('title')?.textContent || '';
          // 获取网页图标链接
          let iconLink = doc.querySelector('link[rel~="icon"]') as HTMLLinkElement;
          if (!iconLink) {
            iconLink = doc.querySelector('link[rel~="shortcut icon"]') as HTMLLinkElement;
          }
          const iconUrl = iconLink ? iconLink.href : '';
          this.pageInfo.iconUrl = iconUrl;
          this.pageInfo.title = title;
          return this.pageInfo;
        } else {
          ElMessage.error(res.message);
          return {
            title: '',
            iconUrl: '',
          };
        }
      } else {
        ElMessage.warning('请先登录后再试');
        return {
          title: '',
          iconUrl: '',
        };
      }
    },
  },
});
