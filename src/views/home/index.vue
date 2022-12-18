<!--
 * new page
 * @author: dnhyxc
 * @since: 2022-12-18
 * index.vue
-->
<template>
  <el-config-provider :z-index="zIndex">
    <div>
      home
      <el-button type="success">Primary</el-button>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zIndex: 3000,
    }
  },
})
</script>

<style scoped lang="less">
</style>
