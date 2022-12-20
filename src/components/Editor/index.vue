<template>
  <div class="container">
    <v-md-editor v-model="mackdown.text" height="400px"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

type mackdownType = {
  text: string;
};

const mackdown = reactive<mackdownType>({ text: 'text' });
</script>

<style lang="less" scoped></style>
