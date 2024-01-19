<!--
 * 工具管理
 * @author: dnhyxc
 * @since: 2023-06-05
 * index.vue
-->
<template>
  <Loading :loading="toolsStore.loading" class="tools-wrap">
    <div class="action-list">
      <el-button type="primary" @click="onAddTool">添加工具</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
    </div>
    <el-scrollbar class="content">
      <el-table
        ref="multipleTableRef"
        :data="toolsStore.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="工具名称" show-overflow-tooltip width="220">
          <template #default="scope">
            <div class="user-info">
              <el-image
                style="width: 50px; height: 50px; min-width: 50px; border-radius: 5px"
                :src="scope.row.toolUrl || TOOL_SVG"
                fit="cover"
              />
              <span class="username">{{ scope.row.toolName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="toolHref" label="工具链接" min-width="300">
          <template #default="scope">
            <a :href="scope.row.toolHref" class="tool-herf" target="_blank">{{ scope.row.toolHref }}</a>
          </template>
        </el-table-column>
        <el-table-column property="createTime" label="添加时间" show-overflow-tooltip width="180">
          <template #default="scope">{{ formatDate(scope.row.createTime) }}</template>
        </el-table-column>
        <el-table-column property="powerUsers" label="权限范围" show-overflow-tooltip width="280">
          <template #default="scope">
            <div class="tool-users">
              <div v-for="item in scope.row.powerUsers" :key="item.id" class="power">
                <span>{{ item.username }}</span>
              </div>
              <div v-if="!scope.row?.powerUsers?.length" class="power">全员可见</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="175">
          <template #default="scope">
            <div class="actions">
              <el-button link type="primary" @click="onSetPower(scope.row)">权限设置</el-button>
              <el-button link type="primary" @click="onEditTool(scope.row)">编辑</el-button>
              <el-button link type="danger" @click="onDelete(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          v-model:current-page="toolsStore.pageNo"
          :page-size="PAGESIZE"
          background
          :disabled="disabled"
          layout="prev, pager, next"
          :total="toolsStore.total"
          :hide-on-single-page="toolsStore.list.length <= PAGESIZE"
        />
      </div>
    </el-scrollbar>
  </Loading>
  <Message
    v-model:visible="messageVisible"
    title="删除工具"
    content="确定删除工具吗？"
    info="删除后，该工具将无法恢复！"
    :on-submit="onSubmitDelete"
  />
  <Modal v-model:visible="visible" title="选择用户" :width="550" content-padding="0" :on-submit="onSelectedUsers">
    <div class="select-user-modal-content">
      <SelectUser ref="selectUserRef" :selected-users="selectedUsers" :visible="visible" />
    </div>
  </Modal>
  <Modal
    v-model:visible="addVisible"
    title="添加工具"
    :width="550"
    content-padding="20px 20px 0"
    :on-submit="onAddedTools"
  >
    <div class="add-tools-modal-content">
      <AddTools ref="addToolsRef" :add-visible="addVisible" :selected-item="selectedItem" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { ElTable } from 'element-plus';
import type { FormInstance } from 'element-plus';
import { toolsStore, accountStore } from '@/store';
import { formatDate } from '@/utils';
import { PAGESIZE, TOOL_SVG } from '@/constant';
import { ToolsParams, UserInfoParams } from '@/typings/comment';
import Message from '@/components/Message/index.vue';
import AddTools from './AddTools/index.vue';

type ExportParams = { formRef: FormInstance; addToolsForm: ToolsParams; toolUrl: string; clearToolUrl: Function };

const selectUserRef = ref<HTMLElement | null>(null);
const addToolsRef = ref<HTMLElement | null>(null);
// 选人组件控制状态
const visible = ref<boolean>(false);
const addVisible = ref<boolean>(false);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ToolsParams[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteId = ref<string>(''); // 选中需要删除的文章id
const deleteIds = ref<string[]>([]); // 批量删除ids
// 选择的对应列表的权限用户列表
const selectedUsers = ref<{ username: string; id: string }[]>();
// 选中列表 item id
const selectId = ref<string>('');
// 选中的对应列表数据
const selectedItem = ref<ToolsParams>({
  toolHref: '',
  toolName: '',
  toolUrl: '',
  powerUsers: [],
  id: '',
});

onMounted(() => {
  toolsStore.getToolList();
});

// 页面销毁时，清空选人组件用户列表
onUnmounted(() => {
  accountStore.clearUserListInfo();
});

// 监听分页变化，实时获取对应页数的工具列表
watch(currentPage, (newVal, oldVal) => {
  toolsStore.pageNo = newVal;
  toolsStore.getToolList();
});

// 监听选人组件是否关闭
watch(visible, (newVal) => {
  if (!newVal) {
    const { onRemoveAll } = selectUserRef.value as any;
    onRemoveAll?.();
  }
});

// 多选
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};

// 设置权限
const onSetPower = (item: ToolsParams) => {
  visible.value = true;
  const { id, powerUsers } = item;
  selectId.value = id!;
  selectedUsers.value = powerUsers;
};

// 编辑工具
const onEditTool = (item: ToolsParams) => {
  selectId.value = item.id!;
  selectedItem.value = item;
  addVisible.value = true;
};

// 删除
const onDelete = (id: string) => {
  deleteId.value = id;
  messageVisible.value = true;
};

// 多选删除
const onDeleteAll = () => {
  const ids = multipleSelection.value.map((j) => j.id!) || [];
  deleteIds.value = ids;
  messageVisible.value = true;
};

// 二次确认删除
const onSubmitDelete = async () => {
  await toolsStore.deleteTools(deleteIds.value.length ? deleteIds.value : [deleteId.value]);
  // 删除完成之后，清除之前选择的账号ids
  deleteIds.value = [];
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 完成选人
const onSelectedUsers = () => {
  visible.value = false;
  const { selectedUsers } = selectUserRef.value as any;
  const params = selectedUsers.map((i: UserInfoParams) => {
    return {
      id: i.id,
      username: i.username,
    };
  });
  toolsStore.updateTools({
    powerUsers: params,
    id: selectId.value,
  });
};

// 添加工具
const onAddTool = () => {
  addVisible.value = true;
};

// 添加工具
const onAddedTools = async () => {
  const { formRef, addToolsForm, clearToolUrl, toolUrl } = addToolsRef.value as unknown as ExportParams;
  const params = {
    ...addToolsForm,
    toolUrl,
  };
  formRef?.validate(async (valid) => {
    if (valid) {
      if (selectedItem.value?.id) {
        await toolsStore.updateTools({
          ...params,
          id: selectId.value,
        });
      } else {
        await toolsStore.addTools(params);
      }
      formRef?.resetFields();
      clearToolUrl?.();
      addVisible.value = false;
      selectedItem.value = {};
    } else {
      return false;
    }
  });
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.tools-wrap {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .layoutStyles();

  .action-list {
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
  }

  .content {
    flex: 1;

    :deep {
      .el-image__error {
        font-size: 12px;
      }
    }

    .action-list {
      // display: flex;
      // align-items: center;
      // background-color: @fff;
      // height: 50px;
      // padding: 0 12px;
      // border-bottom: 1px solid @primary-light-9;
    }

    .user-info {
      display: flex;
      align-items: center;

      .username {
        margin-left: 10px;
        .ellipsis();
      }
    }

    .tool-herf {
      display: flex;
      align-items: center;
      min-height: 80px;
      color: @primary;
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
}

.select-user-modal-content {
  border-top: 1px solid @primary-light-9;
  border-bottom: 1px solid @primary-light-9;
  box-sizing: border-box;
  margin-top: 5px;
  padding-top: 10px;
}
</style>
