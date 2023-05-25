<!--
 * 页面设置
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="setting-wrap">
    <div class="content">
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
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
    </div>
    <Modal v-model:visible="visible" title="账号绑定">
      <ResetBind v-model:visible="visible" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, UploadProps } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import Modal from '@/components/Modal/index.vue';
import ResetBind from './ResetBind.vue';
import { settingStore, userStore } from '@/store';

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
const imageUrl = ref('');

const router = useRouter();

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

// 上传检测
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

// 头像上传成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
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
      console.log(bindedUserForm, 'success submit!');
    } else {
      console.log(bindedUserForm, 'error submit!');
      return false;
    }
  });
  router.push('/home');
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.setting-wrap {
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

    .header {
      height: 50px;
      line-height: 50px;
      margin-bottom: 30px;
      padding: 0 80px;
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
  }
}
</style>
