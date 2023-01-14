<!--
 * 文章目录
 * @author: dnhyxc
 * @since: 2023-01-14
 * index.vue
-->
<template>
  <div ref="tocRef" class="toc-wrap">
    <div
      v-for="(anchor, index) in (detailStore.tocTitles as any)"
      :key="index"
      :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
      @click="handleAnchorClick(anchor, index)"
    >
      <a style="cursor: pointer" :class="checkTocTitle === anchor.title + index && 'active'">{{ anchor.title }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { detailStore } from '@/store';

const checkTocTitle = ref<string | undefined>('');

const tocRef = ref<HTMLDivElement | null>(null);

const onScroll = () => {
  const detailElement: HTMLDivElement | null = document.querySelector('#__DETAIL__');
  if (detailElement && tocRef.value) {
    const { scrollHeight, scrollTop } = detailElement!;
    const number = scrollTop! / scrollHeight;
    tocRef.value.scrollTop = tocRef.value.scrollHeight * number;
  }
};

onMounted(() => {
  const detailElement: HTMLDivElement | null = document.querySelector('#__DETAIL__');
  checkTocTitle.value = detailStore.tocTitles?.[0]?.title + 0;
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
  const heading = detailStore.previewRef.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
  if (heading) {
    heading.classList.add('header-active');
    detailStore.previewRef.scrollToTarget({
      target: heading,
      scrollContainer: document.querySelector('#__DETAIL__'),
      top: 60,
    });
  }
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.toc-wrap {
  box-sizing: border-box;
  width: 280px;
  height: calc(100vh - 70px);
  background-color: @fff;
  border-radius: 5px;
  padding: 0 10px;
  overflow: auto;

  .active {
    color: @primary;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
