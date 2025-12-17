<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="flex items-center justify-end mr-8 gap-3 mt-3 cursor-pointer">
        <a-dropdown trigger="hover">
            <div class="flex items-center gap-2">
                <a-avatar :size="32">
                    S
                </a-avatar>
                <span class="text-2xl font-semibold m-0! p-0!">Sunnatbe</span>
            </div>

            <template #overlay>
                <a-menu class="w-35!">
                    <a-menu-item @click="router.push({ name: 'Login' })" key="1">
                        <span class="text-red-500">Chiqish</span>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>