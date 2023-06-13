<!--
 * 页面设置
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="setting-wrap">
    <div class="header">账号设置</div>
    <el-form ref="formRef" :model="bindedUserForm" label-width="110px" class="form-wrap">
      <el-form-item
        prop="username"
        label="用户头像"
        :rules="[
          {
            required: true,
            message: '请输入需要更改的名称',
            trigger: 'blur',
          },
        ]"
        class="form-item"
      >
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :action="UPLOAD"
          headers=""
          :before-upload="beforeUpload"
          :http-request="onUpload"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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
    <Modal v-model:visible="visible" title="账号绑定">
      <ResetBind v-model:visible="visible" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, UploadProps } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import Modal from '@/components/Modal/index.vue';
import { settingStore, userStore, uploadStore } from '@/store';
import { FILE_TYPE, FILE_UPLOAD_MSG, WEB_MAIN_URL } from '@/constant';
import { UPLOAD } from '@/server/api';
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

// 自定义上传
const onUpload = async (event: { file: Blob }) => {
  // 不需要进行裁剪
  const res = await uploadStore.uploadFile(event.file as File);

  if (!import.meta.env.DEV) {
    // 更换域名
    const url = res?.replace(location.origin, WEB_MAIN_URL);
    if (avatarUrl.value !== url) {
      avatarUrl.value && (await uploadStore.removeFile(avatarUrl.value));
      avatarUrl.value = url || '';
    }
  } else {
    // 删除上一次上传的图标
    if (avatarUrl.value !== res) {
      avatarUrl.value && (await uploadStore.removeFile(avatarUrl.value));
      avatarUrl.value = res || '';
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

    :deep {
      .el-upload {
        border: 1px dashed @border-color;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 125px;
        height: 125px;
        text-align: center;
      }
    }

    .avatar {
      width: 125px;
      height: 125px;
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
