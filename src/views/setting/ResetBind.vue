<!--
 * 绑定前台账户页面
 * @author: dnhyxc
 * @since: 2023-01-05
 * index.vue
-->
<template>
  <div class="bind-wrap">
    <div class="content">
      <el-form ref="formRef" :model="bindAccountForm" label-width="110px" class="form-wrap">
        <el-form-item
          v-for="(domain, index) in bindAccountForm.domains"
          :key="domain.key"
          :label="`绑定账号名${index + 1}`"
          :prop="`domains.${index}.value`"
          :rules="{
            required: true,
            message: '请输入需要绑定的前台账号名称',
          }"
          class="form-item-custom"
        >
          <div class="inp-wrap">
            <el-input v-model="domain.value" placeholder="请输入需要绑定的前台账号名称" />
            <el-button v-if="index > 0" class="del-btn" link @click.prevent="removeDomain(domain)">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item class="form-item-action">
          <div class="actions">
            <el-button type="primary" class="action-btn" @click="submitForm(formRef)">确定修改</el-button>
            <el-button v-if="bindAccountForm.domains.length < 5" class="action-btn" @click="addDomain">
              增加绑定账号
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import type { FormInstance } from 'element-plus';
import { settingStore, bindAccountStore } from '@/store';
import { BindUserRes } from '@/typings/comment';

interface DomainItem {
  key: string;
  value: string;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const props = withDefaults(defineProps<{ visible: boolean; getValues: Function }>(), {
  visible: false,
  getValues: () => {},
});

const emit = defineEmits<Emits>();

const formRef = ref<FormInstance>();
const bindAccountForm = reactive<{
  domains: DomainItem[];
}>({
  domains: [],
});

watchEffect(() => {
  if (props.visible) {
    bindAccountForm.domains = settingStore.bindUserInfo.map((i) => ({
      key: i.userId,
      value: i.username,
    }));
  }
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

// 确定修改
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const usernames = bindAccountForm.domains.map((i) => i.value);
      const res = (await bindAccountStore.bindAccount({
        usernames,
      })) as BindUserRes;

      const userInfos = res.findUsernames.map((i, index) => ({
        userId: res.bindUserIds[index],
        username: i,
      }));

      settingStore.setBindUsernames(userInfos);

      emit('update:visible', false);
    } else {
      return false;
    }
  });
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.bind-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: @fff;
  background-color: @fff;
  box-sizing: border-box;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;

    .form-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;

      .form-item,
      .form-item-custom,
      .form-item-action {
        margin-bottom: 30px;
        padding-right: 50px;

        &:last-child {
          margin-bottom: 0;
        }
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
            margin-bottom: 31px;
          }
        }
      }
    }
  }
}
</style>
