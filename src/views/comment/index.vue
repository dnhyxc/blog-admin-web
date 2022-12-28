<template>
  <div class="comment">
    <el-collapse v-model="activeNames" class="el-collapse" @change="handleChange">
      <div v-if="isMounted" class="tag-list">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <div
            v-infinite-scroll="load"
            class="list"
            :infinite-scroll-disabled="disabled"
            infinite-scroll-immediate
            infinite-scroll-distance="2"
          >
            <el-collapse-item v-for="(item, index) in count" :key="index" :name="index">
              <template #title>
                <div class="title">React + Webpack 项目搭建 + {{ item }}</div>
              </template>
              <div class="commentWrap">
                <div class="avatar">
                  <div class="img">
                    <el-avatar
                      class="avatar"
                      :size="50"
                      fit="fill"
                      src="https://picx.zhimg.com/80/v2-629539b263f448b62ef1e671f8ea06a4_720w.webp?source=1940ef5c"
                    />
                  </div>
                </div>
                <div class="commentContent">
                  <div class="commentMain">
                    <div class="userInfo">
                      <span class="name">dnhyxc</span>
                      <span class="date">2022-02-09 11:11</span>
                    </div>
                    <div class="desc">回复内容-content</div>
                  </div>
                  <div class="commentChild">
                    <div class="commentChildItem">
                      <div class="avatar">
                        <el-avatar
                          class="avatar"
                          :size="50"
                          fit="fill"
                          src="https://picx.zhimg.com/80/v2-629539b263f448b62ef1e671f8ea06a4_720w.webp?source=1940ef5c"
                        />
                      </div>
                      <div class="commentChildItemContent">
                        <div class="userInfo">
                          <span class="name" title="username-dnhyxc (作者) 回复 fromUsername-很爱很爱你">
                            <span>username-dnhyxc</span>
                            <span v-if="true" class="isAuthor">(作者)</span>
                            <span v-if="true" class="replyInfo">
                              <!-- <span class="isAuthor" v-if="j.userId === authorId">(作者)</span>
                      <span class="replyInfo" v-if="j.fromUsername"> -->
                              回复
                              <span class="fromUsername"> fromUsername-很爱很爱你 </span>
                            </span>
                          </span>
                          <span class="date">2022-09-02 12:09</span>
                        </div>
                        <div v-if="true" class="desc">我是 content</div>
                        <div v-if="true" class="formContent">“ 我是 formContent ”</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </div>
          <p v-if="loading" class="loading">Loading...</p>
          <p v-if="noMore" class="no-more">没有更多了～～～</p>
        </div>
      </div>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';

// 默认打开选项
const activeNames = ref();

const handleChange = (activeNames: string[]) => {
  console.log(activeNames, 'activeNames');
};

type loadType = boolean;

const count = ref<any>(20);
const loading = ref<loadType>(false);
const noMore = computed(() => count.value >= 50);
const disabled = computed(() => loading.value || noMore.value);
const isMounted = ref<boolean>(false);

onMounted(() => {
  isMounted.value = true;
});

const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 8;
    loading.value = false;
  }, 2000);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.comment {
  .layoutStyles();
  overflow: hidden;

  :deep(.el-collapse) {
    padding: 0 0 0 20px;
    background-color: @fff;
  }

  .tag-list {
    box-sizing: border-box;
    height: calc(100vh - 70px);

    .infinite-list-wrapper {
      height: 100%;

      .list {
        margin-right: 12px;

        .title {
          font-size: 18px;
        }

        .commentWrap {
          display: flex;
          justify-content: space-between;
          padding-top: 30px;

          .avatar {
            margin-right: 10px;

            .image {
              width: 50px;
              height: 50px;
              border-radius: 50px;
            }
          }

          .commentContent {
            flex: 1;

            .userInfo {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;

              .name {
                flex: 1;
                font-size: 16px;
                font-weight: 600;
                cursor: default;

                .ellipsisMore(1);

                .isAuthor {
                  margin-left: 10px;
                  font-weight: 400;
                  font-size: 14px;
                }

                .replyInfo {
                  font-weight: 400;
                  font-size: 14px;
                  margin-left: 10px;

                  .fromUsername {
                    font-size: 16px;
                    margin-left: 10px;
                    font-weight: 600;
                  }
                }
              }

              .date {
                margin-left: 10px;
                min-width: 105px;
                color: @000;
              }
            }

            .formContent {
              margin-top: 10px;
              border: 1px solid @info-light-7;
              padding: 5px 20px 6px 20px;
              background-color: @bg-color-page;
              border-radius: 5px;
            }

            .commentChild {
              background-color: @bg-color-light;
              margin-top: 15px;
              padding: 15px;
              border-radius: 5px;

              .commentChildItem {
                display: flex;
                margin-bottom: 20px;

                .commentChildItemContent {
                  width: 100%;
                }

                .avatar {
                  width: 35px;
                  height: 35px;

                  .image {
                    width: 35px;
                    height: 35px;
                  }
                }

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }

    .loading,
    .no-more {
      text-align: center;
    }
  }
}
</style>
