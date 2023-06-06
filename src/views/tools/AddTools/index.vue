<!--
 * 添加工具
 * @author: dnhyxc
 * @since: 2023-06-06
 * index.vue
-->
<template>
  <div class="add-tools-wrap">
    <el-form ref="formRef" :rules="rules" label-width="78px" :model="addToolsForm" class="form-wrap">
      <el-form-item prop="tooUrl" label="工具图标" class="form-item">
        <el-upload
          class="avatar-uploader"
          :action="UPLOAD"
          headers=""
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="onUpload"
        >
          <img v-if="toolUrl" :src="toolUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item
        prop="toolName"
        label="工具名称"
        :rules="[
          {
            required: true,
            message: '请输入工具名称',
          },
        ]"
        class="form-item"
      >
        <el-input v-model="addToolsForm.toolName" placeholder="请输入工具名称" />
      </el-form-item>
      <el-form-item prop="toolHref" label="工具链接" class="form-item">
        <el-input v-model="addToolsForm.toolHref" placeholder="请输入工具链接" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, UploadProps, FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { UPLOAD } from '@/server/api';
import { uploadStore } from '@/store';
import { FILE_TYPE, FILE_UPLOAD_MSG } from '@/constant';
import { checkHref } from '@/utils';
import { ToolsParams } from '@/typings/comment';

interface IProps {
  selectedItem?: ToolsParams;
  addVisible?: boolean;
}

const props = defineProps<IProps>();

const formRef = ref<FormInstance>();
const addToolsForm = reactive<ToolsParams>({
  toolName: '',
  toolHref: '',
  toolUrl: '',
  powerUsers: [],
});
const toolUrl = ref<string>('');

const validateHref = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'));
  } else if (!checkHref(value)) {
    callback(new Error('请输入正确的链接'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  toolHref: [{ validator: validateHref, trigger: 'blur', required: true }],
});

watchEffect(() => {
  const { selectedItem } = props;
  if (selectedItem?.toolName) {
    addToolsForm.toolName = selectedItem?.toolName;
    addToolsForm.toolHref = selectedItem?.toolHref;
    addToolsForm.toolUrl = selectedItem?.toolUrl;
    addToolsForm.powerUsers = selectedItem?.powerUsers;
    toolUrl.value = selectedItem?.toolUrl || '';
  }

  const url = 'http://43.143.27.249:9216/home';
  console.log(checkHref(url), 'checkUrl');
});

watch(
  () => props.addVisible,
  (newVal) => {
    if (!newVal) {
      addToolsForm.toolName = '';
      addToolsForm.toolHref = '';
      addToolsForm.toolUrl = '';
      addToolsForm.powerUsers = [];
      clearToolUrl();
    }
  },
);

// 自定义上传
const onUpload = async (event: { file: Blob }) => {
  // 不需要进行裁剪
  const res = await uploadStore.uploadFile(event.file as File);
  if (res) {
    // 删除上一次上传的图标
    if (toolUrl.value !== res) {
      toolUrl.value && (await uploadStore.removeFile(toolUrl.value));
      toolUrl.value = res;
    }
  }
};

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!FILE_TYPE.includes(rawFile.type)) {
    ElMessage.error(FILE_UPLOAD_MSG);
    return false;
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('图片不能超过20M');
    return false;
  }
  return true;
};

// 清除数据
const clearToolUrl = () => {
  toolUrl.value = '';
};

defineExpose({
  formRef,
  addToolsForm,
  clearToolUrl,
  toolUrl,
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}

:deep {
  .avatar-uploader .el-upload {
    border: 1px dashed @border-color;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.2s;
  }

  .avatar-uploader .el-upload:hover {
    border-color: @primary;
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    text-align: center;
  }
}
</style>
