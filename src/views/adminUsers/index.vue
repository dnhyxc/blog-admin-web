<!--
 * 后台账户列表
 * @author: dnhyxc
 * @since: 2023-01-05
 * index.vue
-->
<template>
  <Loading :loading="adminAccountStore.loading" class="users-wrap">
    <div class="action-btn">
      <el-button type="warning" :disabled="!multipleSelection.length" @click="onRemoveAll">批量作废</el-button>
      <el-button type="primary" :disabled="!multipleSelection.length" @click="onRestoreAll">批量恢复</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
    </div>
    <div class="content">
      <el-table
        ref="multipleTableRef"
        :data="adminAccountStore.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="用户名" show-overflow-tooltip>
          <template #default="scope">
            <div class="username">
              {{ scope.row.username }}
            </div>
          </template>
        </el-table-column>
        <el-table-column property="auth" label="权限">
          <template #default="scope">
            <div v-if="scope.row.auth === 0" class="auth">普通用户</div>
            <div v-else-if="scope.row.auth === 1" class="auth">超级管理员</div>
            <div v-else-if="scope.row.auth === 2" class="auth">管理员</div>
            <div v-else class="auth">普通用户</div>
          </template>
        </el-table-column>
        <el-table-column property="createTime" label="注册时间" show-overflow-tooltip />
        <el-table-column property="status" label="账号状态">
          <template #default="scope">
            <div class="status" :title="scope.row.isDelete ? '已作废' : '使用中'">
              <span v-if="scope.row.isDelete"><span class="status-del" />已作废</span>
              <span v-else><span class="status-use" />使用中</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="175">
          <template #default="scope">
            <div class="actions">
              <el-button link type="primary" @click="onSetAuth(scope.row)">权限设置</el-button>
              <el-button link :type="scope.row.isDelete ? 'primary' : 'warning'" @click="onManageUser(scope.row)">
                <span v-if="!scope.row.isDelete">作废</span>
                <span v-else>恢复</span>
              </el-button>
              <el-button link type="danger" @click="onDeleteUser(scope.row)">删除</el-button>
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
          :total="adminAccountStore.total"
          :hide-on-single-page="adminAccountStore.list.length <= adminAccountStore.total"
          @current-change="onPageChange"
        />
      </div>
    </div>
    <Modal v-model:visible="visible" :on-submit="onSetAuthSubmit" title="权限设置">
      <template #default>
        <el-radio-group v-model="authStatus" @change="onChangeAuthStatus">
          <el-radio :label="1">超级管理员</el-radio>
          <el-radio v-if="userAuth !== AUTH_CONFIG.SUPER" :label="2">管理员</el-radio>
          <el-radio :label="0">普通用户</el-radio>
        </el-radio-group>
      </template>
    </Modal>
    <Message
      v-model:visible="messageVisible"
      title="账号删除"
      content="确定删除该账号吗？"
      :on-submit="onSubmitDelete"
    />
  </Loading>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElTable } from 'element-plus';
import { AUTH_CONFIG, PAGESIZE } from '@/constant';
import { adminAccountStore, userStore } from '@/store';
import Modal from '@/components/Modal/index.vue';
import Message from '@/components/Message/index.vue';

interface UserType {
  id: string;
  username: string;
  createTime: string;
  auth: number;
  isDelete: boolean;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<UserType[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const visible = ref<boolean>(false); // 权限设置弹窗的状态
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const authStatus = ref<number>(1); // 选择需要设置的权限类型
const deleteId = ref<string>(''); // 删除id
const deleteIds = ref<string[]>([]); // 批量删除ids
const authUserId = ref<string>(''); // 需要设置权限的userId
const userAuth = ref<number>(0); // 需要设置权限的userId

onMounted(() => {
  getAdminAccountList();
});

// 获取账号列表
const getAdminAccountList = () => {
  adminAccountStore.getAdminUserList({
    pageNo: currentPage.value,
    pageSize: PAGESIZE,
    userId: userStore?.userId!,
  });
};

// 多选
const handleSelectionChange = (val: UserType[]) => {
  multipleSelection.value = val;
};

// 账号作废及恢复
const onManageUser = (scope: UserType) => {
  const { id, isDelete } = scope;
  if (isDelete) {
    onRestore(id);
  } else {
    onRemove(id);
  }
};

// 废除
const onRemove = (id: string) => {
  adminAccountStore.manageAccount({ userIds: [id], type: 1 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 恢复
const onRestore = (id: string) => {
  adminAccountStore.manageAccount({ userIds: [id], type: 0 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 批量作废
const onRemoveAll = () => {
  const ids = multipleSelection.value.filter((i) => !i.isDelete).map((j) => j.id);
  adminAccountStore.manageAccount({ userIds: ids, type: 1 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 批量恢复
const onRestoreAll = () => {
  const ids = multipleSelection.value.filter((i) => i.isDelete).map((j) => j.id);
  adminAccountStore.manageAccount({ userIds: ids, type: 0 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 删除账号
const onDeleteUser = (scope: UserType) => {
  const { id } = scope;
  deleteId.value = id;
  messageVisible.value = true;
};

// 批量删除
const onDeleteAll = () => {
  const ids = multipleSelection.value.map((j) => j.id);
  deleteIds.value = ids;
  messageVisible.value = true;
};

// 删除二次确认
const onSubmitDelete = async () => {
  await adminAccountStore.deleteAdminUsers({
    userIds: deleteIds.value.length ? deleteIds.value : [deleteId.value],
    pageNo: currentPage.value,
  });
  deleteIds.value = [];
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 设置权限
const onSetAuth = (scope: UserType) => {
  const { id, auth } = scope;
  authUserId.value = id;
  userAuth.value = auth;
  visible.value = true;
};

// 切换权限
const onChangeAuthStatus = (auth: number) => {
  authStatus.value = auth;
};

// 设置权限确认回调
const onSetAuthSubmit = async () => {
  return await adminAccountStore.setAdminUserAuth({ userId: authUserId.value, auth: authStatus.value });
};

// 切换分页
const onPageChange = (value: number) => {
  currentPage.value = value;
  getAdminAccountList();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.users-wrap {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .layoutStyles();

  .action-btn {
    background-color: #fff;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
  }

  .content {
    flex: 1;
    overflow: auto;
    background-color: #fff;
  }

  .username,
  .auth,
  .status {
    .ellipsisMore(1);
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
    padding: 10px;
    background-color: @fff;
  }
}
</style>
