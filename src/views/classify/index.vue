<template>
  <div class="tag-list-wrap">
    <div v-if="userStore?.auth === 1" class="create">
      <div class="create-btn" @click="onCreateClassify">创建新分类</div>
    </div>
    <div :class="`tag-list ${userStore?.auth !== 1 && 'notAuth'}`">
      <el-scrollbar ref="scrollRef" class="infinite-list-wrapper">
        <div
          v-if="isMounted"
          v-infinite-scroll="load"
          class="list"
          :infinite-scroll-disabled="disabled"
          infinite-scroll-immediate
          infinite-scroll-distance="2"
        >
          <div v-for="item in classifyStore.classifyList" :key="item.id" class="card-wrap">
            <Card class="card">
              <template #title>
                <div class="title">{{ item.classifyName || '-' }}</div>
              </template>
              <template #content>
                <div class="desc">{{ item.userCount }} 添加 &nbsp; {{ item.articleCount }} 文章</div>
              </template>
              <template #footer>
                <div class="action">
                  <el-button
                    :type="!isAdded(item) ? 'primary' : 'warning'"
                    link
                    class="add-btn"
                    @click.stop="onAddOrRemoveClassify(item.id, isAdded(item))"
                    >{{ isAdded(item) ? '移除分类' : '添加分类' }}</el-button
                  >
                  <el-button
                    v-if="userStore.auth === AUTH_CONFIG.SUPER"
                    type="danger"
                    link
                    class="add-btn"
                    @click.stop="onDeleteClassify(item)"
                    >删除</el-button
                  >
                </div>
              </template>
            </Card>
          </div>
        </div>
        <p v-if="classifyStore.loading" class="loading">Loading...</p>
        <p v-if="noMore" class="no-more">没有更多了～～～</p>
      </el-scrollbar>
      <ToTopIcon v-if="scrollTop >= 500" :on-scroll-to="onScrollTo" />
      <Modal v-model:visible="visible" title="创建分类" :width="450" content-padding="10px" :on-submit="onSubmit">
        <div class="modal-content">
          <el-form ref="formRef" :model="classifyForm" label-width="110px" class="form-wrap" @submit.native.prevent>
            <el-form-item
              label="分类名称"
              label-width="80px"
              :rules="{
                required: true,
                message: '请输入分类名称',
              }"
              class="form-item-custom"
              @keyup.enter="onSubmit"
            >
              <el-input v-model="classifyForm.classifyName" placeholder="请输入需要绑定的前台账号名称" />
            </el-form-item>
          </el-form>
        </div>
      </Modal>
      <Message
        v-model:visible="messageVisible"
        title="删除文章"
        content="确定删除该文章吗？"
        info="删除文章后，该文章将无法恢复！"
        :on-submit="onSubmitDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, reactive, onUnmounted } from 'vue';
import type { FormInstance } from 'element-plus';
import { scrollTo } from '@/utils';
import { useScroller } from '@/hooks';
import { classifyStore, userStore } from '@/store';
import { ClassifyItem } from '@/typings/comment';
import { AUTH_CONFIG } from '@/constant';
import Card from '@/components/Card/index.vue';

const { scrollRef, scrollTop } = useScroller();

const noMore = computed(() => {
  const { classifyList, total } = classifyStore;
  return classifyList.length >= total && classifyList.length;
});
const disabled = computed(() => classifyStore.loading || noMore.value);
const isMounted = ref<boolean>(false);
const visible = ref<boolean>(false);
const messageVisible = ref<boolean>(false); // 删除二次确认框的状态
const deleteId = ref<string>('');
const formRef = ref<FormInstance>();
const classifyForm = reactive<{
  classifyName: string;
}>({
  classifyName: '',
});

onMounted(() => {
  isMounted.value = true;
  classifyStore.getClassifyList();
});

onUnmounted(() => {
  classifyStore.clearClassifyList();
});

const load = () => {
  classifyStore.getClassifyList();
};

// 判断是否添加
const isAdded = (item: ClassifyItem) => {
  return item?.addUserIds?.includes(userStore?.userId!);
};

// 创建分类
const onCreateClassify = () => {
  visible.value = true;
};

// 提交
const onSubmit = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      await classifyStore.createClassify(classifyForm.classifyName);
      visible.value = false;
      formRef.value?.resetFields();
      classifyStore.clearClassifyList();
      classifyStore.getClassifyList();
    } else {
      return false;
    }
  });
};

// 分类添加或移除
const onAddOrRemoveClassify = async (id: string, type: boolean | undefined) => {
  if (type) {
    await classifyStore.addClassify(id, 'remove');
  } else {
    await classifyStore.addClassify(id, 'add');
  }
};

// 删除分类
const onDeleteClassify = async (item: ClassifyItem) => {
  deleteId.value = item.id;
  messageVisible.value = true;
};

const onSubmitDelete = async () => {
  await classifyStore.deleteClassify(deleteId.value);
};

// 滚动到顶部
const onScrollTo = () => {
  scrollTo(scrollRef, 0);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.tag-list-wrap {
  .layoutStyles();

  :deep(.el-tabs__content) {
    padding: 10px 0 15px 15px;
  }

  .create {
    background-color: @fff;
    padding: 20px 35px 5px;

    .create-btn {
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 5px;
      box-shadow: 0 0 10px @info-light-5;
      max-width: 945px;
      margin: auto;
      cursor: pointer;
    }
  }

  .tag-list {
    box-sizing: border-box;
    height: calc(100vh - 155px);

    .infinite-list-wrapper {
      height: 100%;
      padding: 10px 20px 0 20px;
      background-color: @fff;

      .list {
        margin: auto;
        width: auto;
        max-width: 960px;
        padding: 5px 0 0 15px;
        border-radius: 5px;
        background-color: @fff;

        .card-wrap {
          width: 25%;
          display: inline-block;
          box-sizing: border-box;

          .card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: none;
            width: calc(100% - 15px);
            height: 160px;
            margin-bottom: 15px;

            .title {
              margin-bottom: 20px;
              font-size: 18px;
              font-weight: 700;
            }

            .desc {
              font-size: 13px;
            }

            .action {
              display: flex;
              justify-content: center;
              margin-top: 20px;

              .add-btn {
                font-size: 13px;
              }
            }
          }
        }
      }
    }

    .loading,
    .no-more {
      text-align: center;
      margin-top: 5px;
    }
  }

  .notAuth {
    height: calc(100vh - 80px);
  }

  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;

    .form-wrap {
      width: 100%;
    }
  }
}

@media screen and (max-width: 800px) {
  .tag-list-wrap {
    .tag-list {
      .infinite-list-wrapper {
        .list {
          max-width: 960px;
          margin: auto;

          .card-wrap {
            width: 50%;
          }
        }
      }

      .loading,
      .no-more {
        text-align: center;
      }
    }
  }
}
</style>
