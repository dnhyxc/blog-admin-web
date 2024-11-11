<!--
 * title
 * @author: dnhyxc
 * @since: 2024-08-18
 * index.vue
-->
<template>
  <div class="title" :style="titleWrapStyle">
    <div v-if="resumeStore.customStyles.titleStyle === 'before_icon'" class="__icon_line__" :style="iconLineStyle" />
    <div class="left custom-title" :style="customTitleStyle">
      <div :class="className.parent">
        <div v-if="resumeStore.customStyles.titleStyle === 'left_border_underline'">
          <span class="__left_border_underline__" :style="leftLineStyle" />
          <div class="__left_border_underline_bg__" :style="leftLineStyle"></div>
          <span class="__left_border_underline_text__">{{ data.title }}</span>
        </div>
        <div
          v-if="resumeStore.customStyles.titleStyle === 'fill_trapezoid_underline'"
          class="fill_trapezoid_underline_wrap"
        >
          <div class="fill_trapezoid_underline-top" :style="trapezoidStyle.topStyle">{{ data.title }}</div>
          <div class="fill_trapezoid_underline-bottom" :style="trapezoidStyle.bottomStyle">
            <span class="fill_trapezoid_underline-bottom-text">{{ data.title }}</span>
          </div>
          <div class="fill_trapezoid_underline_wrap-line" :style="trapezoidStyle.lineStyle"></div>
        </div>
        <div v-if="resumeStore.customStyles.titleStyle === 'before_icon'" class="before_icon_icon_wrap">
          <span class="right_icon" :style="rightIconStyle" />
          <i
            :class="`icon iconfont ${MODULE_ICONS[data.key as keyof typeof MODULE_ICONS] || MODULE_ICONS.customModule}`"
            :style="iconStyle"
          >
            <span class="__icon_text__">{{ data.title }}</span>
          </i>
        </div>
        <span
          v-if="resumeStore.customStyles.titleStyle === 'vertical_line'"
          class="__left-line__"
          :style="leftLineStyle"
        />
        <span
          v-if="!['before_icon', 'fill_trapezoid_underline', 'left_border_underline'].includes(resumeStore.customStyles.titleStyle as string)"
          :class="className.child"
          :style="textStyle"
        >
          {{ data.title }}
        </span>
        <span
          v-if="resumeStore.customStyles.titleStyle === 'fill_triangle_underline'"
          class="after-line"
          :style="afterLineStyle"
        />
      </div>
    </div>
    <div v-if="data.key !== 'baseInfo' && !route.query.preview" class="right">
      <i v-if="!hideAdd" class="icon iconfont icon-add" @click.stop="onAdd" />
      <i v-if="index !== 1" class="icon iconfont icon-xs" @click.stop="onMoveUp" />
      <i
        v-if="index !== resumeStore.sortedElements.length - 1"
        class="icon iconfont icon-xx"
        @click.stop="onMoveDown"
      />
      <i class="icon iconfont icon-shanchu" @click.stop="onRemove" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { resumeStore } from '@/store';
import { lightenColor } from '@/utils';
import { MODULE_ICONS } from '@/constant';

interface IProps {
  index?: number;
  data: {
    key: string;
    title: string;
    element: Element;
    formItem: Element;
    sort: number;
  };
  hideAdd?: boolean;
}

const props = defineProps<IProps>();

const route = useRoute();

const className = computed(() => {
  switch (resumeStore.customStyles.titleStyle) {
    case 'before_icon':
      return {
        parent: 'before_icon-style',
        child: 'before_icon-text',
      };
    case 'vertical_line':
      return {
        parent: 'vertical_line-style',
        child: 'vertical_line-text',
      };
    case 'fill_trapezoid_underline':
      return {
        parent: 'fill_trapezoid_underline-style',
        child: 'fill_trapezoid_underline-text',
      };
    case 'left_border_underline':
      return {
        parent: 'left_border_underline-style',
        child: 'left_border_underline-text',
      };
    case 'fill_underline':
      return {
        parent: 'fill_underline-style',
        child: 'fill_underline-text',
      };
    case 'fill_triangle_underline':
      return {
        parent: 'fill_triangle_underline-style',
        child: 'fill_triangle_underline-text',
      };
    case 'underline':
      return {
        parent: 'underline-style',
        child: 'underline -text',
      };
    default:
      return {
        parent: 'default-style',
        child: 'default-text',
      };
  }
});

const trapezoidStyle = computed(() => {
  const topStyle = `
    border-bottom: 36px solid ${resumeStore.customStyles.theme};
  `;

  const bottomStyle = `
    border-bottom: 30px solid ${lightenColor(resumeStore.customStyles.theme as string)};
  `;

  const lineStyle = `
    border-bottom: 1px solid ${lightenColor(resumeStore.customStyles.theme as string)};
  `;

  return {
    topStyle,
    bottomStyle,
    lineStyle,
  };
});

const iconStyle = computed(() => {
  const style = `
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(resumeStore.customStyles.fontSize as number) + 4}px;
    height: 36px;
    max-height: 36px;
    padding: 3px 10px;
    box-sizing: border-box;
    background-color: ${resumeStore.customStyles.theme};
    color: ${resumeStore.customStyles.titleColor};
    margin-top: -1px;
  `;
  return style;
});

const iconLineStyle = computed(() => {
  const style = `
    background-color: ${resumeStore.customStyles.theme};
  `;
  return style;
});

const rightIconStyle = computed(() => {
  const style = `
    border-left: 18px solid ${resumeStore.customStyles.theme};
  `;
  return style;
});

