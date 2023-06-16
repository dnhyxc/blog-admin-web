import { defineStore } from 'pinia';
import { userStore } from '@/store';
import * as Service from '@/server';
import { normalizeResult, md5HashName } from '@/utils';

interface IProps {
  visible: boolean;
}

// 公共store
export const useUploadStore = defineStore('upload', {
  state: (): IProps => ({
    visible: false,
  }),

  actions: {
    // 文件上传
    async uploadFile(file: File) {
      // 检验是否有userId，如果没有禁止发送请求
      if (!userStore.userId) return;
      const formData = new FormData();
      // 根据文件资源生成 MD5 hash
      const fileName = (await md5HashName(file)) as string;
      const findIndex = file?.name?.lastIndexOf('.');
      const ext = file.name.slice(findIndex + 1);
      // 修改文件名称
      const newFile = new File([file], fileName + '.' + ext, { type: file.type });
      formData.append('file', newFile);
      const res = normalizeResult<{ filePath: string }>(await Service.uploadFile(formData));
      if (res.success) {
        this.visible = true;
        return res.data.filePath;
      }
    },

    // 删除文件
    async removeFile(url: string | string[]) {
      // 检验是否有userId，如果没有禁止发送请求
      if (!userStore.userId) return;
      normalizeResult<{ filePath: string }>(await Service.removeFile(url));
    },
  },
});
