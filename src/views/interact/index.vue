<!--
 * 留言管理
 * @author: dnhyxc
 * @since: 2023-05-18
 * index.vue
-->
<template>
  <el-scrollbar class="intecact-wrap">
    <el-table
      ref="multipleTableRef"
      :data="interactStore.list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户名称" show-overflow-tooltip width="150">
        <template #default="scope">
          <div class="user-info">
            <el-image style="width: 50px; height: 50px; border-radius: 5px" :src="scope.row.avatar" fit="cover" />
            <span class="username">{{ scope.row.username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="comment" label="留言内容">
        <template #default="scope">
          <div class="comment">{{ scope.row.comment }}</div>
        </template>
      </el-table-column>
      <el-table-column property="createTime" label="发表时间" show-overflow-tooltip width="180">
        <template #default="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column property="status" label="显示状态" show-overflow-tooltip width="110">
        <template #default="scope">
          <div class="status" :title="scope.row.isDelete ? '隐藏' : '显示'">
            <span v-if="scope.row.isDelete"><span class="status-del" />已隐藏</span>
            <span v-else><span class="status-use" />已显示</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="105">
        <template #default="scope">
          <div class="actions">
            <el-button link :type="scope.row.isDelete ? 'primary' : 'warning'" @click="onManageInteract(scope.row)">
              {{ scope.row.isDelete ? '显示' : '隐藏' }}
            </el-button>
            <el-button link type="danger" @click="onDelete(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <div>
        <el-button type="primary" :disabled="!multipleSelection.length" @click="onRestoreAll">批量显示</el-button>
        <el-button type="warning" :disabled="!multipleSelection.length" @click="onRemoveAll">批量影藏</el-button>
        <el-button type="danger" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="PAGESIZE"
        background
        :disabled="disabled"
        layout="prev, pager, next"
        :total="interactStore.total"
        :hide-on-single-page="interactStore.list.length <= PAGESIZE"
      />
    </div>
    <Message
      v-model:visible="messageVisible"
      title="删除留言"
      content="确定删除留言吗？"
      info="删除留言后，该留言将无法恢复！"
      :on-submit="onSubmitDelete"
    />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { ElTable } from 'element-plus';
import { interactStore } from '@/store';
import { formatDate } from '@/utils';
import { PAGESIZE } from '@/constant';
import Message from '@/components/Message/index.vue';

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteId = ref<string>(''); // 选中需要删除的文章id
const deleteIds = ref<string[]>([]); // 批量删除ids

onMounted(() => {
  interactStore.getInteractList();
});

// 监听分页变化，实时获取对应页数的文章列表
watch(currentPage, (newVal, oldVal) => {
  interactStore.pageNo = newVal;
  interactStore.getInteractList();
});

// 多选
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};

// 上架、下架操作
const onManageInteract = (item: any) => {
  const { isDelete, id } = item;
  if (isDelete) {
    onRestore(id);
  } else {
    onRemove(id);
  }
};

// 上架
const onRestore = (id: string) => {
  interactStore.restoreInteracts([id]);
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 下架
const onRemove = (id: string) => {
  interactStore.removeInteracts([id]);
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
  interactStore.removeInteracts(ids);
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 多选上架
const onRestoreAll = () => {
  const ids = multipleSelection.value.filter((j) => j.isDelete).map((i) => i.id) || [];
  interactStore.restoreInteracts(ids);
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
  await interactStore.delInteracts(deleteIds.value.length ? deleteIds.value : [deleteId.value]);
  // 删除完成之后，清除之前选择的账号ids
  deleteIds.value = [];
  // 取消多选
  multipleTableRef.value!.clearSelection();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.intecact-wrap {
  .layoutStyles();

  .user-info {
    display: flex;
    align-items: center;

    .username {
      margin-left: 10px;
    }
  }

  .comment {
    display: flex;
    align-items: center;
    min-height: 80px;
  }

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
