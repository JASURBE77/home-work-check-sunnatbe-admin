<script setup>
import { useRouter } from 'vue-router';
import useUser from '../store/user.store';
import IconUser from './icons/line/IconUser.vue';
import SwitchComponent from './SwitchComponent.vue';
import { useI18n } from 'vue-i18n';

const router = useRouter()
const userStore = useUser()
const { t } = useI18n()

function leave() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router.push({ name: 'Login' })
}
</script>

<template>
    <div class="flex justify-end items-center mt-3 mr-8">
        <switch-component />
        <div class="flex items-center justify-end gap-3 cursor-pointer">
            <a-dropdown trigger="hover">
                <div class="flex items-center gap-2">
                    <div class="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 text-white">
                        <icon-user class="w-6 h-6" />
                    </div>
                </div>

                <template #overlay>
                    <a-menu class="w-45!">
                        <a-menu-item>
                            <span class="text-[16px] font-semibold mb-6! p-0!">{{ userStore.user.name }} {{
                                userStore.user.surname
                                }}</span>
                        </a-menu-item>
                        <a-popconfirm @confirm="leave" :ok-text="t('YES')" :cancel-text="t('NO')" :title="t('DO_EXIT')">
                            <a-menu-item key="1">
                                <span class="text-red-500">{{ t("EXIT") }}</span>
                            </a-menu-item>
                        </a-popconfirm>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>
</template>