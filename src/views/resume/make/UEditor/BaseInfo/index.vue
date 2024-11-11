<!--
 * 基本信息编辑页面
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div class="form-describe">
    <div class="form-item-list">
      <el-form-item
        v-for="(item, key) in resumeStore.getBaseInfo"
        :key="key"
        :label="item.key"
        :class="`form-item ${item.label === 'avatar' && 'experience-item'}`"
      >
        <div v-if="item.label === 'avatar'" class="avatar-upload">
          <Upload v-model:file-path="item.value" :fixed-number="[7, 9]" :show-restore-shot="false" base64>
            <template #preview>
              <Image :url="item.value || AVATAR" :transition-img="AVATAR" class="cover-img" radius="3px" />
            </template>
          </Upload>
        </div>
        <el-input v-else v-model="item.value" type="text" :placeholder="`请输入${item.key}`" />
        <el-button v-if="otherBaseLabels.includes(item.label)" link class="delete-button" @click="() => onRemove(item)">
          <i class="iconfont icon-guanbi1" />
        </el-button>
        <el-button
          v-if="['github', 'website'].includes(item.label) && item.value"
          link
          class="delete-button"
          @click="() => onOpen(item.value)"
        >
          <i :class="`iconfont icon-bx-link-external link-icon ${item.label === 'github' ? 'github-link-icon' : ''}`" />
        </el-button>
      </el-form-item>
    </div>
    <div v-if="otherBases.length > 0" class="other-base">
      <div class="other-base-title">更多</div>
      <div class="other-base-list">
        <div v-for="base in otherBases" :key="base.label" class="other-base-item" @click="onAdd(base)">
          <i class="icon iconfont icon-add" />
          <span>{{ base.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { resumeStore, uploadStore } from '@/store';
import { RESUME_OTHER_BASE, AVATAR } from '@/constant';
import { BaseInfo } from '@/typings/comment';
import { nextTick } from 'process';

const route = useRoute();

const otherBases = ref<Partial<BaseInfo>[]>(RESUME_OTHER_BASE);
const uploadHeadUrl = ref<string>('');
const isUpdate = ref<boolean>(false);

const otherBaseLabels = computed(() => {
  return RESUME_OTHER_BASE.map((i) => i.label);
});

watch(
  () => resumeStore.getBaseInfo,
  (newVal) => {
    if (route.query?.id) {
      nextTick(() => {
        otherBases.value = RESUME_OTHER_BASE.filter((i) => !newVal.some((item) => item.label === i.label));
      });
    }
  },
  {
    deep: true,
  },
);

// 上传了文件，但是没有调用更新接口时，在页面离开之后要删除刚上传的文件
onBeforeRouteLeave(() => {
  if (!isUpdate.value) {
    uploadHeadUrl.value && uploadStore.removeFile(uploadHeadUrl.value);
  }
});

const onAdd = (base: Partial<BaseInfo>) => {
  resumeStore.addOtherBase(base);
  otherBases.value = otherBases.value.filter((item) => item.label !== base.label);
};

const onRemove = (item: BaseInfo) => {
  resumeStore.removeOtherBase(item);
  otherBases.value.push({
    ...item,
    title: item.key,
  });
  otherBases.value.sort((a, b) => a.sort! - b.sort!);
};

const onOpen = (url: string) => {
  window.open(url, '_self');
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.form-item {
  position: relative;

  .link-icon {
    position: absolute;
    top: 1px;
    right: 170px;
    font-size: 17px;
  }

  .github-link-icon {
    right: 185px;
  }

  .avatar-upload {
    width: 100px;
    aspect-ratio: 7 / 9;

    .cover-img {
      width: 100%;
      height: 100%;
    }
  }

  .delete-button {
    position: absolute;
    top: -29px;
    right: -4px;
  }
}

.other-base {
  color: @font-1;
  margin-bottom: 20px;

  .other-base-title {
    font-size: 16px;
    font-weight: 700;
  }

  .other-base-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .other-base-item {
    display: flex;
    align-items: center;
    border: 1px solid @border;
    border-radius: 5px;
    margin-right: 10px;
    padding: 0 5px;
    cursor: pointer;

    .icon {
      font-size: 15px;
      margin-right: 5px;
    }

    &:hover {
      color: @primary;
    }

    &:active {
      border: 1px solid @primary;
    }
  }
}
</style>
