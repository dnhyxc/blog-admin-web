<!--
 * 文章预览页面
 * @author: dnhyxc
 * @since: 2023-01-08
 * index.vue
-->
<template>
  <div class="preview-wrap">
    <v-md-preview
      id="__MD_PREVIEW__"
      ref="previewRef"
      :text="mackdown"
      default-show-toc
      @copy-code-success="onCopyCodeSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { detailStore } from '@/store';

interface IProps {
  mackdown: string;
  onPreviewImage?: (e: Event) => void;
}

const previewRef = ref<any>(null);

const props = withDefaults(defineProps<IProps>(), {
  mackdown: '',
  onPreviewImage: (e: Event) => {},
});

onMounted(() => {
  if (detailStore.previewRef) {
    const anchors: HTMLHeadingElement[] = detailStore.previewRef.querySelectorAll('h1,h2,h3,h4,h5,h6');

    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

    if (!titles.length) {
      detailStore.tocTitles = [];
      return;
    }

    detailStore.titles = titles;

    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

    // 存储所有的标题标签
    detailStore.tocTitles = titles.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName),
    }));
  }

  nextTick(() => {
    previewRef.value.$el.addEventListener('click', onImageClick);
  });
});

const onImageClick = (e: Event) => {
  e.preventDefault();
  const anchor = e.target as HTMLAnchorElement;

  // 判断是否是 a 标签，使用默认浏览器打开链接
  if (anchor.tagName === 'A') {
    window.open(anchor.href);
    return;
  }
  // 判断是否 a 标签的子元素
  if (anchor.closest('a')) {
    const parentAnchor = anchor.parentNode as HTMLAnchorElement;
    window.open(parentAnchor?.href);
    return;
  }
  const image = e.target as HTMLImageElement;
  // 预览文章中的图片
  if (image.tagName === 'IMG') {
    props?.onPreviewImage?.({
      target: {
        id: '__COMMENT_IMG__',
        src: image.src,
        tagName: 'IMG',
      },
    } as unknown as Event);
  }
};

const onCopyCodeSuccess = (code: string) => {
  ElMessage.success('复制成功');
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

:deep {
  .vuepress-markdown-body {
    padding: 30px;
  }
}
</style>
