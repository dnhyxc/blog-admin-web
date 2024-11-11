<!--
 * 基本信息
 * @author: dnhyxc
 * @since: 2024-08-15
 * index.vue
-->
<template>
  <div
    id="__BASE_INFO__"
    :class="`describe ${resumeStore.customStyles.type === 'doubleColumn' ? 'describe-between' : ''}`"
    :style="describeStyle"
    @click="onClickOption('baseInfo')"
  >
    <div v-if="resumeStore.customStyles.type === 'speciality'" :style="specialityBgStyle" />
    <div :class="`${classNames.baseInfo} ${resumeStore.customStyles.type ? 'base-info-between' : ''}`">
      <div
        v-if="route.query.preview || resumeStore.getBaseInfo[0].value"
        :class="`__avatar__ ${resumeStore.customStyles.type === 'doubleColumn' ? '__avatar_between__' : ''} ${
          classNames.avatarTile || ''
        } ${route.query.preview ? 'preview-avatar' : ''}`"
      >
        <Image
          :url="route.query.preview ? AVATAR : resumeStore.getBaseInfo[0].value"
          :class="`__avatar-img__ ${classNames.avatarImgTile || ''}`"
          radius="3px"
          :height="route.query.preview ? '103px' : 'auto'"
        />
      </div>
      <div :class="classNames.userDesc" :style="userDescStyle">
        <div class="__username__" :style="usernameStyle">{{ resumeStore.getBaseInfo[1].value }}</div>
        <div :class="classNames.descInfo">
          <div :class="classNames.descList">
            <div
              v-for="(item, key) in resumeStore.getBaseInfo.slice(2)"
              :key="key"
              :class="`__desc-item__ ${classNames.descItemTile}`"
            >
              <span v-if="resumeStore.customStyles.baseViewType === '文字'" :class="classNames.descValue">
                {{ item.key }}：
                <span
                  :id="LINKS.includes(item.key) ? '__link__' : ''"
                  :style="LINKS.includes(item.key) ? linkStyle : ''"
                  @click="() => onOpen(item.value)"
                >
                  {{ item.value }}
                </span>
              </span>
              <i
                v-if="resumeStore.customStyles.baseViewType === '图标'"
                :class="`__icon__ iconfont ${item.icon}`"
                :style="`font-size: ${resumeStore.customStyles.fontSize}px`"
              >
                <span
                  v-if="resumeStore.customStyles.type === 'doubleColumn'"
                  :id="LINKS.includes(item.key) ? '__link__' : ''"
                  class="__icon-value__"
                  :style="LINKS.includes(item.key) ? linkStyle : ''"
                  @click="() => onOpen(item.value)"
                >
                  {{ item.value }}
                </span>
              </i>
              <span
                v-if="SHOW_TEXT_TYPES.includes(resumeStore.customStyles.baseViewType as string)"
                :id="LINKS.includes(item.key) ? '__link__' : ''"
                :style="LINKS.includes(item.key) ? linkStyle : ''"
                @click="() => onOpen(item.value)"
              >
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { resumeStore } from '@/store';
import { AVATAR } from '@/constant';

const route = useRoute();

interface IProps {
  onClickOption: (option: string) => void;
}

const props = defineProps<IProps>();

const onClickOption = (option: string) => {
  props.onClickOption(option);
};

const LINKS = ['个人网站', 'github'];

const SHOW_TEXT_TYPES = computed(() => {
  if (resumeStore.customStyles.type === 'doubleColumn') {
    return ['纯内容'];
  } else {
    return ['纯内容', '图标'];
  }
});

const classNames = computed(() => {
  switch (resumeStore.customStyles.baseLayoutType) {
    case '居中':
      return {
        baseInfo: 'base-info-center',
        userDesc: 'user-desc-center',
        descInfo: 'desc-info-center',
        descList: 'desc-list-center',
        descItemTile: 'desc-item-center',
        descValue: 'desc-value-center',
      };
    case '居右':
      return {
        baseInfo: 'base-info-right',
        userDesc: 'user-desc-right',
        descInfo: 'desc-info-right',
        descList: 'desc-list-right',
        avatarTile: 'avatar-right',
        descItemTile: 'desc-item-right',
        descValue: 'desc-value-right',
      };
    case '平铺':
      return {
        baseInfo: 'base-info-tile',
        userDesc: 'user-desc-tile',
        descInfo: 'desc-info-tile',
        descList: 'desc-list-tile',
        avatarTile: 'avatar-tile',
        avatarImgTile: 'avatar-img-tile',
        descItemTile: 'desc-item-tile',
        descValue: 'desc-value-tile',
      };
    default:
      return {
        baseInfo: 'base-info-left',
        userDesc: 'user-desc-left',
        descInfo: 'desc-info-left',
        descList: 'desc-list-left',
        descValue: 'desc-value-left',
      };
  }
});

const linkStyle = computed(() => {
  const style = `
    position: relative;
    color: ${resumeStore.customStyles.linkColor};
    cursor: pointer;
    z-index: 1;
  `;
  return style;
});

const describeStyle = computed(() => {
  const style = `
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    color: ${resumeStore.customStyles.sidebarTextColor};
  `;

  return resumeStore.customStyles.type === 'speciality' ? style : '';
});

const specialityBgStyle = computed(() => {
  const style = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${resumeStore.customStyles.sidebarBgColor};
    opacity: 0.15;
    z-index: 0;
  `;

  return style;
});

