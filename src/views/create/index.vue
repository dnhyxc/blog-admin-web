<template>
  <div class="edit-wrap">
    <el-drawer v-show="visible" v-model="visible" direction="rtl" custom-class="el-drawer">
      <template #header>
        <div class="title">创建文章</div>
      </template>
      <template #default>
        <div>
          <el-form ref="formRef" :model="createArticleForm" class="form-wrap">
            <el-form-item
              prop="title"
              label="文章标题"
              :rules="[
                {
                  required: true,
                  message: '请输入文章标题',
                  trigger: 'blur',
                },
              ]"
              class="form-item"
            >
              <el-input v-model="createArticleForm.title" placeholder="请输入文章标题" />
            </el-form-item>
            <el-form-item
              prop="classify"
              label="文章分类"
              :rules="[
                {
                  required: true,
                  message: '请输入文章分类',
                  trigger: 'blur',
                },
              ]"
              class="form-item"
            >
              <el-input v-model="createArticleForm.classify" placeholder="请输入文章分类" />
            </el-form-item>
            <el-form-item
              prop="tag"
              label="文章标签"
              :rules="[
                {
                  required: true,
                  message: '请输入文章标签',
                  trigger: 'blur',
                },
              ]"
              class="form-item"
            >
              <el-input v-model="createArticleForm.tag" placeholder="请输入文章标签" />
            </el-form-item>
            <el-form-item
              prop="createTime"
              label="发文时间"
              :rules="[
                {
                  required: true,
                  message: '请选择发文时间',
                  trigger: 'blur',
                },
              ]"
              class="form-item"
            >
              <el-date-picker
                v-model="createArticleForm.createTime"
                type="datetime"
                placeholder="请选择发文时间"
                :default-time="new Date()"
                class="el-date-picker"
              />
            </el-form-item>
            <el-form-item
              prop="authorId"
              label="文章作者"
              :rules="[
                {
                  required: true,
                  message: '请选择文章作者',
                  trigger: 'blur',
                },
              ]"
              class="form-item"
            >
              <el-select v-model="createArticleForm.authorId" clearable placeholder="请选择文章作者">
                <el-option
                  v-for="item in settingStore.bindUserInfo"
                  :key="item.userId"
                  :label="item.username"
                  :value="item.userId"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="abstract"
              label="文章摘要"
              :rules="[
                {
                  required: true,
                  message: '请输入文章摘要',
                  trigger: 'blur',
                },
              ]"
              class="form-item"
            >
              <el-input
                v-model="createArticleForm.abstract"
                :autosize="{ minRows: 5, maxRows: 8 }"
                type="textarea"
                maxlength="300"
                placeholder="请输入文章摘要"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">发布</el-button>
        </div>
      </template>
    </el-drawer>
    <Editor :mackdown="detailStore.detail.content" :article-id="(route.query.id as string)" :on-publish="onPublish" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { detailStore, settingStore, createStore } from '@/store';
import { CreateArticleParams } from '@/typings/comment';
import Editor from '@/components/Editor/index.vue';

const route = useRoute();

const mackdownValue = ref<string>('');
const visible = ref<boolean>(false);
const formRef = ref<FormInstance>();
const createArticleForm = ref<CreateArticleParams>({
  title: '',
  classify: '',
  tag: '',
  createTime: 0,
  abstract: '',
  authorId: '',
});

// 监听 visible 状态实时设置表单值
watchEffect(() => {
  if (!visible.value) {
    // formRef.value?.resetFields();
    createArticleForm.value = {
      ...detailStore.detail,
      createTime: detailStore.detail.createTime || new Date().valueOf(),
    } as CreateArticleParams;
  }
});

// 进入创建页前，先清除详情内容
onBeforeMount(() => {
  if (!route.query.id) {
    detailStore.clearDetail();
  }
});

onMounted(() => {
  // 获取绑定的前台账号信息
  settingStore.getBindUserInfo();
  // 进入页面时，如果有id，则通过id查找详情内容
  const { id } = route.query;
  if (id) {
    detailStore.getArticleDetail(id as string);
  }
});

// 发布文章
const onPublish = (html: string) => {
  if (!html.trim()) {
    ElMessage.warning('一个字都还没写呢，休想发布');
    return;
  }
  mackdownValue.value = html;
  visible.value = true;
};

// 取消
const cancelClick = () => {
  visible.value = false;
};

// 确定
const confirmClick = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      const params = {
        ...createArticleForm.value,
        content: mackdownValue.value,
      };
      if (route.query.id) {
        console.log(params, '更新文章文章>>>>>>html');
      } else {
        console.log(params, '发布文章>>>>>>html');
        createStore.createArticle(params);
      }
      visible.value = false;
    } else {
      console.log(createArticleForm, 'error submit!');
      return false;
    }
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.edit-wrap {
  .layoutStyles();

  :deep {
    .el-drawer__header {
      padding: 10px 2px 10px 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid @border-color;
    }

    .el-drawer__close-btn {
      padding: 10px;
    }

    .el-drawer {
      min-width: 435px;
    }

    .el-date-picker {
      display: flex;
      width: 100%;

      .el-input__wrapper {
        flex: 1;
      }
    }

    .el-select {
      flex: 1;
    }
  }

  .title {
    font-weight: 700;
  }

  .form-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .form-item {
      margin-bottom: 30px;
      width: 100%;
    }
  }
}
</style>
