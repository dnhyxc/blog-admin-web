<!--
 * 简历编辑页面
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="editor-wrap">
    <el-scrollbar ref="scrollRef" wrap-class="editor-wrapper">
      <el-form ref="formRef" label-position="top" :model="resumeStore.resumeInfo">
        <el-collapse :model-value="resumeStore.activeOption || 'baseInfo'" accordion>
          <div v-for="(item, index) in resumeStore.sortedElements" :key="item.key" class="form-describe-wrap">
            <el-collapse-item :name="item.key">
              <template #title>
                <div class="title-wrap">
                  <div class="left">
                    <el-input
                      v-if="item.key === activeTittle"
                      :id="item.key"
                      v-model="item.title"
                      class="title-input"
                      maxlength="20"
                      @click.stop=""
                      @keyup.stop.enter.native="activeTittle = ''"
                    />
                    <div v-else class="title">
                      <span class="title-text">{{ item.title }}</span>
                      <i class="icon iconfont icon-yongyan" @click.stop="onEditTitle(item.key)" />
                    </div>
                  </div>
                  <div v-if="item.key !== 'baseInfo'" class="right">
                    <i v-if="index !== 1" class="icon iconfont icon-xs" @click.stop="onMoveUp(item.key, index)" />
                    <i
                      v-if="index !== resumeStore.sortedElements.length - 1"
                      class="icon iconfont icon-xx"
                      @click.stop="onMoveDown(item.key, index)"
                    />
                    <i class="icon iconfont icon-shanchu" @click.stop="onRemove(item.key, item.title)" />
                  </div>
                </div>
              </template>
              <component :is="item.formItem" :module-key="item.key" />
            </el-collapse-item>
          </div>
        </el-collapse>
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { ElMessageBox } from 'element-plus';
import { resumeStore } from '@/store';

const activeTittle = ref<string>('');

onMounted(() => {
  document.addEventListener('click', onClickHtml, true);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickHtml, true);
});

const onClickHtml = (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.tagName !== 'INPUT') {
    activeTittle.value = '';
  }
};

const onEditTitle = (key: string) => {
  activeTittle.value = key;
  nextTick(() => {
    const inputField = document.querySelector(`#${key}`) as HTMLInputElement;
    if (inputField) {
      inputField.focus();
    }
  });
};

const onMoveUp = (key: string, index: number) => {
  const active = resumeStore.elements.find((item) => item.key === key)!;
  resumeStore.setSortFormItem(active, 'up', index);
};

const onMoveDown = (key: string, index: number) => {
  const active = resumeStore.elements.find((item) => item.key === key)!;
  resumeStore.setSortFormItem(active, 'down', index);
};

const onRemove = (key: string, title: string) => {
  ElMessageBox.confirm('', `确定要删除${title}吗？`).then(() => {
    resumeStore.removeSort(key);
  });
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.editor-wrap {
  height: calc(100vh - 149px);
  padding: 10px 0 10px 5px;
  border-radius: 5px;
  // 正常情况下是a4纸的宽度 210mm * 297mm，或者 793px * 1123px，但是这里需要减去在生成html2pdf配置中设置的0.2in的外边距
  width: 205mm;
  min-width: 205mm;
  box-sizing: border-box;
  border: 1px solid @border;
  background-color: #fff;
  margin-right: 10px;

  .title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &:hover {
      .right {
        .icon {
          display: inline-block;
        }
      }
    }

    .left {
      flex: 1;
      display: flex;

      .title-input {
        width: 200px;
      }

      .icon {
        margin-left: 10px;

        &:hover {
          color: @primary;
        }
      }
    }

    .right {
      margin-right: 10px;

      .icon {
        padding: 5px;
        margin-left: 5px;
        display: none;

        &:hover {
          color: @primary;
        }
      }
    }
  }

  :deep {
    .form-describe {
      position: relative;

      &:first-child {
        .title {
          padding-top: 0;
        }
      }

      .title {
        font-size: 18px;
        margin-bottom: 10px;
        padding-top: 5px;
      }

      .form-item-list {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0 10px;
      }

      .el-select {
        width: 100%;

        // .el-input.is-focus {
        //   .el-input__wrapper {
        //     box-shadow: 0 0 1.5px 0 var(--border-color) inset !important;
        //   }
        // }

        // .el-input__wrapper.is-focus {
        //   box-shadow: 0 0 1.5px 0 var(--border-color) inset !important;
        // }
      }

      .time-item {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .time-input {
          flex: 1;

          .el-input__wrapper {
            width: 100%;
            box-sizing: border-box;
          }
        }
      }

      .line {
        margin: 0 2px;
      }

      .experience-item {
        grid-column: span 3;
      }

      .delete-module {
        transform: translateY(-15px);
        z-index: 99;
      }

      .add-new {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .add-new-btn {
          position: absolute;
          right: 0;
          bottom: 16px;
        }
      }

      .default-add-new {
        margin-top: 23px;
      }
    }

    .el-collapse {
      // --el-collapse-border-color: none;
      // --el-collapse-header-bg-color: var(--background);
      // --el-collapse-header-text-color: var(--font-2);
      // --el-collapse-content-bg-color: var(--background);
      // --el-collapse-content-text-color: var(--theme-blue);

      .el-collapse-item {
        padding: 0 10px 0 5px;
      }

      .el-collapse-item__header {
        // background-color: var(--background);
        color: var(--theme-blue);
        border-top: 1px solid @border;
        font-size: 16px;
        font-weight: 700;
      }

      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }

    .form-describe-wrap {
      &:last-child {
        .form-item-list {
          &:last-child {
            .el-form-item {
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        .add-new {
          margin-bottom: 0;
        }
      }

      &:first-child {
        .el-collapse-item__header {
          border-top: none;
        }
      }
    }
  }

  .editor-wrap {
    :deep {
      .el-scrollbar {
        height: 100%;
        padding-right: 10px;
        padding-bottom: 0 !important;
      }

      .editor-wrapper {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
