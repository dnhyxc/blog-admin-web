<template>
  <div class="login">
    <div class="content">
      <div class="content-left" />
      <div v-if="!isRestore && !isRegister" class="content-right">
        <div class="title">账号密码登录</div>
        <el-form ref="formRef" :rules="rules" :model="loginForm" class="form-wrap">
          <el-form-item prop="username" class="form-item">
            <el-input v-model="loginForm.username" size="large" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <el-input
              v-model="loginForm.password"
              size="large"
              placeholder="请输入密码"
              show-password
              @keyup.enter="onEnter"
            />
          </el-form-item>
          <el-form-item prop="code" class="form-item code-item">
            <el-input
              v-model="loginForm.code"
              size="large"
              class="code-inp"
              placeholder="请输入验证码"
              @keyup.enter="onEnter"
            />
            <canvas ref="canvasCtx" class="code-canvas" :width="width" :height="height" @click="onResetCode"></canvas>
          </el-form-item>
          <el-form-item class="form-item action-list">
            <el-button type="primary" size="large" class="action" @click="onLogin(formRef)">用户登录</el-button>
          </el-form-item>
        </el-form>
        <div class="reset-wrap">
          <el-button class="action" type="primary" link @click="toRegister(true)">没有账号，前往注册</el-button>
          <el-button class="action" type="primary" link @click="onForgetPwd">忘记密码</el-button>
        </div>
      </div>
      <div v-if="isRegister" class="content-right">
        <div class="title">账号注册</div>
        <el-form ref="formRef" :rules="rules" :model="loginForm" class="form-wrap">
          <el-form-item prop="username" class="form-item">
            <el-input v-model="loginForm.username" size="large" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <el-input
              v-model="loginForm.password"
              size="large"
              placeholder="请输入密码"
              show-password
              @keyup.enter="onRegister(formRef)"
            />
          </el-form-item>
          <el-form-item class="form-item action-list">
            <el-button class="action" type="primary" size="large" @click="onRegister(formRef)">账号注册</el-button>
          </el-form-item>
        </el-form>
        <div class="reset-wrap">
          <el-button class="action" type="primary" link @click="toRegister(false)">已有账号，前往登录</el-button>
          <el-button class="action" type="primary" link @click="onForgetPwd">忘记密码</el-button>
        </div>
      </div>
      <div v-if="isRestore" class="content-right">
        <div class="title">账号密码登录</div>
        <el-form ref="formRef" :rules="rules" :model="loginForm" class="form-wrap">
          <el-form-item prop="username" class="form-item">
            <el-input
              v-model="loginForm.username"
              size="large"
              placeholder="请输入用户名"
              @keyup.enter="onResetEnter"
            />
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <el-input
              v-model="loginForm.password"
              size="large"
              placeholder="请输入新密码"
              show-password
              @keyup.enter="onResetEnter"
            />
          </el-form-item>
          <el-form-item prop="confirmPwd" class="form-item">
            <el-input
              v-model="loginForm.confirmPwd"
              size="large"
              placeholder="请输入二次确认密码"
              show-password
              @keyup.enter="onResetEnter"
            />
          </el-form-item>
          <el-form-item class="form-item action-list">
            <el-button type="primary" size="large" class="action" @click="onResetAndLogin">重置并登录</el-button>
            <el-button class="action" size="large" @click="onBackLogin">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore } from '@/store/user';
import { verifyUsername, verifyPassword, verifyResetPassword, drawCharater, verifyCode } from '@/utils';

const router = useRouter();
const userStore = useUserStore();

const isRegister = ref<boolean>(false);
const isRestore = ref<boolean>(false);
const formRef = ref<FormInstance>();

const loginForm = reactive<{
  username: string;
  password: string;
  confirmPwd?: string;
  code?: string;
}>({
  username: '',
  password: '',
  confirmPwd: '',
  code: '',
});

// canvas ref
const canvasCtx = ref<HTMLCanvasElement | null>(null);
// 生成的验证码
const charater = ref<string>('');
// canvas 宽度
const width = 120;
// canvas 高度
const height = 40;

const validateUsername = (rule: any, value: any, callback: any) => {
  const { msg, status } = verifyUsername(value);
  if (value === '') {
    callback(new Error('用户名不能为空'));
  } else if (!status) {
    callback(new Error(msg));
  } else {
    callback();
  }
};