const textStyle = computed(() => {
  const style = `
    display: inline-block;
    background-color: ${resumeStore.customStyles.theme};
    height: 100%;
  `;
  return ['fill_underline', 'fill_triangle_underline'].includes(resumeStore.customStyles.titleStyle as string)
    ? style
    : '';
});

const leftLineStyle = computed(() => {
  const style = `
    background-color: ${resumeStore.customStyles.theme};
  `;
  return style;
});

const afterLineStyle = computed(() => {
  const style = `
    border-color: transparent transparent ${resumeStore.customStyles.theme};
  `;
  return style;
});

const background = computed(() => {
  return {
    default: resumeStore.customStyles.theme,
    // left_border_underline: lightenColor(resumeStore.customStyles.theme as string),
  };
});

const titleWrapStyle = computed(() => {
  const additionalMargin = resumeStore.customStyles.titleStyle === 'fill_triangle_underline' ? 10 : 0;
  const borderStyle = ['underline', 'fill_underline', 'fill_triangle_underline', ''].includes(
    resumeStore.customStyles.titleStyle as string,
  )
    ? `1px solid ${resumeStore.customStyles.theme}`
    : 'unset';
  const backgroundColor =
    background.value[resumeStore.customStyles.titleStyle as keyof typeof background.value] || 'unset';

  return `
    position: relative;
    font-size: ${(resumeStore.customStyles.fontSize as number) + 4}px;
    font-weight: 700;
    margin-bottom: ${(resumeStore.customStyles.titleMarginBottom as number) + additionalMargin}px;
    line-height: 1.5;
    border-bottom: ${borderStyle};
    background: ${backgroundColor};
  `;
});

const customTitleStyle = computed(() => {
  const style = `
    color: ${
      ['before_icon', 'undeline'].includes(resumeStore.customStyles.titleStyle as string)
        ? 'unset'
        : resumeStore.customStyles.titleColor
    };
  `;
  return style;
});

const onAdd = () => {
  resumeStore.addModule(props.data.key);
};

const onMoveUp = () => {
  resumeStore.setSortFormItem(props.data, 'up', props.index!);
};

const onMoveDown = () => {
  resumeStore.setSortFormItem(props.data, 'down', props.index!);
};

const onRemove = () => {
  ElMessageBox.confirm('删除后该模块内容将不可恢复！', `确定删除${props.data.title}吗？`).then(() => {
    resumeStore.removeSort(props?.data?.key);
  });
};
</script>

<style>
.custom-title {
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.fill_triangle_underline-style {
  position: relative;
  display: flex;
  align-items: center;
  text-shadow: none;
  width: 100%;
  height: 100%;
}

.fill_triangle_underline-text {
  display: inline-block;
  height: 36px;
  line-height: 34px;
  padding: 0 8px 0;
  /* border-radius: 2px 2px 0 0; */
  padding-bottom: 0;
  box-sizing: border-box;
}

.after-line {
  position: absolute;
  bottom: -18px;
  left: 7px;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 0px 0px 25px 10px;
  transform: rotate(-90deg);
}

.default-style {
  height: 100%;
  min-height: 36px;
  line-height: 35px;
}

.default-text {
  height: 100%;
  display: inline-block;
  line-height: 34px;
  padding-left: 8px;
}

.__icon_line__ {
  position: absolute;
  top: calc(50% - 1px);
  left: 0;
  width: 100%;
  height: 1px;
  z-index: 0;
}

.before_icon_icon_wrap {
  position: relative;
  margin-right: 26px;
}

.right_icon {
  position: absolute;
  top: -1px;
  left: 100%;
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
}

.__icon_text__ {
  margin-left: 5px;
}

.before_icon-style {
  display: flex;
  align-items: center;
}

.before_icon-text {
  margin-bottom: 2px;
}

.fill_underline-style {
  height: 100%;
}

.fill_underline-text {
  padding: 0 8px;
  line-height: 34px;
  /* border-radius: 3px 3px 0 3px; */
}

.vertical_line-style {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
}

.fill_trapezoid_underline-style {
  display: flex;
  align-items: center;
  height: 36px;
  line-height: 36px;
}

.fill_trapezoid_underline_wrap {
  width: 100%;
  height: 100%;
}

.fill_trapezoid_underline-top {
  position: relative;
  display: inline-block;
  height: 0;
  border-right: 16px solid transparent;
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
  z-index: 0;
}

.fill_trapezoid_underline-bottom-text {
  visibility: hidden;
}

.fill_trapezoid_underline_wrap-line {
  width: 100%;
  height: 0;
  margin-top: -1px;
}

.left_border_underline-style {
  position: relative;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 18px;
  box-sizing: border-box;
}

.__left_border_underline__ {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
}

.__left_border_underline_text__ {
  position: relative;
  z-index: 99;
}

.__left_border_underline_bg__ {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.15;
}

.__left-line__ {
  position: absolute;
  inset: 0;
  width: 8px;
  height: 100%;
  /* border-radius: 2px; */
  margin-right: 10px;
}

.vertical_line-text {
  display: inline-block;
  height: 100%;
  line-height: 35px;
  padding: 0 15px;
}

.underline-text {
  padding-left: 0;
}
</style>

<style scoped lang="less">
@import '@/styles/index.less';

.title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5px;
    box-sizing: border-box;

    .icon {
      position: relative;
      margin: 0 0 0 10px;
      width: 22px;
      height: 22px;
      text-align: center;
      cursor: pointer;
      background-color: @primary;
      color: var(--font-1);
      border-radius: 5px;
      display: none;
      font-weight: 100;
      z-index: 1;

      &:hover {
        background-color: @primary-light-3;
      }
    }
  }
}
</style>
