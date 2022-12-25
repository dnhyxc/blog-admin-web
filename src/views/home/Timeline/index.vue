<!--
 * 时间轴
 * @author: dnhyxc
 * @since: 2022-12-25
 * index.vue
-->
<template>
  <div class="wrap">
    <div class="header">时间轴</div>
    <div class="timeline">
      <el-timeline class="el-timeline">
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>Update Github template</h4>
            <p>Tom committed 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@import '@/styles/index.less';

.webkitScrollbarStyle(transparent, transparent);

.wrap {
  position: relative;
  border-radius: 5px;
  background-color: @fff;
  padding: 50px 2px 10px 10px;

  .header {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    font-size: 18px;
  }

  .timeline {
    height: calc(410px - 50px);
    overflow-y: auto;

    .el-timeline {
      padding-left: 2px;
    }
  }
}
</style>
