<!--
 * 作者列表
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="header">作者列表</div>
    <div v-if="isMounted" class="infinite-list-wrapper" style="overflow: auto">
      <!-- infinite-scroll-distance="1" 表示触发加载的距离阈值，单位为px。可解决只加载一次或几次后，滚动加载失效的问题 -->
      <div
        v-infinite-scroll="load"
        class="list"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-immediate
        infinite-scroll-distance="1"
      >
        <List v-for="i in accountStore.userList" :key="i.id" class="list-item">
          <template #left>
            <Image :url="i.headUrl || SSM" :transition-img="SSM" class="avatar-image"/>
          </template>
          <template #title>
            <div class="title">
              <div class="username">{{ i.username }}</div>
              <div class="time">{{ formatDate(i.registerTime!, 'YYYY/MM/DD') }}</div>
            </div>
          </template>
          <template #content>
            <div class="content">
              <div class="desc" :title="i.introduce">{{ i.introduce || '该用户暂无简介' }}</div>
            </div>
          </template>
        </List>
      </div>
      <div v-if="accountStore.loading" class="loading">Loading...</div>
      <div v-if="noMore" class="no-more">共{{ accountStore.total }}条，没有更多了～～～</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {accountStore} from '@/store';
import {SSM} from '@/constant';
import {formatDate} from '@/utils';
import List from '@/components/List/index.vue';

const isMounted = ref<boolean>(false);
const noMore = computed(() => accountStore.userList?.length >= accountStore.total);
const disabled = computed(() => accountStore.loading || noMore.value);

onMounted(() => {
  isMounted.value = true;
  accountStore.getUserListByScroll();
});

// 滚动加载数据
const load = () => {
  accountStore.getUserListByScroll();
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.webkitScrollbarStyle(transparent, transparent);

.wrap {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  background-color: @fff;
  padding: 10px 2px 10px 10px;

  .header {
    padding-bottom: 10px;
    margin-right: 10px;
    font-size: 18px;
    text-align: center;
  }

  .infinite-list-wrapper {
    height: 410px;

    .list {
      padding: 0;
      margin: 0;
      list-style: none;

      .list-item {
        display: flex;
        align-items: center;
        justify-content: center;

        .avatar-image {
          width: 45px;
          height: 45px;
          border-radius: 45px;
          margin-right: 10px;

          :deep {
            .image-item {
              border-radius: 45px;
            }
          }
        }
      }

      .title {
        display: flex;
        justify-content: space-between;

        .username {
          flex: 1;
          .ellipsisMore(1);
          margin-right: 10px;
        }
      }

      .content {
        text-align: left;
        .ellipsisMore(2);
        margin-top: 5px;

        .desc {
          font-size: 14px;
        }
      }
    }
  }

  .loading,
  .no-more {
    text-align: center;
    padding: 15px 0 5px;
  }
}
</style>
