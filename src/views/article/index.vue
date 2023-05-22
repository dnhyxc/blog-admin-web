<template>
  <div class="article-list-wrap">
    <el-table
      ref="multipleTableRef"
      :data="articleStore.list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="标题" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="作者" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.authorName }}</template>
      </el-table-column>
      <el-table-column property="classify" label="分类" show-overflow-tooltip />
      <el-table-column property="tag" label="标签" show-overflow-tooltip />
      <el-table-column property="createTime" label="发表时间" show-overflow-tooltip>
        <template #default="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column property="status" label="发布状态" show-overflow-tooltip>
        <template #default="scope">
          <div class="status" :title="scope.row.isDelete ? '已下架' : '已上架'">
            <span v-if="scope.row.isDelete"><span class="status-del" />已下架</span>
            <span v-else><span class="status-use" />已上架</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="265">
        <template #default="scope">
          <div class="actions">
            <el-button link type="primary" @click="toDetail(scope.row.id)">详情</el-button>
            <el-button link :type="!scope.row.isTop ? 'primary' : 'warning'" @click="onTopOfCancelTop(scope.row)">
              {{ scope.row.isTop ? '取消置顶' : '文章置顶' }}
            </el-button>
            <el-button link type="primary" @click="onEdit(scope.row)">编辑</el-button>
            <el-button link :type="scope.row.isDelete ? 'primary' : 'warning'" @click="onManageArticle(scope.row)">
              {{ scope.row.isDelete ? '上架' : '下架' }}
            </el-button>
            <el-button link type="danger" @click="onDelete(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <div>
        <el-button type="primary" :disabled="!multipleSelection.length" @click="onRestoreAll">批量上架</el-button>
        <el-button type="warning" :disabled="!multipleSelection.length" @click="onRemoveAll">批量下架</el-button>
        <el-button type="danger" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="PAGESIZE"
        background
        :disabled="disabled"
        layout="prev, pager, next"
        :total="articleStore.total"
        :hide-on-single-page="articleStore.list.length <= PAGESIZE"
      />
    </div>
    <Message
      v-model:visible="messageVisible"
      title="删除文章"
      content="确定删除该文章吗？"
      info="删除文章后，该文章将无法恢复！"
      :on-submit="onSubmitDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElTable } from 'element-plus';
import { PAGESIZE } from '@/constant';
import { formatDate } from '@/utils';
import { ArticleItem } from '@/typings/comment';
import { articleStore, userStore, createStore } from '@/store';
import Message from '@/components/Message/index.vue';
import { sendMessage } from '@/socket';

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ArticleItem[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteId = ref<string>(''); // 选中需要删除的文章id
const deleteIds = ref<string[]>([]); // 批量删除ids

const router = useRouter();

onMounted(() => {
  articleStore.getArticleList(currentPage.value);
});

// 监听分页变化，实时获取对应页数的文章列表
watch(currentPage, (newVal, oldVal) => {
  articleStore.getArticleList(newVal);
});

// 多选
const handleSelectionChange = (val: ArticleItem[]) => {
  multipleSelection.value = val;
};

// 去详情
const toDetail = (id: string) => {
  console.log(id, 'toDetail');
  router.push(`/detail/${id}`);
};

// 设置文章置顶或者取消置顶
const onTopOfCancelTop = (item: ArticleItem) => {
  const { isTop, id } = item;
  if (isTop) {
    onCancelTop(id);
  } else {
    onTop(id);
  }
};

// 置顶
const onTop = async (id: string) => {
  await createStore.updateArticle({
    articleId: id,
    isTop: new Date().valueOf(),
  });
  articleStore.getArticleList(currentPage.value);
};

// 取消置顶
const onCancelTop = async (id: string) => {
  await createStore.updateArticle({
    articleId: id,
    isTop: 0,
  });
  articleStore.getArticleList(currentPage.value);
};

// 编辑
const onEdit = (item: ArticleItem) => {
  const { id } = item;
  router.push(`/create?id=${id}`);
};

// 上架、下架操作
const onManageArticle = (item: ArticleItem) => {
  const { isDelete, id } = item;
  if (isDelete) {
    onRestore(id);
  } else {
    onRemove(id);
  }
  sendMessage(JSON.stringify({ action: 'push', data: '来了老弟', userId: userStore?.userId! }));
};

// 上架
const onRestore = (id: string) => {
  articleStore.shelvesArticle([id]);
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 下架
const onRemove = (id: string) => {
  articleStore.removeArticle([id]);
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 删除
const onDelete = (id: string) => {
  deleteId.value = id;
  messageVisible.value = true;
};

// 多选下架
const onRemoveAll = () => {
  const ids = multipleSelection.value.filter((j) => !j.isDelete).map((i) => i.id) || [];
  articleStore.removeArticle(ids);
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 多选上架
const onRestoreAll = () => {
  const ids = multipleSelection.value.filter((j) => j.isDelete).map((i) => i.id) || [];
  articleStore.shelvesArticle(ids);
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 多选删除
const onDeleteAll = () => {
  const ids = multipleSelection.value.map((j) => j.id) || [];
  deleteIds.value = ids;
  messageVisible.value = true;
};

// 二次确认删除
const onSubmitDelete = async () => {
  await articleStore.batchDelArticle(deleteIds.value.length ? deleteIds.value : [deleteId.value], currentPage.value);
  // 删除完成之后，清除之前选择的账号ids
  deleteIds.value = [];
  // 取消多选
  multipleTableRef.value!.clearSelection();
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.article-list-wrap {
  .layoutStyles();

  .status {
    .status-use,
    .status-del {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      margin-right: 6px;
    }

    .status-use {
      background-color: @success;
    }

    .status-del {
      background-color: @warning;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    background-color: @fff;
    padding: 18px 10px;
  }
}
</style>
