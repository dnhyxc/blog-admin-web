<!--
 * Card 展示设置
 * @author: dnhyxc
 * @since: 2022-12-29
 * index.vue
-->
<template>
  <div class="card-set">
    <div class="title">
      <div class="title-left">文章卡片展示控制</div>
      <el-button type="primary" @click="onSave">保存设置</el-button>
    </div>
    <div class="action-wrap">
      <span>布局模式：</span>
      <el-radio-group v-model="cardLayout" @change="onChangeCardLayout">
        <el-radio :label="1">左右布局模式</el-radio>
        <el-radio :label="2">上下布局模式</el-radio>
      </el-radio-group>
    </div>
    <div class="preview-wrap">
      <div class="prev-title">文章卡片布局效果预览</div>
      <div class="preview-content">
        <div v-if="cardLayout === 1" class="content">
          <div class="prev-type-title">左右布局效果</div>
          <div class="type-1">
            <div class="img" />
            <div class="article-info">
              <div class="title">文章标题</div>
              <div class="desc">文章简介</div>
              <div class="other">文章其它信息</div>
              <div class="action">点赞-评论-阅读次数</div>
            </div>
          </div>
        </div>
        <div v-else class="content">
          <div class="prev-type-title">上下布局效果</div>
          <div class="type-2">
            <Card class="card">
              <template #img>
                <div class="img">
                  <el-image class="el-image" :src="IMAGES.sea" fit="cover" />
                </div>
              </template>
              <template #title>
                <div class="art-title">文章标题</div>
              </template>
              <template #content>
                <div class="content">
                  <div class="desc">文章简介</div>
                  <div class="other">文章其它信息</div>
                  <div class="action">点赞-评论-阅读次数</div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IMAGES } from '@/constant';

interface IProps {
  cardLayout: number;
  layout: number;
  layoutSet: number;
  checkedImgs: string[];
}

interface Emits {
  (e: 'update:cardLayout', cardLayout: number): void;
}

const props = withDefaults(defineProps<IProps>(), {
  cardLayout: 1,
});

// 计算cardLayout
const cardLayout = computed({
  get() {
    return props.cardLayout;
  },
  set(cardLayout: number) {
    emit('update:cardLayout', cardLayout);
  },
});

const emit = defineEmits<Emits>();

// 切换页面布局
const onChangeCardLayout = (value: number) => {
  console.log(value, 'value>>>onChangeIsOpen');
  emit('update:cardLayout', value);
};

// 保存设置
const onSave = () => {
  console.log(cardLayout.value, 'cardLayout');
  console.log(props.layout, 'layout');
  console.log(props.layoutSet, 'layoutSet');
  console.log(props.checkedImgs, 'checkedImgs');
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.card-set {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-right: 2px;
  padding: 20px;
  border-radius: 5px;
  background-color: @fff;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 18px;
  }

  .action-wrap {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .preview-wrap {
    .prev-title {
      margin-top: 20px;
      margin-bottom: 15px;
      font-size: 18px;
    }

    .preview-content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: 70%;
      margin: auto;

      .content {
        flex: 1;

        .prev-type-title {
          margin-bottom: 10px;
          font-size: 14px;
          text-align: center;
        }
      }

      .type-1 {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 130px;
        padding: 10px;
        box-shadow: 0 0 5px @border-color;
        border-radius: 5px;

        .img {
          flex: 0.4;
          display: flex;
          align-items: center;
          height: 100%;
          margin-right: 10px;
          background: url('@/assets/img/ssm.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 5px;
        }

        .article-info {
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          height: 100%;

          .title {
            font-size: 16px;
            font-weight: 700;
          }
        }
      }

      .type-2 {
        flex: 1;
        box-shadow: 0 0 5px @border-color;
        border-radius: 5px;

        .card {
          flex: 1;
          height: auto;
          background-image: none;
          box-shadow: none;
          margin-right: 0;

          .img {
            width: 100%;
            height: 180px;

            .el-image {
              width: 100%;
              height: 100%;
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
            }
          }

          .art-title {
            font-size: 16px;
            font-weight: 700;
            padding: 10px 10px 15px 10px;
            background-color: @primary-light-9;
          }

          .content {
            font-size: 13px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            background-color: @primary-light-9;
            padding: 0 10px;

            .other {
              margin: 5px 0;
            }

            .action {
              padding-bottom: 8px;
            }
          }
        }
      }

      .desc {
        font-size: 14px;
      }

      .other {
        font-size: 12px;
        color: @text-color;
      }

      .action {
        font-size: 13px;
        color: @text-color-deep;
      }
    }
  }
}
</style>
