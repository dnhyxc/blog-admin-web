<template>
  <div class="comment">
    <el-collapse v-model="activeNames" class="el-collapse" @change="handleChange">
      <el-collapse-item name="111">
        <template #title>
          <div class="title">React + Webpack 项目搭建</div>
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
                    <span class="name">
                      <span>username-dnhyxc</span>
                      <span class="isAuthor" v-if="true">(作者)</span>
                      <span class="replyInfo" v-if="true">
                        <!-- <span class="isAuthor" v-if="j.userId === authorId">(作者)</span>
                      <span class="replyInfo" v-if="j.fromUsername"> -->
                        回复
                        <span class="fromUsername"> fromUsername-很爱很爱你 </span>
                      </span>
                    </span>
                    <span class="date">2022-09-02 12:09</span>
                  </div>
                  <div class="desc" v-if="true">我是 content</div>
                  <div class="formContent" v-if="true">“ 我是 formContent ”</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="222">
        <template #title>
          <div class="title">Vue3 + vite 项目搭建</div>
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
                    :size="32"
                    fit="fill"
                    src="https://picx.zhimg.com/80/v2-629539b263f448b62ef1e671f8ea06a4_720w.webp?source=1940ef5c"
                  />
                </div>
                <div class="commentChildItemContent">
                  <div class="userInfo">
                    <span class="name">
                      <span>username-dnhyxc</span>
                      <span class="isAuthor" v-if="true">(作者)</span>
                      <span class="replyInfo" v-if="true">
                        <!-- <span class="isAuthor" v-if="j.userId === authorId">(作者)</span>
                      <span class="replyInfo" v-if="j.fromUsername"> -->
                        回复
                        <span class="fromUsername"> fromUsername-很爱很爱你 </span>
                      </span>
                    </span>
                    <span class="date">2022-09-02 12:09</span>
                  </div>
                  <div class="desc" v-if="true">我是 content</div>
                  <div class="formContent" v-if="true">“ 我是 formContent ”</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="333">
        <template #title>
          <div class="title">前后端项目分离部署</div>
        </template>
        <div>
          Simplify the process: keep operating process simple and intuitive; Easy to identify: the interface should be
          straightforward, which helps the users to identify and frees them from memorizing and recalling.Definite and
          clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;
        </div>
      </el-collapse-item>
      <el-collapse-item name="444">
        <template #title>
          <div class="title">Controllability</div>
        </template>
        <div>
          Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
        </div>
      </el-collapse-item>
      <el-collapse-item name="555">
        <template #title>
          <div class="title">babel</div>
        </template>
        <div>
          Decision making: giving advices about operations is acceptable, but do not make decisions for the users;
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 默认打开选项
const activeNames = ref(['111', '222', '333', '444', '555']);

const handleChange = (activeNames: string[]) => {
  console.log(activeNames, 'activeNames');
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.comment {
  .layoutStyles();

  :deep(.el-collapse) {
    padding: 0 20px;
    background-color: @fff;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
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
          font-size: 16px;
          font-weight: 600;

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
</style>
