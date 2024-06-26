<!--
 * 页面设置
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <Loading :loading="settingStore.loading" class="setting-wrap">
    <div class="header">账号设置</div>
    <el-form ref="formRef" :model="bindedUserForm" label-width="110px" class="form-wrap">
      <el-form-item prop="avatar" label="用户头像" class="form-item form-item-avatar">
        <Upload v-model:file-path="avatarUrl" :fixed-number="[130, 130]" delete :get-upload-url="getUploadUrl">
          <template #preview>
            <Image :url="avatarUrl || IMAGES.sea" :transition-img="IMAGES.sea" class="avatar-uploader avatar" />
          </template>
        </Upload>
      </el-form-item>
      <el-form-item
        prop="username"
        label="用户名称"
        :rules="[
          {
            required: true,
            message: '请输入需要更改的名称',
            trigger: 'blur',
          },
        ]"
        class="form-item"
      >
        <el-input v-model="bindedUserForm.username" placeholder="请输入需要更改的名称" />
      </el-form-item>
      <div class="bind-wrap">
        <el-form-item
          v-for="(domain, index) in bindedUserForm.domains"
          :key="domain.key"
          :label="'绑定账号名 ' + (index + 1)"
          :prop="'domains.' + index + '.value'"
          :rules="{
            required: true,
            message: '请输入需要绑定的前台账号名称',
            trigger: 'blur',
          }"
          class="form-item-custom"
        >
          <el-input v-model="domain.value" disabled placeholder="请输入需要绑定的前台账号名称" />
        </el-form-item>
        <el-button class="del-btn" type="primary" link @click.prevent="onResetBind">重新设置绑定账号</el-button>
      </div>
      <el-form-item class="form-item-action">
        <div class="actions">
          <el-button type="primary" class="action-btn" @click="submitForm(formRef)">确定修改</el-button>
        </div>
      </el-form-item>
    </el-form>
    <Modal v-model:visible="visible" title="账号绑定" :need-footer="false">
      <ResetBind v-model:visible="visible" />
    </Modal>
  </Loading>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watchEffect } from 'vue';
import type { FormInstance } from 'element-plus';
import Modal from '@/components/Modal/index.vue';
import Upload from '@/components/Upload/index.vue';
import Image from '@/components/Image/index.vue';
import { settingStore, userStore } from '@/store';
import { IMAGES } from '@/constant';
import ResetBind from './ResetBind.vue';

interface DomainItem {
  key: string;
  value: string;
}

const visible = ref<boolean>(false); // 权限设置弹窗的状态
const formRef = ref<FormInstance>();
const bindedUserForm = reactive<{
  domains: DomainItem[] | undefined;
  bindAccount: string;
  username: string;
}>({
  domains: [],
  bindAccount: '',
  username: '',
});
const avatarUrl = ref<string>(userStore.headUrl || '');

watchEffect(async () => {
  if (!visible.value) {
    bindedUserForm.domains = settingStore.bindUserInfo?.map((i, index) => ({
      key: i.userId,
      value: i.username,
    }));
  }
});

onMounted(async () => {
  await settingStore.getBindUserInfo();
  bindedUserForm.username = userStore?.username!;
});

const getUploadUrl = async (url: string) => {
  await settingStore.updateUserInfo(
    {
      headUrl: url,
    },
    false,
  );
};

// 重新设置绑定账号
const onResetBind = () => {
  visible.value = true;
};

// 确认修改
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      await settingStore.updateUserInfo({
        username: bindedUserForm.username,
        headUrl: avatarUrl.value,
      });
    } else {
      return false;
    }
  });
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.setting-wrap {
  .layoutStyles();
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: @fff;
  width: calc(100% - 10px);

  .header {
    width: 500px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 30px;
    padding: 15px 110px 0;
    font-size: 20px;
    font-weight: 700;
    color: @000;
    box-sizing: border-box;
  }

  .avatar-uploader {
    display: flex;
    justify-content: center;
    width: 130px;
    height: 130px;
    border-radius: 4px;

    .avatar {
      width: 130px;
      height: 130px;
      display: block;
    }
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
      padding-right: 50px;
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

    .form-item-avatar {
      :deep {
        .upload-wrap {
          width: 130px;
          height: 130px;
          max-width: 130px;
        }

        .image-item {
          border-radius: 4px;
        }
      }
    }

    .bind-wrap {
      position: relative;

      .del-btn {
        position: absolute;
        width: auto;
        bottom: 36px;
        right: -78px;
      }
    }
  }

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
  }
}
</style>
