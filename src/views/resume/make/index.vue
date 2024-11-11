<template>
  <Loading :loading="resumeStore.loading" load-text="正在卖力制作中" class="make-wrap">
    <Setting
      v-model:isChanged="isChanged"
      :pdf-url="pdfUrl"
      :on-preview="onPreview"
      :download="downloadToPDF"
      :on-save-resume="onSaveResume"
      :resume-id="resumeId"
      :preview="(route.query.preview as string)"
    />
    <el-scrollbar ref="scrollRef" class="resume-content-scrollbar">
      <div ref="wrapRef" :class="`resume-content ${route.query.preview ? 'preview-resume-content' : ''}`">
        <UEditor v-show="!route.query.preview" />
        <UResume ref="resumeRef" :options="options" :pdf-url="pdfUrl" :preview="(route.query.preview as string)" />
        <Preview v-show="showPreview" :pdf-url="pdfUrl" :download="downloadToPDF" :on-close="onClose" />
      </div>
    </el-scrollbar>
  </Loading>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted, onUnmounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import { formatDate, scrollTo, base64ToBlob, compressImage } from '@/utils';
import { userStore, resumeStore } from '@/store';
import { useScroller } from '@/hooks';
import { RESUME_TYPE } from '@/typings/comment';
import UEditor from './UEditor/index.vue';
import UResume from './UResume/index.vue';
import Preview from './Preview/index.vue';
import Setting from './Setting/index.vue';

const { scrollRef } = useScroller();

const route = useRoute();
const resumeId = ref<string>((route.query.id as string) || '');
const wrapRef = ref<any>(null);
const resumeRef = ref<any>(null);
const pdfUrl = ref<string>('');
const showPreview = ref<boolean>(false);
const options = reactive({
  margin: 0.2,
  filename: userStore.userInfo.username! + formatDate(new Date().valueOf(), 'YYYYMMDDHHmmss') + '.pdf',
  image: { type: 'jpeg', quality: 1 },
  html2canvas: { scale: 4, useCORS: true },
  jsPDF: {
    unit: 'in', // pt、mm、cm、in
    format: 'a4',
    orientation: 'portrait',
  },
  // pagebreak: { mode: ['avoid-all'] },
});
const isChanged = ref<boolean>(false);
const initResumeInfo = ref<typeof resumeStore.resumeInfo>();
const initCustomModuleCount = ref<number>();
const initElements = ref<typeof resumeStore.elements>();
const initCustomStyles = ref<typeof resumeStore.customStyles>();

onMounted(async () => {
  const type = route.query.type as RESUME_TYPE;
  if (type) {
    const styles = {
      doubleColumn: { type, linkColor: 'unset', baseViewType: '图标' },
      speciality: { type, linkColor: 'unset' },
      default: { type },
    };
    resumeStore.setCustomStyles((styles as any)[type]);
  }
  if (route.query.id) {
    await resumeStore.getResumeInfo(route.query.id as string);
  }
  initResumeInfo.value = JSON.parse(JSON.stringify(resumeStore.resumeInfo));
  initCustomModuleCount.value = resumeStore.customModuleCount;
  initElements.value = JSON.parse(JSON.stringify(resumeStore.elements));
  initCustomStyles.value = JSON.parse(JSON.stringify(resumeStore.customStyles));
  document.addEventListener('keydown', onKeyDown);
});

onBeforeRouteLeave(async (to, from, next) => {
  if (isChanged.value) return next();

  const isInfoChanged = JSON.stringify(initResumeInfo.value) !== JSON.stringify(resumeStore.resumeInfo);
  const isModuleCountChanged = initCustomModuleCount.value !== resumeStore.customModuleCount;
  const isElementsChanged = JSON.stringify(initElements.value) !== JSON.stringify(resumeStore.elements);
  const isStylesChanged = JSON.stringify(initCustomStyles.value) !== JSON.stringify(resumeStore.customStyles);
  const hasChanges = isChanged.value || isInfoChanged || isModuleCountChanged || isElementsChanged || isStylesChanged;

  if (hasChanges) {
    try {
      const res = await ElMessageBox.confirm('', '是否要保存简历内容？');
      if (res === 'confirm') {
        await onSaveResume();
        next();
      } else {
        next();
      }
    } catch (error) {
      next();
    }
  } else {
    next();
  }
});