const validatePassword = (rule: any, value: any, callback: any) => {
  const { msg, status } = verifyPassword(value);
  if (value === '') {
    callback(new Error('密码不能为空'));
  } else if (!status) {
    callback(new Error(msg));
  } else {
    callback();
  }
};

const validateConfirmPwd = (rule: any, value: any, callback: any) => {
  const { msg, status } = verifyResetPassword(value, loginForm.password);
  if (value === '') {
    callback(new Error('确认密码不能为空'));
  } else if (!status) {
    callback(new Error(msg));
  } else {
    callback();
  }
};

const validateCode = (rule: any, value: any, callback: any) => {
  // 开发环境不进行校验
  if (import.meta.env.DEV) return true;
  const { msg, status } = verifyCode(value, charater.value);
  if (value === '') {
    callback(new Error('验证码不能为空'));
  } else if (!status) {
    callback(new Error(msg));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  username: [{ validator: validateUsername, trigger: 'blur', required: true }],
  password: [{ validator: validatePassword, trigger: 'blur', required: true }],
  confirmPwd: [{ validator: validateConfirmPwd, trigger: 'blur', required: true }],
  code: [{ validator: validateCode, trigger: 'blur', required: true }],
});

onMounted(() => {
  nextTick(() => {
    charater.value = drawCharater({
      canvasElement: canvasCtx.value!,
      width,
      height,
    });
  });
});

watch([isRestore, isRegister], (newVal: boolean[]) => {
  if (!newVal[0] && !newVal[1]) {
    nextTick(() => {
      charater.value = drawCharater({
        canvasElement: canvasCtx.value!,
        width,
        height,
      });
    });
  }
});

// 重置验证码
const onResetCode = () => {
  if (canvasCtx.value) {
    charater.value = '';
    charater.value = drawCharater({
      canvasElement: canvasCtx.value,
      width,
      height,
    });
  }
};

// 登录
const onLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await userStore.onLogin(loginForm);
      if (res?.success) {
        router.push('/home');
      }
    } else {
      return false;
    }
  });
};

// 注册
const onRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      await userStore.onRegister(loginForm);
      isRegister.value = false;
    } else {
      return false;
    }
  });
};

const onEnter = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await userStore.onLogin(loginForm);
      if (res?.success) {
        router.push('/home');
      }
    } else {
      return false;
    }
  });
};

// 重置密码并登录
const onResetAndLogin = () => {
  onResetEnter();
};

// 重置密码
const onResetEnter = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      const loginInfo = await userStore.onResetPwd(loginForm);
      if (loginInfo?.success) {
        router.push('home');
      }
    } else {
      return false;
    }
  });
};

// 账号注册
const toRegister = (type: boolean) => {
  isRegister.value = type;
};

// 忘记密码
const onForgetPwd = () => {
  isRestore.value = true;
  formRef.value?.resetFields(['password']);
};

// 返回登录
const onBackLogin = () => {
  isRestore.value = false;
  formRef.value?.resetFields(['password', 'confirmPwd']);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: @fff;
  background-color: @login-bg-color;

  :deep {
    .el-input {
      input {
        background: transparent;
        appearance: none;
        color: @000;
        caret-color: @000;
        &:-webkit-autofill {
          color: @000;
          box-shadow: 0 0 0 1000px @fff inset !important;
          -webkit-text-fill-color: @000 !important;
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    height: 500px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;

    .content-left {
      color: @fff;
      width: 350px;
      height: 100%;
      background-image: url('@/assets/img/login.jpeg');
      background-size: cover;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .content-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
      background-color: @fff;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;

      .title {
        height: 50px;
        line-height: 50px;
        padding: 0 50px;
        margin-bottom: 30px;
        font-size: 20px;
        font-weight: 700;
        color: @000;
      }

      .form-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 450px;

        .form-item {
          margin-bottom: 30px;
          padding: 0 50px;
        }

        .code-item {
          display: flex;
          justify-content: flex-start;

          .code-inp {
            flex: 1;
            border-radius: 10px;
          }

          :deep {
            .el-input__wrapper {
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: 0 !important;
            }
          }

          .code-canvas {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            cursor: pointer;
          }
        }

        .code-canvas {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          cursor: pointer;
        }

        .action-list {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0;
          margin-top: 10px;

          .action {
            flex: 1;
          }
        }
      }

      .reset-wrap {
        display: flex;
        justify-content: flex-end;
        padding: 0 50px;
        margin-top: 10px;
      }
    }
  }
}
</style>
