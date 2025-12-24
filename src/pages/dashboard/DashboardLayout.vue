<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconGroup from '../../components/icons/line/IconGroup.vue';
import IconSetting from '../../components/icons/line/IconSetting.vue';
import UserInfoComponent from '../../components/UserInfoComponent.vue';
import useTheme from '../../store/theme.pinia';
import { useI18n } from 'vue-i18n';
import useUser from '../../store/user.store';

const router = useRouter()
const route = useRoute()
const themeStore = useTheme()
const userStore = useUser()
const { t } = useI18n()

const selectedKeys = ref(['1']);

onMounted(() => {
    userStore.me()
})

watch(() => route.path, () => {
    if (route.name === 'Users') selectedKeys.value = ['1']
    else if (route.name === 'Setting') selectedKeys.value = ['2']
}, { immediate: true })
</script>

<template>
    <a-layout class="h-screen!">
        <a-layout-sider class="hidden! md:block!" :width="250" :trigger="null">
            <h2 class="text-white text-3xl font-bold p-5 text-center">SUNNATBE</h2>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item @click="router.push({ name: 'Users' })" key="1">
                    <div class="flex items-center gap-2">
                        <icon-group class="w-4 h-4" />
                        <span>{{ t("Users.users") }}</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push({ name: 'Setting' })" key="2">
                    <div class="flex items-center gap-2">
                        <icon-setting class="w-4 h-4" />
                        <span>{{ t("settings.settings") }}</span>
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
                <div :class="route.name !== 'Setting' ? 'table-wrapper' : ''">
                    <router-view />
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<style>
.table-wrapper {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 150px);
    padding-right: 20px;
}

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