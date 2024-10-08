<template>
  <Loading :loading="accountStore.loading" class="home-wrap">
    <div class="action-btn">
      <el-button type="warning" :disabled="!multipleSelection.length" @click="onRemoveAll">批量作废</el-button>
      <el-button type="primary" :disabled="!multipleSelection.length" @click="onRestoreAll">批量恢复</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
    </div>
    <el-scrollbar class="article-list-wrap">
      <el-table
        ref="multipleTableRef"
        :data="accountStore.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed="left" type="selection" width="39" />
        <el-table-column label="用户名" show-overflow-tooltip width="200">
          <template #default="scope">
            <div class="username">
              <div class="img">
                <el-avatar class="avatar" :size="50" fit="fill" :src="scope.row.headUrl" />
              </div>
              <div class="name" :title="scope.row.username">{{ scope.row.username }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="isDelete" label="角色" width="120">
          <template #default="scope">
            <div class="status">
              {{ scope.row.auth === 1 ? '超级管理员' : '普通用户' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column property="isDelete" label="菜单权限" width="300">
          <template #default="scope">
            <span
              v-for="(menu, index) in scope.row.menus"
              v-show="scope.row?.menus?.length"
              :key="menu.key"
              class="status"
              :title="menu.name"
            >
              {{ index > 0 ? '、' : '' }}{{ MENU_AUTH_ENUM[menu as 'tools' | 'resume' | 'deploy' | 'picture'] }}
            </span>
            <span v-show="!scope.row?.menus?.length" class="status">-</span>
          </template>
        </el-table-column>
        <el-table-column property="registerTime" label="注册时间" width="180">
          <template #default="scope">
            <div class="registerTime" :title="formatDate(scope.row.registerTime)">
              {{ formatDate(scope.row.registerTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column property="job" label="职位" width="150">
          <template #default="scope">
            <div class="job" :title="scope.row.job">
              {{ scope.row.job || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column property="introduce" label="个人介绍" width="300">
          <template #default="scope">
            <div class="introduce" :title="scope.row.introduce">
              <div class="desc">
                {{ scope.row.introduce || '-' }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="motto" label="座右铭" width="200">
          <template #default="scope">
            <div class="motto" :title="scope.row.motto">
              {{ scope.row.motto || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" property="isDelete" label="账号状态" width="100">
          <template #default="scope">
            <div class="status">
              <span v-if="scope.row.isDelete"><span class="status-del" />已作废</span>
              <span v-else><span class="status-use" />使用中</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="175">
          <template #default="scope">
            <div class="actions">
              <el-button link type="primary" @click="onSetAuth(scope.row)">权限设置</el-button>
              <el-button link :type="scope.row.isDelete ? 'primary' : 'warning'" @click="onMenageAccount(scope.row)">
                {{ scope.row.isDelete ? '恢复' : '作废' }}
              </el-button>
              <el-button link type="danger" @click="onDeleteAccount(scope.row)">删除</el-button>
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
          layout="total, prev, pager, next"
          :total="accountStore.total"
          :hide-on-single-page="accountStore.total <= PAGESIZE"
          @current-change="onPageChange"
        />
      </div>
      <Modal v-model:visible="visible" :on-submit="onSubmit" title="权限设置">
        <template #default>
          <div class="account-auth">
            <div class="title">账号权限</div>
            <el-radio-group v-model="authStatus" @change="onChangeAuthStatus">
              <el-radio v-if="userStore?.auth === AUTH_CONFIG.SUPER" :label="1">设置为博主</el-radio>
              <el-radio :label="0">设置为普通用户</el-radio>
            </el-radio-group>
          </div>
          <div class="menu-auth">
            <div class="title">菜单权限</div>
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="menu in MENU_LIST_CONFIG" :key="menu.key" :label="menu.name" />
            </el-checkbox-group>
          </div>
        </template>
      </Modal>
      <Message
        v-model:visible="messageVisible"
        title="账号删除"
        content="确定删除该账号吗？"
        :on-submit="onSubmitDelete"
      />
    </el-scrollbar>
  </Loading>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElTable } from 'element-plus';
import { PAGESIZE, AUTH_CONFIG, MENU_LIST_CONFIG, MENU_AUTH_ENUM } from '@/constant';
import { accountStore, userStore } from '@/store';
import { formatDate } from '@/utils';
import Modal from '@/components/Modal/index.vue';
import Message from '@/components/Message/index.vue';

interface AccountType {
  auth: number;
  id: string;
  userId: string;
  bindUserId: string;
  username: string;
  job: string;
  motto: string;
  headUrl: string;
  introduce: string;
  createTime: string;
  isDelete: boolean;
  menus: { key: string; name: string }[];
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<AccountType[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const visible = ref<boolean>(false); // 权限设置弹窗的状态
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const authStatus = ref<number>(1); // 选择需要设置的权限类型
const deleteId = ref<string>(''); // 删除id
const deleteIds = ref<string[]>([]); // 批量删除ids
const authUserId = ref<string>(''); // 需要设置权限的userId
const checkList = ref<string[]>([MENU_LIST_CONFIG[0].name]);

onMounted(() => {
  getAccountList();
});

// 获取账号列表
const getAccountList = async () => {
  return await accountStore.getAccountList({
    pageNo: currentPage.value,
    pageSize: PAGESIZE,
  });
};

// 多选
const handleSelectionChange = (val: AccountType[]) => {
  multipleSelection.value = val;
};

// 更改权限类型
const onChangeAuthStatus = (value: number) => {
  authStatus.value = value;
};

// 设置权限
const onSetAuth = async (scope: AccountType) => {
  // 初始化菜单权限
  authStatus.value = scope.auth || 0;
  const menus = await accountStore.getUserMenuRoles(scope?.id);
  if (menus?.length) {
    const findMenus = MENU_LIST_CONFIG.filter((i) => menus.includes(i.key)).map((j) => j.name);
    checkList.value = findMenus;
  } else {
    checkList.value = [MENU_LIST_CONFIG[0].name];
  }
  authUserId.value = scope.id;
  visible.value = true;
};

// 权限设置提交
const onSubmit = async () => {
  const menus = MENU_LIST_CONFIG.filter((i) => checkList.value.includes(i.name)).map((j) => j.key);
  await accountStore.setAuth({ auth: authStatus.value, userId: authUserId.value, menus });
  currentPage.value = 1;
  return getAccountList();
};

// 账号操作
const onMenageAccount = (scope: AccountType) => {
  const { isDelete, id } = scope;
  if (isDelete) {
    onRecovery(id);
  } else {
    onDelete(id);
  }
};

// 恢复账号
const onRecovery = async (id: string) => {
  // type：1 删除，0 恢复
  await accountStore.manageAccount({ userIds: [id], type: 0 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 移除账号
const onDelete = async (id: string) => {
  // type：1 删除，0 恢复
  await accountStore.manageAccount({ userIds: [id], type: 1 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 删除账号
const onDeleteAccount = (scope: AccountType) => {
  const { id } = scope;
  deleteId.value = id;
  messageVisible.value = true;
};

// 确认删除账号
const onSubmitDelete = async () => {
  await accountStore.batchDeleteUser({
    userIds: deleteIds.value.length ? deleteIds.value : [deleteId.value],
    pageNo: currentPage.value,
  });
  // 删除完成之后，清除之前选择的账号ids
  deleteIds.value = [];
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 批量删除
const onDeleteAll = () => {
  const ids = multipleSelection.value.map((j) => j.id) || [];
  deleteIds.value = ids;
  messageVisible.value = true;
};

// 批量移除
const onRemoveAll = async () => {
  const ids = multipleSelection.value.filter((i) => !i.isDelete).map((j) => j.id) || [];
  await accountStore.manageAccount({ userIds: ids, type: 1 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 批量恢复
const onRestoreAll = async () => {
  const ids = multipleSelection.value.filter((i) => i.isDelete).map((j) => j.id) || [];
  // type：1 删除，0 恢复
  await accountStore.manageAccount({ userIds: ids, type: 0 });
  // 取消多选
  multipleTableRef.value!.clearSelection();
};

// 切换分页
const onPageChange = (value: number) => {
  currentPage.value = value;
  getAccountList();
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.home-wrap {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .layoutStyles();

  .action-btn {
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
  }

  .article-list-wrap {
    flex: 1;

    .username {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .img {
        margin-right: 10px;
      }

      .name {
        .ellipsis();
      }
    }

    .job,
    .registerTime,
    .motto,
    .status {
      .ellipsis();
    }

    .introduce {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      line-height: 30px;

      .desc {
        display: table-cell;
        vertical-align: middle;

        .ellipsisMore(3);
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
      padding: 10px;
      background-color: @fff;
    }
  }

  .account-auth {
    margin-bottom: 20px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
