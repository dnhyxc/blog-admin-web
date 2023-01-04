<template>
  <div class="article-list-wrap">
    <el-table
      ref="multipleTableRef"
      :data="accountStore.list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="35" />
      <el-table-column label="用户名" show-overflow-tooltip width="300">
        <template #default="scope">
          <div class="username">
            <div class="img">
              <el-avatar class="avatar" :size="50" fit="fill" :src="IMAGES.qd" />
            </div>
            <div class="name" :title="scope.row.username">{{ scope.row.username }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="job" label="职位">
        <template #default="scope">
          <div class="job" :title="scope.row.job">
            {{ scope.row.job || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column property="motto" label="座右铭">
        <template #default="scope">
          <div class="motto" :title="scope.row.motto">
            {{ scope.row.motto || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column property="introduce" label="个人介绍" width="450">
        <template #default="scope">
          <div class="introduce" :title="scope.row.introduce">
            <div class="desc">
              {{ scope.row.introduce || '-' }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="registerTime" label="注册时间">
        <template #default="scope">
          <div class="registerTime" :title="formatDate(scope.row.registerTime)">
            {{ formatDate(scope.row.registerTime) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column property="isDelete" label="账号状态">
        <template #default="scope">
          <div class="status" :title="scope.row.isDelete ? '已移除' : '使用中'">
            <span v-if="scope.row.isDelete"><span class="status-del" />已移除</span>
            <span v-else><span class="status-use" />使用中</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <div class="actions">
            <el-button link type="primary" @click="onSetAuth(scope.row)">权限管理</el-button>
            <el-button link type="primary" @click="onMenageAccount(scope.row)">
              {{ scope.row.isDelete ? '恢复账号' : '移除账号' }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" :disabled="!multipleSelection.length" @click="onDeleteAll()">批量删除</el-button>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="PAGESIZE"
        background
        :disabled="disabled"
        layout="prev, pager, next"
        :total="accountStore.total"
        :hide-on-single-page="accountStore.total <= PAGESIZE"
        @current-change="onPageChange"
      />
    </div>
    <Modal v-model:visible="visible" :on-submit="onSubmit" title="权限设置">
      <template #default>
        <el-radio-group v-model="authStatus">
          <el-radio label="1">设置为博主</el-radio>
        </el-radio-group>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElTable } from 'element-plus';
import { PAGESIZE, IMAGES } from '@/constant';
import { accountStore, userStore } from '@/store';
import { formatDate } from '@/utils';
import Modal from '@/components/Modal/index.vue';

interface UserType {
  id: string;
  userId: string;
  username: string;
  job: string;
  motto: string;
  headUrl: string;
  introduce: string;
  createTime: string;
  isDelete: boolean;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<UserType[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);
const visible = ref<boolean>(false);
const authStatus = ref<string>('1');

onMounted(() => {
  getAccountList();
});

// 获取账号列表
const getAccountList = () => {
  console.log(currentPage.value);

  accountStore.getAccountList({
    pageNo: currentPage.value,
    pageSize: PAGESIZE,
    userId: userStore?.userId,
  });
};

// 多选
const handleSelectionChange = (val: UserType[]) => {
  multipleSelection.value = val;
};

// 多选删除
const onDeleteAll = () => {
  console.log(multipleSelection.value, 'multipleSelection');
};

// 设置权限
const onSetAuth = (scope: UserType) => {
  console.log(scope.id, '设置权限');
  visible.value = true;
};

// 权限设置提交
const onSubmit = () => {
  console.log(authStatus.value, 'onSubmit');

  return new Promise((resolve, reject) => {
    resolve('aaa');
  });
};

// 账号操作
const onMenageAccount = (scope: UserType) => {
  const { isDelete, id } = scope;
  if (isDelete) {
    onRecovery(id);
  } else {
    onDelete(id);
  }
};

// 恢复账号
const onRecovery = (id: string) => {
  console.log(id, 'onEdit');
};

// 移除账号
const onDelete = (id: string) => {
  console.log(id, 'onDelete');
};

// 切换分页
const onPageChange = (value: number) => {
  console.log(`current page: ${value}`);
  currentPage.value = value;
  getAccountList();
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.article-list-wrap {
  .layoutStyles();

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

      .ellipsisMore(2);
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
    justify-content: space-between;
    padding: 10px;
    background-color: @fff;
  }
}
</style>
