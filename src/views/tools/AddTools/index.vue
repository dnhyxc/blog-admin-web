<!--
 * 添加工具
 * @author: dnhyxc
 * @since: 2023-06-06
 * index.vue
-->
<template>
  <div class="add-tools-wrap">
    <el-form ref="formRef" :rules="rules" label-width="79px" :model="addToolsForm" class="form-wrap">
      <el-form-item prop="tooUrl" label="工具图标" class="form-item">
        <Loading :loading="toolsStore.pageLoading" text="正在自动获取图标..." class="cover-img-wrap">
          <Upload v-model:file-path="toolUrl" :fixed-number="[130, 130]" delete>
            <template #preview>
              <img :src="toolUrl" class="cover-img avatar" />
            </template>
          </Upload>
        </Loading>
        <el-button type="primary" link class="reload" :disabled="toolsStore.pageLoading" @click="onSearch">
          {{ addToolsForm.toolHref && toolUrl ? '重新获取链接信息' : '获取链接信息' }}
        </el-button>
      </el-form-item>
      <el-form-item prop="toolHref" label="工具链接" class="form-item">
        <el-input v-model="addToolsForm.toolHref" placeholder="请输入工具链接" />
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
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { toolsStore } from '@/store';
import { checkHref } from '@/utils';
import { ToolsParams } from '@/typings/comment';
import Loading from '@/components/Loading/index.vue';

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
});

watch(
  () => props.addVisible,
  (newVal) => {
    if (!newVal) {
      addToolsForm.toolName = '';
      addToolsForm.toolHref = '';
      addToolsForm.toolUrl = '';
      addToolsForm.powerUsers = [];
      toolsStore.pageLoading = false;
      clearToolUrl();
    }
  },
);

const onSearch = async () => {
  if (!addToolsForm.toolHref) return;
  const { title, iconUrl } = await toolsStore.getPageInfo(addToolsForm.toolHref);
  addToolsForm.toolName = title;
  addToolsForm.toolUrl = iconUrl;
  toolUrl.value = iconUrl;
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

.add-tools-wrap {
  .form-item {
    position: relative;

    .reload {
      position: absolute;
      bottom: 0;
      left: 142px;
    }
  }

  .cover-img-wrap {
    width: 130px;
    height: 130px;

    .cover-img {
      width: 100%;
      height: 100%;
    }

    :deep {
      .el-loading-spinner {
        margin-top: -45px;
      }
    }
  }
}
</style>
