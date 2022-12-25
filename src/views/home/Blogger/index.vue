<!--
 * 时间轴
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="top">
      <div class="desc">desc</div>
      <div class="info">
        <div class="left">
          <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </div>
        <div class="right">
          <div class="title">title</div>
          <div class="content">content</div>
        </div>
      </div>
    </div>
    <div class="bottom">bottom</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import '@/styles/index.less';

.webkitScrollbarStyle(transparent, transparent);

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 5px;
  border: 1px solid red;

  .top {
    flex: 1;
    margin-bottom: 10px;
    background-color: @fff;
    border-radius: 5px;

    .desc {
      .ellipsisMore(3);
    }
  }

  .bottom {
    flex: 1;
    background-color: @fff;
    border-radius: 5px;
  }
}
</style>
