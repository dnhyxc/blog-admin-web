<!--
 * 简历制作
 * @author: dnhyxc
 * @since: 2024-08-29
 * index.vue
-->
<template>
  <div class="resume-wrap">
    <div class="content">
      <div class="top">
        <div class="title top-title">
          <div class="title-text">简历模板</div>
        </div>
        <el-scrollbar ref="scrollRef">
          <div class="template-list">
            <div v-for="item in TEMPLATES" :key="item.key" class="resume-list">
              <div v-if="item.show" class="resume-item">
                <div class="mark">
                  <div class="mark-content">
                    <div class="preview" @click="onPreviewTemplate(item.key as RESUME_TYPE)">
                      <i class="iconfont icon-preview" />
                      <div class="prev-text">点击预览</div>
                    </div>
                    <div class="mark-text" @click="() => onUseTemplate(item.key)">使用模版</div>
                  </div>
                </div>
                <div class="resume-info">
                  <Image
                    :url="RESUME_COVERS[item.key as keyof typeof RESUME_COVERS] || RESUME_DEFAULT"
                    :transition-img="RESUME_DEFAULT"
                    class="img"
                    radius="3px 3px 0 0"
                  />
                </div>
                <div class="actions">{{ item.name }}</div>
              </div>
              <div v-else class="resume-item">
                <div class="resume-info" />
                <div class="actions">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <Loading :loading="resumeStore.loading" class="bottom">
        <div class="title bottom-title">
          <div class="title-text">我的简历</div>
        </div>
        <el-scrollbar ref="scrollRef" wrap-class="scrollbar-wrapper">
          <div
            v-if="isMounted"
            v-infinite-scroll="onFetchData"
            :infinite-scroll-delay="300"
            :infinite-scroll-disabled="disabled"
            :infinite-scroll-distance="2"
            class="pullup-content"
          >
            <div v-if="resumeStore.resumeInfoList?.length" class="resume-list">
              <div
                v-for="item in resumeStore.resumeInfoList"
                :key="item.id"
                class="resume-item"
                @click="toMake(item.id!)"
              >
                <div class="resume-info">
                  <Image
                    :url="item.coverUrl || RESUME_DEFAULT"
                    :transition-img="RESUME_DEFAULT"
                    class="img"
                    radius="3px 3px 0 0"
                  />
                </div>
                <div class="actions">
                  <div class="actions-left">
                    <span v-if="item.customStyles?.type" class="template-type">
                      {{ TEMPLATE_TYPES[item.customStyles?.type as keyof typeof TEMPLATE_TYPES] }}
                    </span>
                    <span class="date">
                      {{ item.createTime && formatDate(item.createTime, 'YYYY/MM/DD') }}
                    </span>
                  </div>
                  <span class="delete-icon" @click.stop="onDelete(item.id!)">
                    <i class="iconfont icon-shanchu" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="noMore" class="no-more">没有更多了～～～</div>
          <Empty v-if="showEmpty" />
        </el-scrollbar>
      </Loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { userStore, resumeStore } from '@/store';
import { formatDate } from '@/utils';
import { RESUME_TYPE } from '@/typings/comment';
import { RESUME_DEFAULT, RESUME_COVERS } from '@/constant';

const TEMPLATE_TYPES = {
  default: '极简',
  doubleColumn: '双栏',
  speciality: '简约',
};

const TEMPLATES = [
  {
    key: 'default',
    name: '极简专业模板',
    show: true,
  },
  {
    key: 'doubleColumn',
    name: '双栏专业模板',
    show: true,
  },
  {
    key: 'speciality',
    name: '简约专业模板',
    show: true,
  },
  {
    key: 'other1',
    name: '敬请期待',
    show: false,
  },
  {
    key: 'other2',
    name: '敬请期待',
    show: false,
  },
];

const router = useRouter();

const isMounted = ref(false);

const noMore = computed(() => {
  const { resumeInfoList, total, pageSize } = resumeStore;
  return resumeInfoList.length >= total && resumeInfoList.length && total > pageSize;
});
const showEmpty = computed(
  () => resumeStore.loading !== null && !resumeStore.loading && !resumeStore.resumeInfoList?.length,
);
const disabled = computed(() => resumeStore.loading || noMore.value);

