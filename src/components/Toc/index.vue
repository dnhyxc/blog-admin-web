<!--
 * 文章目录
 * @author: dnhyxc
 * @since: 2023-01-14
 * index.vue
-->
<template>
  <div ref="tocRef" class="toc-wrap">
    <div class="title">目录</div>
    <div
      v-for="(anchor, index) in (detailStore.tocTitles as any)"
      :key="index"
      :style="{ padding: `10px 0 10px ${anchor.indent * 20 + 5}px` }"
      :class="checkTocTitle === anchor.title + index && 'toc-item'"
      @click="handleAnchorClick(anchor, index)"
    >
      <a style="cursor: pointer" :class="checkTocTitle === anchor.title + index && 'active'">{{ anchor.title }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import _ from 'lodash';
import { detailStore } from '@/store';

const checkTocTitle = ref<string | undefined>('');

const tocRef = ref<HTMLDivElement | null>(null);

const onScroll = _.debounce(() => {
  const detailElement: HTMLDivElement | null = document.querySelector('#__DETAIL__');
  if (detailElement && tocRef.value) {
    const { scrollHeight, scrollTop } = detailElement!;
    const number = scrollTop! / scrollHeight;
    tocRef.value.scrollTop = tocRef.value.scrollHeight * number;
  }
}, 10);

onMounted(() => {
  checkTocTitle.value = detailStore.tocTitles[0].title + 0;
  const detailElement: HTMLDivElement | null = document.querySelector('#__DETAIL__');
  detailElement?.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  const detailElement: HTMLDivElement | null = document.querySelector('#__DETAIL__');
  detailElement?.removeEventListener('scroll', onScroll);
});

// 点击目录事件
const handleAnchorClick = (anchor: { lineIndex: string; title: string }, index: number) => {
  const { lineIndex, title } = anchor;
  checkTocTitle.value = title + index;
  const heading = detailStore.previewRef.querySelector(`[data-v-md-line="${lineIndex}"]`);
  if (heading) {
    heading.classList.add('header-active');
    detailStore.previewRef.scrollTo({ top: heading.offsetTop - 5, behavior: 'smooth' });
  }
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.toc-wrap {
  box-sizing: border-box;
  width: 280px;
  height: auto;
  max-height: calc(100vh - 70px);
  background-color: @fff;
  border-radius: 5px;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;

  .title {
    padding: 15px 0 15px;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid @border-color;
  }

  .toc-item {
    position: relative;
    width: 100%;

    &::before {
      position: absolute;
      left: -11px;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      height: 65%;
      width: 5px;
      background-color: @primary;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  .active {
    color: @primary;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
