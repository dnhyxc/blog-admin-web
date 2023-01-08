<template>
  <div class="page-layout">
    <div class="title">
      <div class="title-left">页面布局控制</div>
      <el-button type="primary" @click="onSave">保存设置</el-button>
    </div>
    <div class="action-wrap">
      <span class="info">默认布局选择：</span>
      <el-radio-group v-model="layout" @change="onChangeLayoutType">
        <el-radio :label="1">上下布局</el-radio>
        <el-radio :label="2">左右布局</el-radio>
      </el-radio-group>
    </div>
    <div class="action-wrap">
      <span class="info">是否开启页面布局切换：</span>
      <el-radio-group v-model="layoutSet" @change="onChangeIsOpen">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="2">否</el-radio>
      </el-radio-group>
      <span class="info-text">
        （开启页面布局切换时，页面左侧会出现悬浮控制按钮，点击可以自主切换布局及切换主题等）
      </span>
    </div>
    <div class="prev-setting">
      <span class="preview-info">布局效果预览</span>
    </div>
    <div class="preview-wrap">
      <div v-if="layout === 1" class="preview-type">
        <div class="preview-name">上下布局模式</div>
        <div class="content">
          <div class="right">
            <div ref="rightContentRef" class="right-content-default">
              <div class="cover">
                <div ref="headerRef" class="header">
                  <span>文章列表</span>
                  <span class="menu">
                    <span class="menu-item">菜单一</span>
                    <span class="menu-item">菜单二</span>
                    <span class="menu-item">菜单...</span>
                  </span>
                </div>
                <div class="name">用户名称</div>
                <div class="motto">座右铭</div>
              </div>
              <div class="card-list">content</div>
            </div>
          </div>
          <div v-if="layoutSet === 1" :class="classname('change-icon', toggle && 'toggle')" @click="onToggle">
            <el-icon v-if="!toggle"><ArrowRight /></el-icon>
            <el-icon v-else><ArrowLeft /></el-icon>
          </div>
          <div :class="classname('change-action-list', toggle && 'show')">
            <div class="action-item">
              <el-icon :size="20"><DArrowRight /></el-icon>
              <span>切换布局</span>
            </div>
            <div class="action-item">
              <el-icon :size="20"><Sunny /></el-icon>
              <span>切换主题</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="layout === 2" class="preview-type">
        <div class="preview-name">左右布局模式</div>
        <div class="content">
          <div class="left">
            <div class="menu">DNHYXC</div>
            <div class="menu-item-first">菜单一</div>
            <div class="menu-item">菜单二</div>
            <div class="menu-item">菜单...</div>
          </div>
          <div class="right">
            <div class="header">
              <span>文章列表</span>
            </div>
            <div class="right-content">
              <div class="list-wrap">content</div>
            </div>
          </div>
          <div v-if="layoutSet === 1" :class="classname('change-icon', toggle && 'toggle')" @click="onToggle">
            <el-icon v-if="!toggle"><ArrowRight /></el-icon>
            <el-icon v-else><ArrowLeft /></el-icon>
          </div>
          <div :class="classname('change-action-list', toggle && 'show')">
            <div class="action-item">
              <el-icon><DArrowRight /></el-icon>
              <span>切换布局</span>
            </div>
            <div class="action-item">
              <el-icon><Sunny /></el-icon>
              <span>切换主题</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import classname from 'classname';
import { ArrowRight, DArrowRight, ArrowLeft, Sunny } from '@element-plus/icons-vue';
import { pageConfigStore } from '@/store';

const rightContentRef = ref<HTMLDivElement | null>(null);
const headerRef = ref<HTMLDivElement | null>(null);
const toggle = ref(false);

interface IProps {
  layout: number;
  layoutSet: number;
  cardLayout: number;
}

interface Emits {
  (e: 'update:layout', layout: number): void;
  (e: 'update:layoutSet', layoutSet: number): void;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 1,
  layoutSet: 1,
});

// 计算layout
const layout = computed({
  get() {
    return props.layout;
  },
  set(layout: number) {
    emit('update:layout', layout);
  },
});

// 计算layoutSet
const layoutSet = computed({
  get() {
    return props.layoutSet;
  },
  set(layoutSet: number) {
    emit('update:layoutSet', layoutSet);
  },
});

