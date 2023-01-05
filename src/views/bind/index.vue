<!--
 * 绑定前台账户页面
 * @author: dnhyxc
 * @since: 2023-01-05
 * index.vue
-->
<template>
  <div class="bind-wrap">
    <el-form ref="formRef" :model="bindAccountForm" label-width="120px" class="demo-dynamic">
      <el-form-item
        prop="bindAccount1"
        label="前台账号1"
        :rules="[
          {
            required: true,
            message: '请输入需要绑定的前台账号名称',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="bindAccountForm.bindAccount1" />
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in bindAccountForm.domains"
        :key="domain.key"
        :label="'Domain' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: 'domain can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="domain.value" />
        <el-button class="mt-2" @click.prevent="removeDomain(domain)">Delete</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="addDomain">New domain</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';

interface DomainItem {
  key: number;
  value: string;
}

const formItemKey = ref<number>(1);
const formRef = ref<FormInstance>();
const bindAccountForm = reactive<{
  domains: DomainItem[];
  bindAccount1: string;
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  bindAccount1: '',
});

const removeDomain = (item: DomainItem) => {
  const index = bindAccountForm.domains.indexOf(item);
  if (index !== -1) {
    bindAccountForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  formItemKey.value++;

  bindAccountForm.domains.push({
    key: formItemKey.value,
    value: '',
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';
</style>
