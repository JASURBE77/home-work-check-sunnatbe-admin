<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import useTheme from '../store/theme.pinia';

const open = defineModel("open", {
    type: Boolean,
    default: false
})

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const themeStore = useTheme()

const selectedKeys = ref(['1']);

watch(() => route.path, () => {
    if (route.name === 'Users') selectedKeys.value = ['1']
    else if (route.name === 'Setting') selectedKeys.value = ['2']

    open.value = false
}, { immediate: true })
</script>

<template>
    <a-drawer
        v-model:open="open"
        :width="300"
        placement="left"
        :class="themeStore.isDark ? 'bg-gray-900!' : 'bg-white!'"
    >
        <template #title>
            <h2 :class="themeStore.isDark ? 'text-white' : 'text-black'" class="text-3xl font-bold text-center">SUNNATBE</h2>
        </template>

        <a-menu class="bg-transparent!" v-model:selectedKeys="selectedKeys" >
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
    </a-drawer>
</template>