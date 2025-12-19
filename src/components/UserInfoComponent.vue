<script setup>
import { useRouter } from 'vue-router';
import useUser from '../store/user.store';
import IconUser from './icons/line/IconUser.vue';

const router = useRouter()
const userStore = useUser()

function leave() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router.push({ name: 'Login' })
}
</script>

<template>
    <div class="flex items-center justify-end mr-8 gap-3 mt-3 cursor-pointer">
        <a-dropdown trigger="hover">
            <div class="flex items-center gap-2">
                <div class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 text-white">
                    <icon-user class="w-6 h-6" />
                </div>
            </div>

            <template #overlay>
                <a-menu class="w-40!">
                    <a-menu-item>
                        <span class="text-[18px] font-semibold mb-6! p-0!">{{ userStore.user.name }} {{
                            userStore.user.surname
                            }}</span>
                    </a-menu-item>
                    <a-popconfirm @confirm="leave" ok-text="Ha" cancel-text="Yo'q" title="Chiqishni hohlaysizmi ?">
                        <a-menu-item key="1">
                            <span class="text-red-500">Chiqish</span>
                        </a-menu-item>
                    </a-popconfirm>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>