onUnmounted(() => {
  resumeStore.initResumeInfo();
  resumeStore.initCustomStyles();
  isChanged.value = false;
  document.removeEventListener('keydown', onKeyDown);
});

// 监听键盘事件
const onKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    onSaveResume();
  }
};

const onSaveResume = async (needMessage: boolean = true) => {
  const coverUrl = await getPreviewUrl(needMessage);
  if (resumeId.value) {
    await resumeStore.updateResumeInfo({
      coverUrl,
      id: resumeId.value,
      needMessage,
    });
  } else {
    const id = await resumeStore.saveResumeInfo({ coverUrl });
    if (id) {
      resumeId.value = id;
    }
  }
  isChanged.value = true;
};

const getPreviewUrl = async (needMessage: boolean = true) => {
  if (resumeRef.value?.contentRef) {
    needMessage && (resumeStore.loading = true);
    resumeRef.value?.contentRef.classList.add('__RESUME_COVER__');
    const canvas = await html2canvas(resumeRef.value.contentRef, {
      height: 1123,
    });
    resumeRef.value?.contentRef.classList.remove('__RESUME_COVER__');
    const url = canvas.toDataURL('image/jpeg');
    const file = base64ToBlob(url);
    const { base64Url } = await compressImage({
      file: file as File,
      quality: 0.5, // 压缩比例
    });
    return base64Url;
  }
  return '';
};

const getUrl = async () => {
  if (resumeRef.value.lines >= 15) {
    return ElMessage({
      message: '内容已超过15页，请精简内容或者调整字体大小、行高、边距后重试！',
      type: 'warning',
    });
  }
  resumeStore.loading = true;
  const sidebarTextColor = resumeStore.customStyles.sidebarTextColor;
  const linkColor = resumeStore.customStyles.linkColor;
  let links: HTMLElement[] = [];
  if (sidebarTextColor === '#fff') {
    const baseInfoElement = document.querySelector('#__BASE_INFO__') as HTMLElement;
    baseInfoElement.style.color = 'unset';
  }
  if (linkColor === '#fff') {
    links = document.querySelectorAll('#__link__') as unknown as HTMLElement[];
    links?.forEach((link) => {
      link.style.color = 'unset';
    });
  }
  if (resumeRef.value?.contentRef) {
    const blob = await html2pdf()
      .set(options)
      .from(resumeRef.value?.contentRef as HTMLElement)
      .toPdf()
      .output('blob');
    if (linkColor === '#fff') {
      links?.forEach((link) => {
        link.style.color = linkColor;
      });
    }

    return URL.createObjectURL(blob);
  }
  return null;
};

const onPreview = () => {
  nextTick(async () => {
    const url = await getUrl();
    if (!url) return;
    pdfUrl.value = url as string;
    showPreview.value = true;
    scrollTo(scrollRef, 2000, 20, 'right');
    resumeStore.loading = false;
  });
};

const downloadToPDF = () => {
  nextTick(async () => {
    const url = await getUrl();
    if (!url) return;
    // 创建一个隐藏的a标签
    const link = document.createElement('a');
    link.href = url as string;
    link.download = options.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    resumeStore.loading = false;
  });
};

const onClose = () => {
  showPreview.value = false;
};
</script>

<style>
.describe {
  margin-bottom: 20px;
}

.job-item {
  padding-top: 3px;
  margin-bottom: 10px;
}

.job-position {
  padding: 5px 0;
}

ul {
  padding-left: 15px;
  margin: 0;
}

p {
  margin: unset;
}

.__RESUME_COVER__ {
  color: #000;
}
</style>

<style scoped lang="less">
@import '@/styles/index.less';

.make-wrap {
  display: flex;
  flex-direction: column;
  height: calc(100% - 8px);
  color: var(--font-2);
  font-size: 14px;
  margin: 8px 5px 0 5px;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 @border;
  .clickNoSelectText();

  :deep {
    .el-input__wrapper {
      // color: var(--font-1);
      // background-color: var(--input-bg-color);
    }

    .el-form-item:not(.is-error) .el-input__wrapper {
      // box-shadow: 0 0 1.5px 0 var(--border-color) inset;
    }

    .el-input__inner {
      // color: var(--font-1);
      // background-color: transparent;
    }

    .el-form-item__label {
      // color: var(--font-1);
    }

    .el-scrollbar__bar {
      right: 0;
    }
  }

  .resume-content-scrollbar {
    display: flex;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
    width: calc(100% - 10px);
  }

  .resume-content {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
