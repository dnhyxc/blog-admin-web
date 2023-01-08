<!--
 * 上下布局封面设置
 * @author: dnhyxc
 * @since: 2022-12-31
 * indev.vue
-->
<template>
  <div class="cover-set-wrap">
    <div class="title">
      <div class="title-left">封面图设置<span class="info">（需要同时选择两张封面图）</span></div>
      <el-button type="primary" @click="onSave">保存设置</el-button>
    </div>
    <div class="cover-set">
      <div class="default-list">系统默认封面图列表</div>
      <div v-for="item in checkList" :key="item.id" class="type-1">
        <div class="card">
          <el-checkbox
            v-model="item.checked"
            :label="item.name"
            size="large"
            class="checkbox"
            :disabled="isSelectedTwo && !item.checked"
            @change="onSelectCard"
          />
          <el-image class="img" :src="item.img" fit="cover" />
        </div>
      </div>
      <div class="custom-list">自定义上传封面图</div>
      <div v-for="item in fileList" :key="item.id" class="type-1">
        <div class="card">
          <el-checkbox
            v-model="item.checked"
            :label="item.name"
            size="large"
            class="checkbox"
            :disabled="isSelectedTwo && !item.checked"
            @change="onSelectCard"
          />
          <el-image class="img" :src="item.url" fit="cover" />
        </div>
      </div>
      <el-upload
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        class="el-upload"
      >
        <template #trigger>
          <div class="card-upload">
            <div class="upload-text">
              <span class="card-text-label">-</span>
            </div>
            <el-image class="img" :src="IMAGES.girl" fit="cover" />
          </div>
        </template>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { COVER_LIST, IMAGES } from '@/constant';
import { pageConfigStore } from '@/store';

const checkList = ref(COVER_LIST);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const isSelectedTwo = computed(() => checkList.value.filter((i) => i.checked).length > 1);

interface IProps {
  cardLayout: number;
  layout: number;
  layoutSet: number;
  checkedImgs: string[];
}

interface Emits {
  (e: 'update:checkedImgs', checkedImgs: string[]): void;
}

const props = withDefaults(defineProps<IProps>(), {
  checkedImgs: () => [],
});

const emit = defineEmits<Emits>();

// 选择卡片
const onSelectCard = () => {
  const checkedImgs = checkList.value.filter((i) => i.checked)?.map((j) => j.img);
  console.log(checkedImgs, 'checkedImgs');
  emit('update:checkedImgs', checkedImgs);
};

const fileList = ref<any[]>([
  {
    id: '1',
    name: '海岛.jpg',
    url: IMAGES.sea,
    checked: false,
  },
  {
    name: '少司命.jpg',
    id: '2',
    url: IMAGES.ssm,
    checked: false,
  },
  {
    name: '少司命.jpg',
    id: '3',
    url: IMAGES.ssm,
    checked: false,
  },
  {
    name: '少司命.jpg',
    id: '4',
    url: IMAGES.ssm,
    checked: false,
  },
  {
    name: '少司命.jpg',
    id: '5',
    url: IMAGES.ssm,
    checked: false,
  },
]);

// 保存设置
const onSave = () => {
  const { layout, layoutSet, cardLayout, checkedImgs } = props;
  if (!checkedImgs?.length || (checkedImgs?.length > 0 && checkedImgs?.length < 2)) {
    ElMessage.info('请同时选择两张封面图');
    return;
  }
  pageConfigStore.setPageConfig({
    layout,
    layoutSet,
    cardLayout,
    coverImgs: checkedImgs,
  });
};
</script>

<style scoped lang="less">
@import '@/styles/index.less';

.cover-set-wrap {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin-right: 2px;
  padding: 10px;
  border-radius: 5px;
  background-color: @fff;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 18px;
    padding: 10px;

    .info {
      font-size: 14px;
      color: @warning;
    }
  }

  .cover-set {
    .default-list {
      padding: 10px;
      font-size: 14px;
    }
    .type-1 {
      width: 25%;
      padding: 10px;
      display: inline-block;
      box-sizing: border-box;

      .card {
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 5px @border-color;
        border-radius: 5px;

        .checkbox {
          padding: 0 10px;
        }

        .img {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
    .custom-list {
      padding: 15px 10px 10px;
      font-size: 14px;
    }

    .el-upload {
      width: 25%;
      min-height: 150px;
      padding: 10px;
      display: inline-block;
      box-sizing: border-box;

      .card-upload {
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 5px @border-color;
        border-radius: 5px;

        .upload-text {
          position: relative;
          font-size: 14px;

          &::before {
            content: '点击上传图片';
            position: absolute;
            top: 7px;
            width: 100%;
            text-align: center;
            color: @primary;
          }

          .card-text-label {
            display: inline-block;
            height: 40px;
            line-height: 45px;
            color: transparent;
          }
        }

        .img {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;

          &::before {
            content: '+';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            text-align: center;
            font-size: 40px;
            color: @fff;
            background: rgba(0, 0, 0, 0.25);
          }
        }
      }
    }
  }
}
</style>
