<script setup>
import { onMounted } from 'vue';
import useTheme from './store/theme.pinia';
import useUser from './store/user.store';

const themeStore = useTheme()
const userStore = useUser()

onMounted(() => {
  themeStore.setTheme()
  userStore.me()
})
</script>

<template>
  <a-config-provider :theme="themeStore.themeConfig">
    <router-view />
  </a-config-provider>
</template>