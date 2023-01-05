<!--
 * 后台账户列表
 * @author: dnhyxc
 * @since: 2023-01-05
 * index.vue
-->
<template>
  <div class="users-wrap">
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
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
          <div v-if="scope.row.auth === 1" class="auth">超级管理员</div>
          <div v-if="scope.row.auth === 2" class="auth">管理员</div>
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
            <el-button link type="primary" @click="toDetail(scope.$index, scope.row.id)">权限设置</el-button>
            <el-button link type="primary" @click="onEdit(scope.$index, scope.row.id)">
              <span v-if="!scope.row.isDelete">作废</span>
              <span v-else>恢复</span>
            </el-button>
            <el-button link type="primary" @click="onDelete(scope.$index, scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <div class="action-btn">
        <el-button type="primary" :disabled="!multipleSelection.length" @click="onRemoveAll">批量作废</el-button>
        <el-button type="primary" :disabled="!multipleSelection.length" @click="onRestoreAll">批量恢复</el-button>
        <el-button type="primary" :disabled="!multipleSelection.length" @click="onDeleteAll">批量删除</el-button>
      </div>
      <!-- :hide-on-single-page="tableData.length < 50" -->
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="PAGESIZE"
        background
        :disabled="disabled"
        layout="prev, pager, next"
        :total="tableData.length"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable } from 'element-plus';
import { PAGESIZE } from '@/constant';

interface ArticleType {
  id: string;
  username: string;
  createTime: string;
  auth: number;
  isDelete: boolean;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ArticleType[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);

// 多选
const handleSelectionChange = (val: ArticleType[]) => {
  multipleSelection.value = val;
};

// 批量作废
const onRemoveAll = () => {
  console.log(multipleSelection.value, 'onRemoveAll');
};

// 批量恢复
const onRestoreAll = () => {
  console.log(multipleSelection.value, 'onRestoreAll');
};

// 批量删除
const onDeleteAll = () => {
  console.log(multipleSelection.value, 'onDeleteAll');
};

// 去详情
const toDetail = (index: number, id: string) => {
  console.log(index, id, 'toDetail');
};

// 编辑
const onEdit = (index: number, id: string) => {
  console.log(index, id, 'onEdit');
};

// 删除
const onDelete = (index: number, id: string) => {
  console.log(index, id, 'onDelete');
};

// 切换分页
const onPageChange = (value: number) => {
  console.log(`current page: ${value}`);
};

const tableData: ArticleType[] = [
  {
    id: '111',
    username: '我的县长父亲',
    createTime: '2022-12-12',
    auth: 1,
    isDelete: true,
  },
  {
    id: '222',
    username: 'React 项目搭建',
    createTime: '2022-12-12',
    auth: 0,
    isDelete: false,
  },
  {
    id: '333',
    username: '我的县长父亲',
    createTime: '2022-12-12',
    auth: 0,
    isDelete: true,
  },
  {
    id: '444',
    username: '我的县长父亲',
    createTime: '2022-12-12',
    auth: 0,
    isDelete: true,
  },
  {
    id: '555',
    username: '我的县长父亲',
    createTime: '2022-12-12',
    auth: 0,
    isDelete: false,
  },
  {
    id: '666',
    username: '我的县长父亲',
    createTime: '2022-12-12',
    auth: 0,
    isDelete: true,
  },
  {
    id: '777',
    username: '我的县长父亲',
    createTime: '2022-12-12',
    auth: 0,
    isDelete: true,
  },
];
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.users-wrap {
  .layoutStyles();

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
    justify-content: space-between;
    padding: 10px;
    background-color: @fff;
  }
}
</style>
