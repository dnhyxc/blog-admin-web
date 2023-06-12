<!--
 * 选人组件
 * @author: dnhyxc
 * @since: 2023-06-05
 * index.vue
-->
<template>
  <Loading :loading="accountStore.loading" class="select-user-wrap">
    <div class="left">
      <div class="search">
        <el-input v-model="keyword" placeholder="请输入用户名称" @keyup.enter="onEnter" />
      </div>
      <div class="scroll">
        <el-scrollbar ref="scrollRef">
          <div
            v-if="isMounted"
            v-infinite-scroll="load"
            :infinite-scroll-disabled="disabled"
            infinite-scroll-immediate
            infinite-scroll-distance="2"
            class="user-list"
          >
            <div
              v-for="item in accountStore.userList"
              :key="item.id"
              class="user-item"
              @click.stop="onSelectUser(item)"
            >
              {{ item.username }}
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="right">
      <div class="select-info">
        <span class="user-count">已选：{{ selectedUsers.length }} 位</span>
        <el-button link type="primary" @click.stop="onRemoveAll">清空</el-button>
      </div>
      <div class="user-list">
        <el-scrollbar ref="scrollRef">
          <div v-for="item in selectedUsers" :key="item.id" class="user-item">
            <span class="selected-user">{{ item.username }}</span>
            <el-icon class="delete" @click.stop="onRemoveUser(item)"><Close /></el-icon>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </Loading>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { accountStore } from '@/store';
import { UserInfoParams } from '@/typings/comment';

interface IProps {
  selectedUsers?: UserInfoParams[];
  visible?: boolean;
}

const props = defineProps<IProps>();

const keyword = ref<string>('');
const isMounted = ref<boolean>(false);
const noMore = computed(() => accountStore.userList?.length >= accountStore.total);
const disabled = computed(() => accountStore.loading || noMore.value);
// 选择的用户
const selectedUsers = ref<any>(props.selectedUsers || []);

onMounted(() => {
  isMounted.value = true;
  accountStore.getUserListByScroll(keyword.value);
});

// 监听弹窗显示状态，如果是显示的，并且传了选中的用户，则将选中的用户加入到选中列表
watch(
  () => props.visible,
  (newVal) => {
    if (newVal && props?.selectedUsers?.length) {
      selectedUsers.value = [...props?.selectedUsers];
    }
  },
);

// 滚动加载数据
const load = () => {
  accountStore.getUserListByScroll(keyword.value);
};

// 搜索用户
const onEnter = () => {
  accountStore.clearUserListInfo();
  accountStore.getUserListByScroll(keyword.value);
};

// 选择用户
const onSelectUser = (item: UserInfoParams) => {
  const find = selectedUsers.value.find((i: any) => i.id === item.id);
  if (!find) {
    selectedUsers.value = [...selectedUsers.value, item];
  }
};

// 移除用户
const onRemoveUser = (item: UserInfoParams) => {
  console.log(item, 'item');
  selectedUsers.value = selectedUsers.value.filter((i: any) => i.id !== item.id);
};

// 移除所有
const onRemoveAll = () => {
  selectedUsers.value = [];
};

defineExpose({
  selectedUsers,
  onRemoveAll,
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.select-user-wrap {
  display: flex;
  height: 300px;
  width: 100%;

  .left {
    width: 50%;
    border-right: 1px solid @primary-light-9;
    padding: 0 10px 0 15px;
    box-sizing: border-box;

    .search {
      margin-bottom: 5px;
      padding-left: 5px;
    }

    .scroll {
      box-sizing: border-box;
      height: calc(100% - 40px);

      .user-item {
        padding: 5px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;

        &:hover {
          color: @primary;
          background-color: @primary-light-9;
        }
      }
    }
  }

  .right {
    width: 50%;
    padding: 0 0 0 10px;
    box-sizing: border-box;

    .select-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      margin-bottom: 5px;
      padding-right: 15px;
    }

    .user-list {
      height: calc(100% - 40px);

      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;

        .delete {
          padding-right: 10px;
          font-size: 18px;
          display: none;
        }

        &:hover {
          .delete {
            color: @primary;
            display: block;
          }

          .selected-user {
            color: @primary;
          }
        }
      }
    }
  }
}
</style>
