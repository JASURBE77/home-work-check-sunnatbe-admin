<script setup>
import { onMounted } from 'vue';
import useTheme from './store/theme.pinia';

const themeStore = useTheme()

onMounted(() => {
  themeStore.setTheme()
})
</script>

<template>
  <a-config-provider :theme="themeStore.themeConfig">
    <router-view />
  </a-config-provider>
</template>