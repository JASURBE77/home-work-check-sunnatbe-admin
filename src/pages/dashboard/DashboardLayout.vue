<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconGroup from '../../components/icons/line/IconGroup.vue';
import IconSetting from '../../components/icons/line/IconSetting.vue';
import UserInfoComponent from '../../components/UserInfoComponent.vue';
import useTheme from '../../store/theme.pinia';

const router = useRouter()
const route = useRoute()
const themeStore = useTheme()

const selectedKeys = ref(['1']);

watch(() => route.path, () => {
    if (route.name === 'Users') selectedKeys.value = ['1']
    else if (route.name === 'Setting') selectedKeys.value = ['2']
}, { immediate: true })
</script>

<template>
    <a-layout class="h-screen!">
        <a-layout-sider :width="250" :trigger="null">
            <h2 class="text-white text-3xl font-bold p-5 text-center">SUNNATBE</h2>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item @click="router.push({ name: 'Users' })" key="1">
                    <div class="flex items-center gap-2">
                        <icon-group class="w-4 h-4" />
                        <span>Foydalanuvchilar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push({ name: 'Setting' })" key="2">
                    <div class="flex items-center gap-2">
                        <icon-setting class="w-4 h-4" />
                        <span>Sozlamalar</span>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="p-0!" :class="themeStore.isDark ? '' : 'bg-white!'">
                <user-info-component />
            </a-layout-header>

            <a-layout-content :class="themeStore.isDark ? 'bg-black' : 'bg-white!'""
                :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }">
                <router-view />
            </a-layout-content>

        </a-layout>
    </a-layout>
</template>
<style>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>