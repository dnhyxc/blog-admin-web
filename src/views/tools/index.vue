<!--
 * 工具管理
 * @author: dnhyxc
 * @since: 2023-06-05
 * index.vue
-->
<template>
  <el-scrollbar class="tools-wrap">
    <div class="action-list">
      <el-button type="primary" @click="onAddTool">添加工具</el-button>
      <el-button type="primary" :disabled="!multipleSelection.length" @click="onRestoreAll">批量设置</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
    </div>
    <el-table ref="multipleTableRef" :data="data" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="工具名称" show-overflow-tooltip width="150">
        <template #default="scope">
          <div class="user-info">
            <el-image style="width: 50px; height: 50px; border-radius: 5px" :src="scope.row.toolUrl" fit="cover" />
            <span class="username">{{ scope.row.toolName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="toolHref" label="工具链接">
        <template #default="scope">
          <div class="tool-herf">{{ scope.row.toolHref }}</div>
        </template>
      </el-table-column>
      <el-table-column property="createTime" label="发表时间" show-overflow-tooltip width="180">
        <template #default="scope">{{ formatDate(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column property="powerUsers" label="权限范围" show-overflow-tooltip width="350">
        <template #default="scope">
          <div class="tool-users">
            <div v-for="item in scope.row.powerUsers" :key="item.id" class="power">
              <span>{{ item.username }}</span>
            </div>
            <div v-if="!scope.row?.powerUsers?.length" class="power">全员可见</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <div class="actions">
            <el-button link type="primary" @click="onSetPower(scope.row)">权限设置</el-button>
            <el-button link type="primary" @click="onDelete(scope.row.id)">删除工具</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
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
  </el-scrollbar>
  <Message
    v-model:visible="messageVisible"
    title="删除留言"
    content="确定删除留言吗？"
    info="删除留言后，该留言将无法恢复！"
    :on-submit="onSubmitDelete"
  />
  <Modal v-model:visible="visible" title="选择用户" :width="550" content-padding="0" :on-submit="onSelectedUsers">
    <div class="select-user-modal-content">
      <SelectUser ref="selectUserRef" :selected-users="selectedUsers" :visible="visible" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { ElTable } from 'element-plus';
import { interactStore, accountStore } from '@/store';
import { formatDate } from '@/utils';
import { PAGESIZE } from '@/constant';
import Message from '@/components/Message/index.vue';

const selectUserRef = ref<HTMLElement | null>(null);
const visible = ref<boolean>(false);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteId = ref<string>(''); // 选中需要删除的文章id
const deleteIds = ref<string[]>([]); // 批量删除ids
// 选择的对应列表的权限用户列表
const selectedUsers = ref<{ username: string; id: string }[]>();

const data = [
  {
    toolName: '墨客',
    toolHref: 'http://43.143.27.249:9216',
    toolUrl: 'http://localhost:9112/image/9c1a6a6a5d690b347f29e60e57a1e993.jpg',
    powerUsers: [
      {
        username: '夏陌',
        id: '6449d137e5fe6b620b205192',
      },
      {
        username: '墨客',
        id: '6447c43efad309875e3c1bb5',
      },
      {
        username: '春风吹拂',
        id: '6432bdf2c96690db3679ffd0',
      },
      {
        username: 'xixi',
        id: '642f043db47853baa1c9f85e',
      },
      {
        username: '遇见晨曦',
        id: '642d7f4c94e40ab9d12405b6',
      },
    ],
    id: 1,
  },
  {
    toolName: 'GitHub',
    toolHref: 'http://43.143.27.249:9216',
    toolUrl: 'http://localhost:9112/image/9c1a6a6a5d690b347f29e60e57a1e993.jpg',
    powerUsers: [
      {
        username: '夏陌',
        id: '6449d137e5fe6b620b205192',
      },
      {
        username: '墨客',
        id: '6447c43efad309875e3c1bb5',
      },
      {
        username: '春风吹拂',
        id: '6432bdf2c96690db3679ffd0',
      },
    ],
    id: 2,
  },
  {
    toolName: 'Electron',
    toolHref: 'http://43.143.27.249:9216',
    toolUrl: 'http://localhost:9112/image/9c1a6a6a5d690b347f29e60e57a1e993.jpg',
    powerUsers: [
      {
        username: '夏陌',
        id: '6449d137e5fe6b620b205192',
      },
      {
        username: '墨客',
        id: '6447c43efad309875e3c1bb5',
      },
    ],
    id: 3,
  },
  {
    toolName: 'Electron',
    toolHref: 'http://43.143.27.249:9216',
    toolUrl: 'http://localhost:9112/image/9c1a6a6a5d690b347f29e60e57a1e993.jpg',
    powerUsers: [],
    id: 4,
  },
];

onMounted(() => {
  interactStore.getInteractList();
});

// 页面销毁时，清空选人组件用户列表
onUnmounted(() => {
  accountStore.clearUserListInfo();
});

// 监听分页变化，实时获取对应页数的工具列表
watch(currentPage, (newVal, oldVal) => {
  interactStore.pageNo = newVal;
  interactStore.getInteractList();
});

// 监听选人组件是否关闭
watch(visible, (newVal) => {
  if (!newVal) {
    const { onRemoveAll, selectedUsers } = selectUserRef.value;
    console.log(selectedUsers, 'selectedUsers');
    onRemoveAll?.();
  }
});

// 多选
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};

// 设置权限
const onSetPower = (item: any) => {
  console.log(item, 'item');

  visible.value = true;
  const { isDelete, id, powerUsers } = item;
  console.log(isDelete, id, 'isDelete, id ', powerUsers);
  selectedUsers.value = powerUsers;
};

// 删除
const onDelete = (id: string) => {
  deleteId.value = id;
  messageVisible.value = true;
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

// 添加工具
const onAddTool = () => {
  console.log('添加工具');
};

// 完成选人
const onSelectedUsers = () => {
  visible.value = false;
  const { selectedUsers } = selectUserRef.value;
  console.log(selectedUsers, 'selectedUsers》》》》设置权限');
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.tools-wrap {
  .layoutStyles();

  .action-list {
    display: flex;
    align-items: center;
    background-color: @fff;
    height: 50px;
    padding: 0 12px;
    border-bottom: 1px solid @primary-light-9;
  }

  .user-info {
    display: flex;
    align-items: center;

    .username {
      margin-left: 10px;
    }
  }

  .tool-herf {
    display: flex;
    align-items: center;
    min-height: 80px;
  }

  .tool-users {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 80px;

    .power {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
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
    justify-content: flex-end;
    background-color: @fff;
    padding: 18px 10px;
  }
}

.select-user-modal-content {
  border-top: 1px solid @primary-light-9;
  border-bottom: 1px solid @primary-light-9;
  box-sizing: border-box;
  margin-top: 5px;
  padding-top: 10px;
}
</style>
