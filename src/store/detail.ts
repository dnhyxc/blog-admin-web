import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import * as Service from '@/server';
import { ArticleDetail } from '@/typings/comment';
import { normalizeResult } from '@/utils';
import { userStore } from '@/store';

interface tocTitlesParams {
  title: string;
  lineIndex: string | null;
  indent: number;
}

interface IProps {
  loading: boolean;
  detail: ArticleDetail;
  tocTitles: tocTitlesParams[];
  previewRef: any;
  titles: HTMLHeadElement[];
}

export const useDetailStore = defineStore('detail', {
  state: (): IProps => ({
    loading: false,
    detail: {},
    tocTitles: [],
    previewRef: null,
    titles: [],
  }),

  actions: {
    async getArticleDetail(id: string) {
      this.loading = true;
      try {
        const res = normalizeResult<ArticleDetail>(
          await Service.getArticleDetail({
            id,
            userId: userStore?.userId!,
          }),
        );
        this.loading = false;
        if (res.success) {
          this.detail = { ...res.data };
          return res.data;
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        throw error;
      }
    },

    // 存储文章预览dom元素
    setPreviewRef(ref: HTMLDivElement | null) {
      this.previewRef = ref;
    },

    // 存储文章目录
    setTocTitles(titles: tocTitlesParams[]) {
      this.tocTitles = titles;
    },

    clearDetail() {
      this.detail = {};
    },
  },
});