const usernameStyle = computed(() => {
  const style = `
    font-size: ${(resumeStore.customStyles.fontSize as number) + 10}px;
  `;
  return style;
});

const userDescStyle = computed(() => {
  const style = `
    font-size: ${resumeStore.customStyles.fontSize}px;
  `;
  return style;
});

const onOpen = (url: string) => {
  window.open(url, '_self');
};
</script>

<style>
.__avatar__ {
  position: relative;
  display: flex;
  align-items: flex-start;
  object-fit: cover;
  width: 80px;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
  z-index: 1;
}

.__avatar-img__ {
  width: 100%;
  height: auto;
  border-radius: 3px;
}

.__username__ {
  font-weight: 700;
  margin-bottom: 10px;
}

.__desc-item__ {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.__icon__ {
  margin-right: 5px;
}

/* 平铺 */
.base-info-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-desc-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.desc-list-tile {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.desc-info-tile {
  width: 100%;
}

.desc-item-center,
.desc-item-tile {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 10px;
  margin-right: 0;
}

.desc-item-right {
  display: flex;
  align-items: center;
  margin-right: 0;
  margin-left: 20px;
}

.avatar-right,
.avatar-tile {
  width: 80px;
  height: auto;
  border-radius: 100%;
  margin-bottom: 10px;
  margin-left: 0;
}

.avatar-img-tile {
  width: 100%;
  height: auto;
  border-radius: 100%;
}

/* 居左 */
.base-info-left {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
}

.user-desc-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.desc-info-left {
  flex: 0.9;
  display: flex;
  flex-wrap: wrap;
}

.desc-list-left {
  display: flex;
  flex-wrap: wrap;
}

/* 居中 */
.base-info-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
}

.user-desc-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.desc-info-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.desc-list-center {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* 居右 */
.base-info-right {
  display: flex;
  justify-content: space-between;
}

.user-desc-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.desc-info-right {
  flex: 0.9;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.desc-list-right {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>

<style scoped lang="less">
@import '@/styles/index.less';

.preview-avatar {
  border-radius: 5px;
  width: 80px;
  height: auto;
  min-height: 103px;
}

/* 两栏布局 */
.describe-between {
  .__avatar__ {
    margin-left: 0;
  }

  .base-info-between {
    flex-direction: column;
  }

  .base-info-right {
    align-items: flex-end;
  }

  .__icon-value__ {
    margin-left: 5px;
  }

  .desc-value-left {
    text-align: left;
    word-break: break-all;
  }

  .desc-value-center {
    text-align: center;
    word-break: break-all;
  }

  .desc-value-right {
    text-align: right;
    word-break: break-all;
  }

  .desc-value-tile {
    text-align: center;
    word-break: break-all;
  }

  .desc-item-center,
  .desc-item-tile {
    padding: 0;
  }

  .__desc-item__ {
    word-break: break-all;
    margin-right: 0;
  }
}

#__link__ {
  &:hover {
    color: rgb(32, 163, 215) !important;
  }
}
</style>
