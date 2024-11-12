<!--
 * 
 * @author: dnhyxc
 * @since: 2024-08-16
 * index.vue
-->
<template>
  <div :class="`preview-wrap ${preview && !pdfUrl ? 'is-preview-wrap' : ''}`">
    <el-scrollbar ref="scrollRef">
      <div id="__CONTENT__" ref="contentRef" :style="contentStyle">
        <div
          v-for="i in lines"
          :key="i"
          class="line"
          :style="`top: ${i * 287}mm;`"
          :data-content="`第 ${i} 页，此线为分页区域，可通过调整字体大小、行高、边距等参数解决页面截断问题`"
        />
        <div class="__RESUME_CONTENT__">
          <div v-if="resumeStore.customStyles.type === 'doubleColumn'" id="__BASE_INFO__" class="__RESUME_LEFT__" :style="resumeLeftStyle">
            <div class="base-info-module-list">
              <div v-for="(item, index) in profileModule" :key="item.key" class="module-item">
                <component :is="item.element" :index="index" :data="item" :on-click-option="onClickOption" />
              </div>
            </div>
            <div :style="bgStyle" />
          </div>
          <div
            class="__RESUME_RIGHT__"
            :style="`width: ${resumeStore.customStyles.type !== 'doubleColumn' ? '100%' : '70%'};`"
          >
            <draggable
              :list="workModule"
              item-key="key"
              draggable=".item"
              ghost-class="ghost"
              @start="onDragStart"
              @end="onDragEnd"
            >
              <template #item="{ element, index }">
                <div :class="`${element.key === 'baseInfo' || route.query.preview ? 'drag-disabled' : 'item'}`">
                  <component
                    :is="element.element"
                    :style="moduleStyle"
                    :index="index"
                    :data="element"
                    :on-click-option="onClickOption"
                  />
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, shallowRef, ref } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
import { resumeStore } from '@/store';

interface IProps {
  pdfUrl: string;
  preview?: string;
}

defineProps<IProps>();

const route = useRoute();

const contentRef = shallowRef<HTMLDivElement | null>(null);
const lines = ref<number>(0);

let resizeObserver: ResizeObserver;
const FILTER_MODULES = ['baseInfo', 'educationInfo', 'honorInfo', 'summaryInfo'];

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // 1123px 是通过 297mm 计算出来的 a4 纸的高度
      const count = Math.round(entry.contentRect.height / 1123);
      lines.value = count;
    }
  });

  if (contentRef.value) {
    resizeObserver.observe(contentRef.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

const profileModule = computed(() => {
  return resumeStore.sortedElements.filter((i) => FILTER_MODULES.includes(i.key));
});

const workModule = computed(() => {
  return ['default', 'speciality'].includes(resumeStore.customStyles.type as string)
    ? resumeStore.sortedElements
    : resumeStore.sortedElements.filter((i) => !FILTER_MODULES.includes(i.key));
});

const contentStyle = computed(() => {
  const style = `
    font-size: ${resumeStore.customStyles.fontSize}px;
    line-height: ${resumeStore.customStyles.lineHeight}px;
  `;
  return style;
});

const resumeLeftStyle = computed(() => {
  const style = `
    color: ${resumeStore.customStyles.sidebarTextColor};
  `;
  return style;
});

const bgStyle = computed(() => {
  const style = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${resumeStore.customStyles.sidebarBgColor};
    opacity: 0.15;
    z-index: 0;
  `;
  return style;
});

const moduleStyle = computed(() => {
  const style = `
    margin-top: ${resumeStore.customStyles.moduleMarginTop}px;
    margin-bottom: ${resumeStore.customStyles.moduleMarginBottom}px;
  `;
  return style;
});

const onClickOption = (option: string) => {
  resumeStore.activeOption = option;
};

const onDragStart = (event: any) => {
  event.item.style.cursor = 'grabbing';
};

const onDragEnd = (event: any) => {
  const oldIndex = event.oldIndex;
  const newIndex = event.newIndex;

  // 如果是双栏布局，需要过滤掉左侧边栏的模块，否则会导致排序错误
  const elements =
    resumeStore.customStyles.type !== 'doubleColumn'
      ? resumeStore.sortedElements
      : resumeStore.sortedElements.filter((i) => !FILTER_MODULES.includes(i.key));

  const oldItemData = elements[oldIndex];
  const newItemData = elements[newIndex];

  resumeStore.setResumeOption(oldItemData, newItemData);
  if (event.item.classList.contains('drag-disabled')) {
    event.item.style.cursor = 'not-allowed';
  } else {
    event.item.style.cursor = 'grab';
  }
};

defineExpose({
  contentRef,
  lines,
});
</script>
<style>
.__RESUME_CONTENT__ {
  display: flex;
  justify-content: space-between;
}

.__RESUME_LEFT__ {
  position: relative;
  width: 30%;
  padding: 10px;
  margin-right: 10px;
  box-sizing: border-box;
}
</style>
<style scoped lang="less">
@import '@/styles/index.less';

.preview-wrap {
  position: relative;
  // 正常情况下是a4纸的宽度 210mm * 297mm，或者 793px * 1123px，但是这里需要减去在生成html2pdf配置中设置的0.2in的外边距
  width: 205mm;
  min-width: 205mm;
  height: calc(100vh - 149px);
  box-sizing: border-box;
  color: var(--font-2);
  border: 1px solid @border;
  border-radius: 5px;
  padding: 10px 0 10px 10px;
  -webkit-user-drag: none;

  #__CONTENT__ {
    position: relative;

    .line {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      width: 100%;
      border-bottom: 1px solid var(--active-color);
      z-index: 1;

      &::before {
        display: flex;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        content: attr(data-content);
        width: 100%;
        font-size: 12px;
        color: var(--active-color);
      }
    }
  }

  &:first-child {
    margin-right: 10px;
  }

  .item {
    cursor: grab;
  }

  .drag-disabled {
    -webkit-user-drag: none;
  }

  :deep {
    .el-scrollbar {
      height: 100%;
    }

    .el-scrollbar__wrap {
      height: 100%;
      overflow-y: auto;
      width: calc(100% - 10px);
    }

    .describe {
      &:hover {
        .title {
          .icon {
            display: inline;
          }
        }
      }
    }

    .module-item {
      position: relative;

      &:hover {
        .icon {
          display: inline;
        }
      }

      .module-actions {
        position: absolute;
        top: 2px;
        right: 5px;
      }
    }
  }
}

.is-preview-wrap {
  margin-left: 10px;
}
</style>
