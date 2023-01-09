<template>
  <div class="article-list-wrap">
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="标题" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column property="classify" label="分类" />
      <el-table-column property="tag" label="标签" show-overflow-tooltip />
      <el-table-column property="createTime" label="发表时间" show-overflow-tooltip />
      <el-table-column property="status" label="发布状态" />
      <el-table-column fixed="right" label="操作" width="145">
        <template #default="scope">
          <div class="actions">
            <el-button link type="primary" @click="toDetail(scope.row.id)">详情</el-button>
            <el-button link type="primary" @click="onEdit(scope.$index, scope.row.id)">编辑</el-button>
            <el-button link type="primary" @click="onDelete(scope.$index, scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" :disabled="!multipleSelection.length" @click="onDeleteAll()">批量删除</el-button>
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
import { useRouter } from 'vue-router';
import { ElTable } from 'element-plus';
import { PAGESIZE } from '@/constant';

interface ArticleType {
  id: string;
  title: string;
  author: string;
  classify: string;
  tag: string;
  createTime: string;
  status: boolean;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<ArticleType[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);

const router = useRouter();

// 多选
const handleSelectionChange = (val: ArticleType[]) => {
  multipleSelection.value = val;
};

// 多选删除
const onDeleteAll = () => {
  console.log(multipleSelection.value, 'multipleSelection');
};

// 去详情
const toDetail = (id: string) => {
  console.log(id, 'toDetail');
  router.push(`/detail/${id}`);
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
    title: '我的县长父亲',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
  {
    id: '222',
    title: 'React 项目搭建',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
  {
    id: '333',
    title: '我的县长父亲',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
  {
    id: '444',
    title: '我的县长父亲',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
  {
    id: '555',
    title: '我的县长父亲',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
  {
    id: '666',
    title: '我的县长父亲',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
  {
    id: '777',
    title: '我的县长父亲',
    author: 'dnhyxc',
    classify: 'JavaScript',
    tag: '前端',
    createTime: '2022-12-12',
    status: true,
  },
];
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.article-list-wrap {
  .layoutStyles();

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
