<!--
 * 时间轴
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="top">
      <div class="desc">
        <div class="text">
          我希望有个如你一般的人。如山间清爽的风，如古城温暖的光，由清晨到傍晚，由山野到书房，只要最后是你，就好。
        </div>
      </div>
      <div class="info">
        <div class="left">
          <el-avatar
            class="avatar"
            :size="45"
            fit="fill"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div class="right">
          <div class="title">dnhyxc</div>
          <div class="content">行到水穷处，坐看云起时！</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <div class="header">博主发表的文章数量</div>
        <div class="number">55</div>
        <div class="article-info">
          <span class="lately-article">最近发表：</span>
          <span class="title">《我的县长父亲》</span>
        </div>
      </div>
      <div class="right">
        <el-image
          style="width: 100%; height: calc(100% - 20px)"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
          class="image"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><icon-picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>
    </div>
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

  .top {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: @fff;
    border-radius: 5px;

    .desc {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      background-color: #798efa;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      z-index: 10;

      .text {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        padding: 0 10px;
        font-size: 14px;
        color: @fff;
        .ellipsisMore(3);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 20px;
        width: 0;
        height: 0;
        border-top: 16px solid #798efa;
        border-right: 16px solid transparent;
        transform: rotate(90deg);
      }
    }

    .info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .right {
        flex: 1;
        margin-left: 20px;

        .title {
          font-size: 18px;
        }

        .content {
          font-size: 13px;
        }
      }
    }
  }

  .bottom {
    flex: 1;
    display: flex;
    justify-content: space-between;
    background-color: @fff;
    border-radius: 5px;

    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 10px;
      padding-left: 10px;

      .header {
        font-size: 18px;
      }

      .number {
        font-size: 32px;
        font-weight: 700;
        margin: 20px 0;
      }
    }

    .right {
      flex: 0.8;
      display: flex;
      align-items: center;

      .image {
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
}
</style>
