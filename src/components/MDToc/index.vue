<!--
 * 文章目录
 * @author: dnhyxc
 * @since: 2023-01-14
 * index.vue
-->
<template>
  <div ref="tocRef" class="toc-wrap">
    <div class="title">
      <span>目录</span>
    </div>
    <el-scrollbar ref="scrollChildRef" wrap-class="scrollbar-wrapper">
      <MdCatalog :editor-id="MD_EDITER_ID" :scroll-element="scrollElement" :scroll-element-offset-top="offsetTop" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MdCatalog } from 'md-editor-v3';
import { MD_EDITER_ID } from '@/constant';

interface IProps {
  scrollRef: any;
  offsetTop?: number;
}

const props = defineProps<IProps>();

const scrollElement = computed(() => {
  return props?.scrollRef;
});
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.toc-wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: @fff;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    font-size: 18px;
    font-weight: 700;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  :deep {
    .active-toc {
      margin-top: 7px;

      .md-editor-catalog-link {
        span {
          &:hover {
            color: @primary-light-3;
          }
        }
      }

      .md-editor-catalog-active {
        position: relative;

        & > span {
          color: @primary;
        }

        &::before {
          position: absolute;
          left: 0;
          top: 4px;
          content: '';
          width: 4px;
          height: 18px;
          border-radius: 0 5px 5px 0;
          background-color: @primary;
        }
      }
    }

    .el-scrollbar {
      padding: 5px 0;
    }

    .scrollbar-wrapper {
      box-sizing: border-box;
    }

    .el-scrollbar__view {
      box-sizing: border-box;
      max-height: calc(100vh - 124px);
      padding-right: 10px;
      border: 1px solid transparent;
    }

    .md-editor-catalog-indicator {
      display: none;
    }

    .md-editor-catalog-container {
      .active-toc;
      margin-top: 0;

      .md-editor-catalog-wrapper {
        & > .md-editor-catalog-link:first-of-type {
          padding-top: 5px;
        }

        .active-toc;

        .md-editor-catalog-active {
          &::before {
            left: -16px;
          }
        }

        .md-editor-catalog-wrapper {
          .active-toc;

          .md-editor-catalog-active {
            &::before {
              left: -32px;
            }
          }

          .md-editor-catalog-wrapper {
            .active-toc;

            .md-editor-catalog-active {
              &::before {
                left: -48px;
              }
            }

            .md-editor-catalog-wrapper {
              .active-toc;

              .md-editor-catalog-active {
                &::before {
                  left: -64px;
                }
              }
            }
          }
        }
      }
    }
  }

  .item {
    .ellipsisMore(1);

    &:hover {
      color: @primary-light-5;
    }
  }

  .toc-item {
    box-sizing: border-box;
    position: relative;
    width: 100%;

    &::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      height: 65%;
      width: 4px;
      background-color: @primary;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  .active {
    color: @primary;
  }
}
</style>