const emit = defineEmits<Emits>();

// 选择页面默认布局
const onChangeLayoutType = (value: string) => {
  console.log(value, 'value>>>onChangeLayoutType');
};

// 切换是否开启页面布局
const onChangeIsOpen = (value: string) => {
  console.log(value, 'value>>>onChangeIsOpen');
};

// 点击布局控制
const onToggle = () => {
  toggle.value = !toggle.value;
};

// 保存设置
const onSave = () => {
  const { layout, layoutSet, cardLayout } = props;
  pageConfigStore.setPageConfig({
    layout,
    layoutSet,
    cardLayout,
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.page-layout {
  box-sizing: border-box;
  background-color: @fff;
  padding: 20px;
  border-radius: 5px;
  width: 100%;

  .title {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }

  .action-wrap,
  .prev-setting {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;

    .info {
      margin-right: 10px;
    }

    .info-text {
      font-size: 12px;
      margin-left: 15px;
      color: @text-color;

      .ellipsisMore(1);
    }

    .preview-info {
      font-size: 18px;
      margin: 10px 0;
    }
  }

  .preview-wrap {
    display: flex;
    justify-content: space-between;

    .preview-type {
      flex: 1;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }

      .preview-name {
        font-size: 14px;
        text-align: center;
      }

      .content {
        position: relative;
        flex: 1;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        width: 70%;
        margin: 10px auto 0;
        height: 450px;
        border: 1px solid @border-color;

        .left {
          width: 125px;
          background-color: @fff;
          border-right: 1px solid @border-color;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding: 10px 0;

          .menu {
            text-align: center;
            margin-bottom: 10px;
          }

          .menu-item,
          .menu-item-first {
            box-sizing: border-box;
            height: 40px;
            width: 100%;
            background-color: @fff;
            padding: 0 10px;
            line-height: 40px;
          }

          .menu-item-first {
            background-color: @green-light;
          }
        }

        .right {
          position: relative;
          flex: 1;
          background-color: @fff;
          border-radius: 5px;
          width: 70%;

          .header {
            box-sizing: border-box;
            width: 100%;
            height: 45px;
            line-height: 45px;
            padding: 0 10px;
            border-bottom: 1px solid @border-color;

            .menu {
              margin-left: 20px;
              font-size: 14px;

              .menu-item {
                margin-right: 20px;
              }
            }
          }

          .right-content,
          .right-content-default {
            box-sizing: border-box;
            height: calc(100% - 45px);
            text-align: center;
            background-color: @bg-color-page;
            overflow: auto;

            .list-wrap {
              background-color: @fff;
              height: 100%;
            }

            .cover {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              position: relative;
              height: 100%;
              width: 100%;
              z-index: 99;
              color: @fff;

              &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-position: center;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-size: cover;
                animation-name: imageAnimation;
                animation-duration: 20s;
                animation-iteration-count: infinite;
                z-index: -1;
              }

              .header {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                border-bottom: 0;
                text-align: left;
                color: @000;
              }
              .name {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 10px;
              }
            }
            .card-list {
              background-color: @fff;
              width: 70%;
              height: 400px;
              margin: auto;
              margin-bottom: 6px;
            }
          }

          .right-content {
            padding: 6px;
            background-color: @green-light;
          }

          .right-content-default {
            height: 100%;
          }
        }

        .change-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0;
          bottom: 50px;
          height: 60px;
          width: 10px;
          font-size: 12px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: @primary-light-8;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle {
          left: 110px;
          transition: all 0.3s;
        }

        .change-action-list {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: -110px;
          bottom: 50px;
          width: 110px;
          height: 60px;
          box-shadow: 0 0 5px @border-color;
          background-color: @fff;
          z-index: -1;
          transition: all 0.3s;

          .action-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            margin-right: 5px;
            cursor: pointer;

            &:last-child {
              margin-right: 0;
            }
          }
        }

        .show {
          left: 0;
          transition: all 0.3s;
          z-index: 0;
        }
      }
    }
  }
}

@keyframes imageAnimation {
  0% {
    background-image: url('@/assets/img/sea.jpg');
  }

  50% {
    background-image: url('@/assets/img/ssm.jpg');
  }

  100% {
    background-image: url('@/assets/img/sea.jpg');
  }
}
</style>
