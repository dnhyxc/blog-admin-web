<!--
 * 绑定前台账户页面
 * @author: dnhyxc
 * @since: 2023-01-05
 * index.vue
-->
<template>
  <div class="bind-wrap">
    <div class="content">
      <div class="header">账号绑定</div>
      <el-form ref="formRef" :model="bindAccountForm" label-width="110px" class="form-wrap" @submit.native.prevent>
        <el-form-item
          prop="bindAccount"
          label="绑定账号名 1"
          :rules="[
            {
              required: true,
              message: '请输入需要绑定的前台账号名称',
              trigger: 'blur',
            },
          ]"
          class="form-item"
        >
          <el-input v-model="bindAccountForm.bindAccount" placeholder="请输入需要绑定的前台账号名称" />
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in bindAccountForm.domains"
          :key="domain.key"
          :label="`绑定账号名${index + 2}`"
          :prop="`domains.${index}.value`"
          :rules="{
            required: true,
            message: '请输入需要绑定的前台账号名称',
            trigger: 'blur',
          }"
          class="form-item-custom"
        >
          <div class="inp-wrap">
            <el-input v-model="domain.value" placeholder="请输入需要绑定的前台账号名称" />
            <el-button class="del-btn" link @click.prevent="removeDomain(domain)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item class="form-item-action">
          <div class="actions">
            <el-button type="primary" class="action-btn" @click="submitForm(formRef)">确定</el-button>
            <el-button v-if="bindAccountForm.domains.length < 4" class="action-btn" @click="addDomain">
              增加绑定账号
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'element-plus';
import { bindAccountStore, userStore } from '@/store';

const router = useRouter();

interface DomainItem {
  key: string;
  value: string;
}

const formRef = ref<FormInstance>();
const bindAccountForm = reactive<{
  domains: DomainItem[];
  bindAccount: string;
}>({
  domains: [],
  bindAccount: '',
});

onMounted(() => {
  getBindUserList();
});

// 删除绑定输入框
const removeDomain = (item: DomainItem) => {
  const index = bindAccountForm.domains.indexOf(item);
  if (index !== -1) {
    bindAccountForm.domains.splice(index, 1);
  }
};

// 添加账号绑定输入框
const addDomain = () => {
  bindAccountForm.domains.push({
    key: crypto.randomUUID(),
    value: '',
  });
};

// 确认绑定账号
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const values = bindAccountForm.domains.map((i) => i.value);
      const usernames = [bindAccountForm.bindAccount, ...values];
      const res = await bindAccountStore.bindAccount({
        usernames,
      });
      if (res && userStore.bindAccount?.length) {
        router.push('/home');
      }
    } else {
      return false;
    }
  });
};

// 获取绑定账号列表
const getBindUserList = async () => {
  if (!userStore?.userId) return;
  const res: string[] = await userStore.getUserInfo();
  if (res?.length) {
    router.push('/home');
  }
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.bind-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: @fff;
  background-color: @fff;
  box-sizing: border-box;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    height: 375px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgb(255 255 255 / 20%);
    backdrop-filter: blur(1px);

    .header {
      height: 50px;
      line-height: 50px;
      margin-bottom: 30px;
      padding: 0 65px;
      font-size: 20px;
      font-weight: 700;
      color: @000;
    }

    .form-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 500px;

      .form-item,
      .form-item-custom,
      .form-item-action {
        margin-bottom: 30px;
        padding: 0 50px;
      }

      .form-item-custom {
        .inp-wrap {
          position: relative;
          width: 100%;

          .del-btn {
            position: absolute;
            width: 60px;
            right: -60px;
            top: 50%;
            transform: translateY(-50%);
            color: @danger;
          }
        }
      }

      .form-item-action {
        .actions {
          display: flex;
          width: 100%;
          text-align: right;

          .action-btn {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