onMounted(() => {
  isMounted.value = true;
  onFetchData();
});

onUnmounted(() => {
  resumeStore.clearResumeInfo();
});

const onFetchData = async () => {
  await resumeStore.getResumeInfoList();
};

const onDelete = (id: string) => {
  // Message('', '确定删除该简历？').then(async () => {
  //   await resumeStore.deleteResumeInfo(id);
  // });
};

const onPreviewTemplate = (type: RESUME_TYPE) => {
  router.push(`/resume/make?type=${type}&preview=true`);
};

const onUseTemplate = (type: string) => {
  if (resumeStore.resumeCount < 15 || userStore.userInfo.auth === 1) {
    router.push(`/resume/make?type=${type}`);
  } else {
    ElMessage({
      message: '简历数量不足，请先删除部分简历后再使用模版！',
      type: 'warning',
    });
  }
};

const toMake = (id?: string) => {
  router.push(id ? `/resume/make?id=${id}` : '/resume/make');
};
</script>
<style scoped lang="less">
@import '@/styles/index.less';

.resume-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 8px);
  color: @font-3;
  font-size: 14px;
  margin: 8px 5px 0 5px;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 @border;
  .clickNoSelectText();

  .content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 40px;
      min-height: 40px;
      padding: 0 5px;
      margin-bottom: 5px;
      background-color: @border;
      margin-top: 5px;
      width: calc(100% - 20px);
      transform: translateX(5px);

      .title-text {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-weight: 700;
        padding: 0 5px;
        color: @font-1;
        border-radius: 5px;
      }
    }

    .top-title,
    .bottom-title {
      border-radius: 5px 5px 0 0;
    }

    .top {
      display: flex;
      flex-direction: column;
      border-radius: 5px 0 0 5px;

      .template-list {
        display: flex;
        justify-content: flex-start;
        height: 100%;

        .resume-list {
          display: flex;
          flex-wrap: wrap;
          border-radius: 5px;
          width: 20%;

          .resume-item {
            width: 100%;
            cursor: pointer;
          }
        }
      }

      .actions {
        background-image: @primary !important;
      }
    }

    .bottom {
      flex: 1;

      .pullup-content {
        height: 100%;
        box-sizing: border-box;
        border-radius: 5px;

        .resume-list {
          .resume-item {
            width: 20%;
            cursor: pointer;
          }
        }
      }

      .no-more {
        text-align: center;
        padding: 12px 0 15px;
      }
    }

    .resume-list {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      border-radius: 5px;

      .resume-item {
        position: relative;
        width: 100%;
        aspect-ratio: 8 / 10;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 5px;

        .mark {
          position: absolute;
          inset: 0;
          padding: 5px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          color: @font-1;
          border-radius: 5px;
          display: none;

          .mark-content {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-radius: 3px;
            background-color: @primary;

            .preview {
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              margin-bottom: 20px;
              cursor: pointer;

              &:active {
                color: @primary-light-3;
              }

              .icon-preview {
                font-size: 32px;
                margin-bottom: 5px;
              }
            }

            .mark-text {
              font-size: 16px;
              padding: 5px 15px;
              background-color: @primary;
              border-radius: 5px;
              cursor: pointer;

              &:active {
                background-color: @primary-light-3;
              }
            }
          }
        }

        &:hover {
          .mark {
            display: flex;
          }
        }

        .resume-info {
          height: calc(100% - 30px);
          border-radius: 3px 3px 0 0;
          padding: 5px;
          box-shadow: 0 0 1px 0 @primary inset;
          background-color: @fff;

          .img {
            height: 100%;
          }
        }

        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          padding: 0 5px;
          border-radius: 0 0 3px 3px;
          background-image: linear-gradient(-45deg, #68a235 0%, #377500 100%);
          box-shadow: 0 0 1px 0 @primary inset;
          color: @font-1;

          .actions-left {
            display: flex;
            align-items: center;
            .ellipsisMore(1);
          }

          .template-type {
            margin-right: 5px;
          }

          .delete-icon {
            cursor: pointer;

            &:hover {
              color: @primary;
            }
          }
        }
      }
    }
  }

  :deep {
    .scrollbar-wrapper {
      height: calc(100vh - 454px);
      box-sizing: border-box;
    }
  }
}
</style>
