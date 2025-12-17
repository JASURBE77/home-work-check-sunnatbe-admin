<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconGroup from '../../components/icons/line/IconGroup.vue';
import IconTasks from '../../components/icons/line/IconTasks.vue';

const router = useRouter()
const route = useRoute()

const selectedKeys = ref(['1']);

onMounted(() => {
    if (route.name === 'Groups') selectedKeys.value = ['1']
    else selectedKeys.value = ['2']
})
</script>

<template>
    <a-layout class="h-screen!">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <h2 class="text-white text-3xl font-bold p-5">SUNNATBE</h2>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item @click="router.push({ name: 'Groups' })" key="1">
                    <div class="flex items-center gap-2">
                        <icon-group class="w-4 h-4" />
                        <span>Guruhlar</span>
                    </div>
                </a-menu-item>
                <a-menu-item @click="router.push({ name: 'Tasks' })" key="2">
                    <div class="flex items-center gap-2">
                        <icon-tasks class="w-4 h-4" />
                        <span>Vazifalar</span>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <div class="flex items-center justify-end mr-4 gap-3 mt-3">
                    <a-avatar :size="32">
                        S
                    </a-avatar>
                    <span class="text-2xl font-semibold m-0! p-0!">Sunnatbe</span>
                </div>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
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