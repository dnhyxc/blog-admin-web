<!--
 * 简历设置
 * @author: dnhyxc
 * @since: 2024-08-24
 * index.vue
-->
<template>
  <div class="setting-wrap">
    <div class="left">
      <div class="font-size">
        <div class="label-btn">
          <el-popover placement="bottom-end" :width="300" size="small" trigger="hover" popper-class="msg-popover">
            <template #reference>
              <el-button type="info" link class="info-btn">添加模块</el-button>
            </template>
            <div class="pop-content">
              <div v-for="item in moduleList" :key="item.key" class="module-item" @click="addModule(item)">
                <div class="module-item-title">
                  <i :class="`icon iconfont ${item.icon}`" />
                  <span>{{ item.title }}</span>
                </div>
                <div class="module-item-desc">{{ item.desc }}</div>
              </div>
            </div>
          </el-popover>
        </div>
        <div class="label-btn">
          <el-popover placement="bottom-start" :width="280" size="small" trigger="hover" popper-class="msg-popover">
            <template #reference>
              <el-button type="info" link class="info-btn">基础布局</el-button>
            </template>
            <div class="pop-content">
              <div class="base-item">
                <span class="label-base">布局方式</span>
                <el-radio-group v-model="resumeStore.customStyles.baseLayoutType" size="small">
                  <el-radio-button
                    v-for="item in ['居左', '居中', '居右', '平铺']"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-radio-group>
              </div>
              <div class="base-item">
                <span class="label-base">展示方式</span>
                <el-radio-group v-model="resumeStore.customStyles.baseViewType" size="small">
                  <el-radio-button v-for="item in ['文字', '图标', '纯内容']" :key="item" :label="item" :value="item" />
                </el-radio-group>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="font-size">
        <span class="label">字号</span>
        <el-select
          v-model="resumeStore.customStyles.fontSize"
          placeholder="字号"
          size="small"
          style="width: 70px"
          popper-class="custom-dropdown-styles"
        >
          <el-option
            v-for="item in FONTSIZES"
            :key="item.value"
            placement="bottom"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="font-size">
        <span class="label">行距</span>
        <el-select
          v-model="resumeStore.customStyles.lineHeight"
          placeholder="行距"
          size="small"
          style="width: 70px"
          popper-class="custom-dropdown-styles"
        >
          <el-option
            v-for="item in LINEHEIGHTS"
            :key="item.value"
            placement="bottom"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="font-size">
        <div class="label-btn">
          <el-popover placement="bottom-end" :width="250" size="small" trigger="hover" popper-class="msg-popover">
            <template #reference>
              <el-button type="info" link class="info-btn">调整边距</el-button>
            </template>
            <div class="pop-content">
              <div class="slider-item">
                <span class="demonstration">标题下边距</span>
                <el-slider v-model="resumeStore.customStyles.titleMarginBottom" :min="-5" :max="50" />
              </div>
              <div class="slider-item">
                <span class="demonstration">模块下边距</span>
                <el-slider v-model="resumeStore.customStyles.moduleMarginBottom" :min="-5" :max="50" />
              </div>
              <div class="slider-item">
                <span class="demonstration">子标题下边距</span>
                <el-slider v-model="resumeStore.customStyles.childTitleMarginTop" :min="-5" :max="50" />
              </div>
              <div class="reset">
                <el-button type="primary" link @click="onResetMargin">重置</el-button>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
      <div class="font-size">
        <span class="label">主题色</span>
        <el-color-picker
          v-model="resumeStore.customStyles.theme"
          show-alpha
          :predefine="PREDEFINE_COLORS"
          popper-class="picker-popover"
        />
      </div>
      <div class="font-size">
        <span class="label">标题字体色</span>
        <el-color-picker
          v-model="resumeStore.customStyles.titleColor"
          show-alpha
          :predefine="TITLE_FONT_COLORS"
          popper-class="picker-popover"
        />
      </div>
      <div class="label-btn">
        <el-popover placement="bottom-end" :width="250" size="small" trigger="hover" popper-class="msg-popover">
          <template #reference>
            <el-button type="info" link class="info-btn">标题样式</el-button>
          </template>
          <div class="pop-content">
            <div
              v-for="item in TITLE_STYLES"
              :key="item"
              :class="`title-style-item ${item}-item ${
                resumeStore.customStyles.titleStyle === item ? 'active-title' : ''
              }`"
              @click="setTitleStyle(item)"
            >
              <div v-if="item === 'fill_trapezoid_underline'" :class="item">
                <div class="fill_trapezoid_underline-top">专业技能</div>
                <div class="fill_trapezoid_underline-bottom">
                  <span class="text">专业技能</span>
                </div>
                <div class="line"></div>
              </div>
              <div v-else :class="item">
                <i v-if="item === 'before_icon'" :class="`icon iconfont icon-jianliguanli1`">
                  <span class="icon-text">专业技能</span>
                </i>
                <span v-if="item !== 'before_icon'" class="title-name">专业技能</span>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="more">
      <el-popover placement="bottom-start" :width="165" size="small" trigger="click" popper-class="msg-popover">
        <template #reference>
          <i class="more-icon iconfont icon-gengduo3" />
        </template>
        <div class="pop-content">
          <div
            v-show="['doubleColumn', 'speciality'].includes(resumeStore.customStyles.type as string)"
            class="base-item colors-item"
          >
            <div class="label">
              {{ resumeStore.customStyles.type === 'doubleColumn' ? '左侧边栏' : '个人信息' }}背景颜色
            </div>
            <el-color-picker
              v-model="resumeStore.customStyles.sidebarBgColor"
              show-alpha
              :predefine="PREDEFINE_COLORS"
              popper-class="picker-popover"
              :teleported="false"
            />
          </div>
          <div
            v-show="['doubleColumn', 'speciality'].includes(resumeStore.customStyles.type as string)"
            class="base-item colors-item"
          >
            <div class="label">左侧边栏字体颜色</div>
            <el-color-picker
              v-model="resumeStore.customStyles.sidebarTextColor"
              show-alpha
              :predefine="PREDEFINE_COLORS"
              popper-class="picker-popover"
              :teleported="false"
            />
          </div>
          <div class="base-item colors-item">
            <div class="label">基本信息链接颜色</div>
            <el-color-picker
              v-model="resumeStore.customStyles.linkColor"
              show-alpha
              :predefine="PREDEFINE_COLORS"
              popper-class="picker-popover"
              :teleported="false"
            />
          </div>
        </div>
      </el-popover>
    </div>
    <div class="right">
      <div class="label-btn label-preview-btn">
        <el-button type="info" link class="info-btn" @click="onResrtSetting">重置样式</el-button>
      </div>
      <div v-if="!preview" class="label-btn">
        <el-button type="info" link class="info-btn" @click="() => onSaveResume()">
          {{ resumeId ? '更新简历' : '保存简历' }}
        </el-button>
      </div>
      <div v-if="!preview" class="label-btn">
        <el-button type="info" link class="info-btn" @click="download">下载简历</el-button>
      </div>
      <div v-if="preview" class="label-btn">
        <el-button type="info" link class="info-btn" @click="onUseTemplate">使用模版</el-button>
      </div>
      <div class="label-btn">
        <el-button type="info" link class="info-btn" @click="onPreview">
          {{ pdfUrl ? '重置预览' : '预览简历' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { FONTSIZES, LINEHEIGHTS, PREDEFINE_COLORS, TITLE_FONT_COLORS, RESUME_MODULES } from '@/constant';
import { resumeStore } from '@/store';

interface IProps {
  pdfUrl: string;
  onPreview: () => void;
  download: () => void;
  onSaveResume: () => void;
  resumeId: string;
  isChanged: boolean;
  preview?: string;
}

defineProps<IProps>();

const router = useRouter();

const route = useRoute();

const TITLE_STYLES = [
  'default',
  'left_border_underline',
  'fill_trapezoid_underline',
  'fill_triangle_underline',
  'before_icon',
  'fill_underline',
  'vertical_line',
  'underline',
];

const emit = defineEmits(['update:isChanged']);

const moduleList = computed(() => {
  return RESUME_MODULES.filter(
    (item) =>
      !resumeStore.elements
        .slice(1)
        .map((i) => i.key)
        .includes(item.key),
  );
});

let timer: ReturnType<typeof setTimeout> | null = null;

onUnmounted(() => {
  resumeStore.activeOption = '';
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
});

const onUseTemplate = () => {
  if (resumeStore.resumeCount < 15) {
    router.push(`/resume/make?type=${resumeStore.customStyles.type}`);
  } else {
    ElMessage({
      message: '简历数量不足，请先删除部分简历后再使用模版！',
      type: 'warning',
    });
  }
};

const setTitleStyle = (style: string) => {
  resumeStore.setCustomStyles({
    titleStyle: style,
    titleColor: ['underline', 'vertical_line', 'left_border_underline'].includes(style) ? '#1e90ff' : '#fff',
  });
  emit('update:isChanged', true);
};

const onResetMargin = () => {
  resumeStore.setCustomStyles({
    childTitleMarginTop: 4,
    titleMarginBottom: 10,
    moduleMarginBottom: 15,
  });
};

const onResrtSetting = () => {
  onResetMargin();
  resumeStore.setCustomStyles({
    fontSize: 14,
    lineHeight: 22,
    theme: '#1e90ff',
    titleColor: '#1e90ff',
    baseLayoutType: '居左',
    baseViewType: route.query.type === 'doubleColumn' ? '图标' : '文字',
    titleStyle: 'left_border_underline',
    sidebarBgColor: '#1e90ff',
    sidebarTextColor: '#fff',
    linkColor: '#fff',
  });
};

const addModule = (item: Partial<typeof resumeStore.elements[0]>) => {
  resumeStore.addCustomModule(item as typeof resumeStore.elements[0]);
};
</script>
<style scoped lang="less">
@import '@/styles/index.less';

.setting-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  line-height: 45px;
  min-height: 45px;
  padding: 0 10px;

  .left {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  .more {
    display: flex;
    align-items: center;

    .more-icon {
      font-size: 25px;
      cursor: pointer;
    }

    .icon {
      cursor: default;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  .label {
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 0 5px;
    border-radius: 5px 0 0 5px;
    box-shadow: 0 0 1.5px 0 @border inset;
    // background-color: var(--input-bg-color);
    transform: translateX(1px);
  }

  .label-btn {
    display: flex;
    align-items: center;
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    border-radius: 5px;
    margin-right: 7px;

    &:last-child {
      margin-right: 0;
    }

    &:active {
      box-shadow: 0 0 1.5px 0 @primary inset;
    }

    :deep {
      .el-button.is-link {
        padding: 0;
        font-size: 12px;
      }
    }
  }

  .label-preview-btn {
    margin-left: 5px;
  }

  .font-size {
    display: flex;
    align-items: center;
    margin-right: 7px;
    color: @font-1;
  }

  .info-btn {
    color: unset;

    &:hover {
      color: @primary;
    }
  }

  :deep {
    .el-input__wrapper {
      border-radius: 0 5px 5px 0;
    }

    .el-color-picker__trigger {
      width: 100%;
      border: none;
      padding: 0;
      height: 24px;
      width: 24px;
      border-radius: 0 5px 5px 0;
    }

    .el-color-picker__color {
      border: none;
      border-radius: 0 5px 5px 0;
    }

    .el-color-picker__color-inner {
      border-radius: 0 5px 5px 0;
    }

    .el-color-picker__icon {
      color: var(--border-color);
    }
  }
}

.pop-content {
  --default-color: #1e90ff;
  --default-light-color: #b8d7fb;

  position: relative;

  :deep {
    .el-color-picker__trigger {
      width: 112px;
    }
  }

  .base-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    text-shadow: none;

    &:last-child {
      margin-bottom: 0;
    }

    .label-base {
      margin-right: 10px;
    }

    .label {
      margin-bottom: 10px;
    }
  }

  .left_border_underline-item {
    .left_border_underline {
      position: relative;
      height: 36px;
      line-height: 36px;
      padding-left: 16px;
      background-color: var(--default-light-color);
      color: var(--default-color);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 100%;
        background-color: var(--default-color);
      }
    }
  }

  .fill_trapezoid_underline-item {
    .fill_trapezoid_underline {
      position: relative;
      height: 36px;
      line-height: 36px;

      .fill_trapezoid_underline-top {
        position: relative;
        display: inline-block;
        height: 0;
        border-right: 16px solid transparent;
        border-bottom: 36px solid var(--default-color);
        padding: 0 10px;
        z-index: 1;
      }

      .fill_trapezoid_underline-bottom {
        position: absolute;
        left: 32px;
        bottom: 0;
        display: inline-block;
        margin-left: 6px;
        height: 0;
        border-right: 14px solid transparent;
        border-bottom: 30px solid var(--default-light-color);
        z-index: 0;
      }

      .text {
        visibility: hidden;
      }

      .line {
        width: 100%;
        height: 0;
        border-bottom: 1px solid var(--default-light-color);
        margin-top: -1px;
      }
    }
  }

  .colors-item {
    flex-direction: column;
  }

  .slider-item {
    margin-bottom: 10px;
  }

  .reset {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
  }

  .module-item {
    box-shadow: 0 0 5px 0 #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    .clickNoSelectText();

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      box-shadow: 0 0 5px @primary;
    }

    &:active {
      box-shadow: 0 0 5px @primary;
    }

    .module-item-title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 14px;
      color: @font-1;

      .icon {
        font-size: 20px;
        margin-right: 5px;
        margin-left: -2px;
      }
    }

    .module-item-desc {
      font-size: 12px;
      color: var(--font-4);
    }
  }

  .title-style-item {
    box-shadow: 0 0 5px 0 #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    height: 36px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    text-shadow: none;
    .clickNoSelectText();

    .default {
      display: flex;
      align-items: center;
      background-color: #1e90ff;
      height: 100%;
      padding-left: 8px;
    }

    .before_icon {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      border-left: none;

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 1px);
        left: 0;
        width: 100%;
        height: 1px;
        background-color: var(--default-color);
      }

      .icon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        font-size: 18px;
        background-color: var(--default-color);
        margin-right: 8px;
        padding: 0 10px;
        z-index: 1;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 100%;
          width: 0;
          height: 0;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          border-left: 18px solid var(--default-color);
        }
      }

      .icon-text {
        position: relative;
        margin-left: 8px;
        z-index: 1;
      }
    }

    .fill_triangle_underline {
      display: flex;
      align-items: center;
      font-size: 18px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid var(--default-color);

      .title-name {
        position: relative;
        background-color: var(--default-color);
        padding: 5px 8px 6px;
        box-sizing: border-box;

        &::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 0;
          height: 0;
          border-left: 28px solid transparent;
          border-top: 10px solid var(--default-color);
        }
      }
    }

    .fill_underline {
      height: 100%;
      border-bottom: 1px solid var(--default-color);
      box-sizing: border-box;

      .title-name {
        display: inline-block;
        height: 100%;
        line-height: 35px;
        background-color: var(--default-color);
        padding: 0 8px;
      }
    }

    .vertical_line {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;
      color: var(--default-color);

      &::before {
        content: '';
        height: 100%;
        width: 8px;
        position: absolute;
        inset: 0;
        background-color: var(--default-color);
      }

      .title-name {
        padding-left: 15px;
      }
    }

    .underline {
      display: flex;
      align-items: center;
      height: 100%;
      border-bottom: 1px solid var(--default-color);
      box-sizing: border-box;
      color: var(--default-color);

      .title-name {
        height: 100%;
      }
    }
  }

  .fill_triangle_underline-item {
    padding-bottom: 18px;
  }

  .active-title {
    box-shadow: 0 0 5px 0 var(--default-color);
  }
}
</style>
