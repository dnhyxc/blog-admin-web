<template>
  <div class="comment">
    <div class="el-collapse-wrap">
      <el-collapse v-model="activeNames" class="el-collapse" @change="handleChange">
        <div class="tag-list">
          <el-collapse-item v-for="item in commentStore.articleList.list" :key="item.id" :name="item.id">
            <template #title>
              <div class="title">{{ item.title }}</div>
            </template>
            <Comment
              :comments="item.comments"
              :article-id="item.authorId!"
              :author-id="item.authorId!"
              class="comment-detail"
            />
          </el-collapse-item>
        </div>
      </el-collapse>
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="PAGESIZE"
      background
      :disabled="disabled"
      layout="prev, pager, next"
      :total="commentStore.articleList.total"
      :hide-on-single-page="commentStore.articleList.total <= PAGESIZE"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { commentStore } from '@/store';
import { PAGESIZE } from '@/constant';
import Comment from '@/components/Comment/index.vue';

const activeNames = ref();
const currentPage = ref<number>(1);
const currentId = ref<string>('');
const disabled = ref<boolean>(false);

onBeforeMount(() => {
  commentStore.comments = [];
});

watch(currentPage, async (cur, prev) => {
  if (cur) {
    await commentStore.getArticlesComments({ pageNo: currentPage.value });
  }
});

watch(currentId, async (cur, prev) => {
  if (cur) {
    console.log(cur, 'cur');

    await commentStore.getCommentList(cur);
  }
});

onMounted(async () => {
  await commentStore.getArticlesComments({ pageNo: currentPage.value });
});

// 折叠板展开事件
const handleChange = async (id: string) => {
  console.log(id, 'id');
  currentId.value = id;
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.comment {
  .layoutStyles();
  padding-right: 0;
  overflow: auto;

  :deep(.el-collapse) {
    padding: 0;
    border-top: none;
    background-color: @bg-color-page;
  }

  .tag-list {
    box-sizing: border-box;
  }
}
</style>
