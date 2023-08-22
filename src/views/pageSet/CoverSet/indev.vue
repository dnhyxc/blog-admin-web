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
      <el-upload :show-file-list="false" :before-upload="beforeUpload" :http-request="onUpload" class="el-upload">
        <template #trigger>
          <div class="card-upload">
            <div class="upload-text">
              <span class="card-text-label">-</span>
            </div>
            <el-image class="img" :src="IMAGES.ssm" fit="cover" />
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
import type { UploadProps } from 'element-plus';
import { COVER_LIST, IMAGES, WEB_MAIN_URL, FILE_UPLOAD_MSG, FILE_TYPE } from '@/constant';
import { pageConfigStore, uploadStore } from '@/store';

const checkList = ref(COVER_LIST);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

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

const isSelectedTwo = computed(() => checkList.value.filter((i) => i.checked).length > 1);

interface IProps {
  cardLayout: number;
  layout: number;
  layoutSet: number;
  checkedImgs: string[];
}

interface Emits {
  (e: 'update:checkedImgs', checkedImgs: string[]): void;
  (e: 'update:filePath', filePath: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  checkedImgs: () => [],
});

const emit = defineEmits<Emits>();

// 上传校验
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!FILE_TYPE.includes(rawFile.type)) {
    ElMessage.error(FILE_UPLOAD_MSG);
    return false;
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('图片不能超过20M');
    return false;
  }
  return true;
};

// 自定义上传
const onUpload = async (event: { file: Blob }) => {
  // 不需要进行裁剪
  const res = await uploadStore.uploadFile(event.file as File);
  console.log(res, 'res');

  if (res) {
    const { name, size, type } = res.compressFile;
    console.log(name, size, type, 'name, size, type');
    // 更换域名
    const url = res?.filePath.replace(location.origin, WEB_MAIN_URL);
    pageConfigStore.addThemes({
      name,
      url,
      size,
      type,
    });
    // // 更新父组件传递过来的filePath
    // fileList.value = [
    //   ...fileList.value,
    //   {
    //     id: fileList.value.length,
    //     name: '海岛.jpg',
    //     url,
    //     checked: false,
    //   },
    // ];
  }
};

// 选择卡片
const onSelectCard = () => {
  const checkedImgs = checkList.value.filter((i) => i.checked)?.map((j) => j.img);
  emit('update:checkedImgs', checkedImgs);
};

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
        border: 1px dashed @primary;

        &:hover {
          border: 1px dashed @primary-light-3;

          .upload-text {
            &::before {
              color: @primary-light-3;
            }
          }

          .img {
            &::before {
              color: @primary-light-3;
            }
          }
        }

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
          display: block;

          &::before {
            content: '+';
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 40px;
            color: @primary;
            background: rgba(225, 225, 225, 0.25);
          }
        }
      }
    }
  }
}
</style>
