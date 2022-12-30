<template>
  <div class="tag-list-wrap">
    <el-tabs type="border-card">
      <el-tab-pane v-for="data in tabList" :key="data.tabName" :label="data.tabName">
        <div v-if="isMounted" class="tag-list">
          <div class="infinite-list-wrapper" style="overflow: auto">
            <div
              v-infinite-scroll="load"
              class="list"
              :infinite-scroll-disabled="disabled"
              infinite-scroll-immediate
              infinite-scroll-distance="2"
            >
              <div v-for="(item, index) in data.dataSoure" :key="index" class="card-wrap">
                <Card class="card">
                  <template #img>
                    <div class="img">
                      <el-avatar class="avatar" :size="50" fit="fill" :src="IMAGES.qd" />
                    </div>
                  </template>
                  <template #title>
                    <div class="title">React{{ item }}</div>
                  </template>
                  <template #content>
                    <div class="desc">29 添加 &nbsp; 200 文章</div>
                  </template>
                  <template #footer>
                    <div class="action">
                      <el-button type="primary" class="add-btn">添加标签</el-button>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
            <p v-if="loading" class="loading">Loading...</p>
            <p v-if="noMore" class="no-more">没有更多了～～～</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import Card from '@/components/Card/index.vue';
import { IMAGES } from '@/constant';

type countType = number;
type loadType = boolean;

const count = ref<countType>(20);
const loading = ref<loadType>(false);
const noMore = computed(() => count.value >= 50);
const disabled = computed(() => loading.value || noMore.value);
const isMounted = ref<boolean>(false);
const tabList = computed(() => {
  return [
    {
      tabName: '已添加标签',
      dataSoure: count.value,
    },
    {
      tabName: '全部标签',
      dataSoure: count.value,
    },
  ];
});

onMounted(() => {
  isMounted.value = true;
});

const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 6;
    loading.value = false;
  }, 2000);
};
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.tag-list-wrap {
  .layoutStyles();

  :deep(.el-tabs__content) {
    padding: 10px 0 15px 15px;
  }
  :deep(.el-tabs) {
    height: calc(100% - 2px);
  }

  .tag-list {
    box-sizing: border-box;
    height: calc(100vh - 141px);

    .infinite-list-wrapper {
      height: 100%;
      padding: 10px 20px 0 20px;

      .list {
        margin: auto;
        width: auto;
        max-width: 960px;

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
            height: 218px;
            margin-bottom: 15px;

            .img {
              width: 50px;
              height: 50px;
              line-height: 50px;
              border-radius: 50px;
              text-align: center;
              margin-bottom: 18px;
            }

            .title {
              margin-bottom: 5px;
              font-size: 18px;
              font-weight: 700;
            }

            .desc {
              font-size: 13px;
            }

            .action {
              padding: 12px 25% 0;
              text-align: center;

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
      margin: 10px;
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
