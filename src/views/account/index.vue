<template>
  <div class="article-list-wrap">
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户名" show-overflow-tooltip width="300">
        <template #default="scope">
          <div class="username">
            <div class="img">
              <el-avatar class="avatar" :size="50" fit="fill" :src="TAG_IMAGES.qd" />
            </div>
            <div class="name">{{ scope.row.username }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="job" label="职位" show-overflow-tooltip />
      <el-table-column property="motto" label="座右铭" show-overflow-tooltip />
      <el-table-column property="introduce" label="个人介绍" width="500">
        <template #default="scope">
          <div class="introduce">
            <div class="desc">
              {{ scope.row.introduce }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="createTime" label="注册时间" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <div class="actions">
            <el-button link type="primary" @click="onRecovery(scope.$index, scope.row.id)">恢复</el-button>
            <el-button link type="primary" @click="onDelete(scope.$index, scope.row.id)">移除</el-button>
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
        :total="tableData.length"
        :hide-on-single-page="tableData.length < PAGESIZE"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElTable } from 'element-plus';
import { PAGESIZE, TAG_IMAGES } from '@/constant';

interface UserType {
  userId: string;
  username: string;
  job: string;
  motto: string;
  headUrl: string;
  introduce: string;
  createTime: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<UserType[]>([]);
const currentPage = ref<number>(1);
const disabled = ref<boolean>(false);

// 多选
const handleSelectionChange = (val: UserType[]) => {
  multipleSelection.value = val;
};

// 多选删除
const onDeleteAll = () => {
  console.log(multipleSelection.value, 'multipleSelection');
};

// 恢复账号
const onRecovery = (index: number, id: string) => {
  console.log(index, id, 'onEdit');
};

// 移除账号
const onDelete = (index: number, id: string) => {
  console.log(index, id, 'onDelete');
};

// 切换分页
const onPageChange = (value: number) => {
  console.log(`current page: ${value}`);
};

const tableData: UserType[] = [
  {
    userId: '1212112',
    username: 'dnhyxcdnhyxcdnhyxcdnhyxcdnhyxcdnhyxcdnhyxcdnhyxcdnhyxcdnhyxc',
    job: '全栈工程师',
    motto: '行到水穷处，坐看云起时',
    headUrl: 'http://localhost:9112/image/f24054adc6d8436bf16d56a01.jpg',
    introduce:
      '我希望有个如你一般的人，如山间清爽的风，如古城温暖的光，从清晨到夜晚，由山野到书房，等待，不怕岁月蹉跎，不怕路途遥远，只要最后是你就好！明天会更好',
    createTime: '2022-12-09',
  },
  {
    userId: '222',
    username: 'dnhyxc2',
    job: '全栈工程师',
    motto: '行到水穷处，坐看云起时',
    headUrl: 'http://localhost:9112/image/f24054adc6d8436bf16d56a01.jpg',
    introduce: '等待，不怕岁月蹉跎，不怕路途遥远，只要最后是你就好！明天会更好',
    createTime: '2022-12-09',
  },
  {
    userId: '333',
    username: 'dnhyxc3',
    job: '全栈工程师',
    motto: '行到水穷处，坐看云起时',
    headUrl: 'http://localhost:9112/image/f24054adc6d8436bf16d56a01.jpg',
    introduce: '如山间清爽的风，如古城温暖的光，从清晨到夜晚，由山野到书房',
    createTime: '2022-12-09',
  },
  {
    userId: '444',
    username: 'dnhyxc4',
    job: '全栈工程师',
    motto: '行到水穷处，坐看云起时',
    headUrl: 'http://localhost:9112/image/f24054adc6d8436bf16d56a01.jpg',
    introduce: '我希望有个如你一般的人，如山间清爽的风，如古城温暖的光，从清晨到夜晚，由山野到书房',
    createTime: '2022-12-09',
  },
  {
    userId: '555',
    username: 'dnhyxc5',
    job: '全栈工程师',
    motto: '行到水穷处，坐看云起时',
    headUrl: 'http://localhost:9112/image/f24054adc6d8436bf16d56a01.jpg',
    introduce: '我希望有个如你一般的人，如山间清爽的风，',
    createTime: '2022-12-09',
  },
];
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
