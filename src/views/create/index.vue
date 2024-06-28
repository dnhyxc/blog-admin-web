<template>
  <div class="edit-wrap">
    <el-drawer v-model="visible" direction="rtl" class="el-drawer" :before-close="cancelClick">
      <template #header>
        <div class="title">创建文章</div>
      </template>
      <template #default>
        <div>
          <el-form ref="formRef" :label-width="82" :model="createArticleForm" class="form-wrap">
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
              <el-select v-model="createArticleForm.classify" placeholder="请选择文章分类">
                <el-option v-for="classify in ARTICLE_CLASSIFY" :key="classify" :label="classify" :value="classify" />
              </el-select>
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
              <el-select v-model="createArticleForm.tag" placeholder="请输入文章标签">
                <el-option v-for="tag in ARTICLE_TAG" :key="tag.key" :label="tag.label" :value="tag.label" />
              </el-select>
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
                class="el-date-picker"
              />
            </el-form-item>
            <el-form-item prop="coverImage" label="文章封面" class="form-item-cover">
              <div class="cover-wrap">
                <Upload
                  v-model:file-path="createArticleForm.coverImage"
                  :delete="!detailStore.detail.id"
                  :get-upload-url="getUploadUrl"
                  :on-remove-old-image="onRemoveOldImage"
                >
                  <template #preview>
                    <img
                      :src="createArticleForm.coverImage || detailStore.detail?.coverImage!"
                      class="cover-img"
                      alt="文章封面"
                    />
                  </template>
                </Upload>
              </div>
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
import { onMounted, ref, watchEffect, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { detailStore, settingStore, createStore, articleStore } from '@/store';
import { CreateArticleParams } from '@/typings/comment';
import { ARTICLE_CLASSIFY, ARTICLE_TAG } from '@/constant';
import Editor from '@/components/Editor/index.vue';

const route = useRoute();
const router = useRouter();

const { id } = route.query;

const mackdownValue = ref<string>('');
const visible = ref<boolean>(false);
const formRef = ref<FormInstance>();
const createArticleForm = ref<CreateArticleParams>({
  title: '',
  classify: '',
  tag: '',
  createTime: id ? detailStore.detail.createTime : new Date().valueOf(),
  abstract: '',
  authorId: '',
  articleId: '',
  authorName: '',
  coverImage: '',
});
const oldCoverImage = ref<string>('');

// 监听 visible 状态实时设置表单值
watchEffect(() => {
  if (!visible.value && id) {
    const { title, classify, tag, createTime, abstract, authorId, articleId, authorName, coverImage } =
      createArticleForm.value;
    const params = {
      title: title || detailStore.detail.title,
      classify: classify || detailStore.detail.classify,
      tag: tag || detailStore.detail.tag,
      createTime: createTime || detailStore.detail.createTime,
      abstract: abstract || detailStore.detail.abstract,
      authorId: authorId || detailStore.detail.authorId,
      articleId: articleId || detailStore.detail.id,
      authorName: authorName || detailStore.detail.authorName,
      coverImage: coverImage || detailStore.detail.coverImage,
    };
    createArticleForm.value = {
      ...params,
    } as CreateArticleParams;
  }
});

onMounted(async () => {
  // 获取绑定的前台账号信息
  settingStore.getBindUserInfo();
  // 进入页面时，如果有id，则通过id查找详情内容
  if (id) {
    await detailStore.getArticleDetail(id as string);
    oldCoverImage.value = detailStore.detail?.coverImage || '';
  } else {
    detailStore.clearDetail();
  }
});

onUnmounted(() => {
  detailStore.clearDetail();
  settingStore.onReset();
  createStore.clearId();
});

const getUploadUrl = async (url: string) => {
  if (oldCoverImage.value !== url) {
    createArticleForm.value.coverImage = url;
  }
};

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
const cancelClick = (e: Event | null, delUrl?: string) => {
  visible.value = false;
  if (createArticleForm.value.coverImage && createArticleForm.value.coverImage !== oldCoverImage.value) {
    // 查找是否有别的文章应用该封面，没有则删除
    articleStore.findArticleByCoverImage(
      delUrl || createArticleForm.value.coverImage,
      createArticleForm.value.authorId!,
    );
  }
};

const onRemoveOldImage = () => {
  if (createArticleForm.value.coverImage && createArticleForm.value.coverImage !== oldCoverImage.value) {
    // 查找是否有别的文章应用该封面，没有则删除
    articleStore.findArticleByCoverImage(createArticleForm.value.coverImage, createArticleForm.value.authorId!);
  }
};

// 确定
const confirmClick = (e: Event) => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      const params = {
        ...createArticleForm.value,
        createTime: moment(createArticleForm.value.createTime).valueOf(),
        content: mackdownValue.value,
        oldCoverImage: oldCoverImage.value,
      };
      if (route.query.id) {
        params.articleId = route.query.id as string;
        params.authorName =
          settingStore.bindUserInfo.find((i) => i.userId === createArticleForm.value.authorId)?.username || '';
        await createStore.updateArticle(params);
      } else {
        await createStore.createArticle(params);
      }
      visible.value = false;
      router.push('/article');
    } else {
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

    .form-item-cover {
      display: flex;

      .cover-wrap {
        flex: 1;
        display: flex;
        align-content: center;
        justify-content: center;
        height: 140px;

        .cover-img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          .imgStyle;
        }
      }
    }
  }
}
</style>
