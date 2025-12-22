<script setup>
import SettingsForm from './components/SettingsForm.vue';
import IconSave from '../../../components/icons/line/IconSave.vue';
import IconClose from '../../../components/icons/line/IconClose.vue';
import OtherSettings from './components/OtherSettings.vue';
import useUser from '../../../store/user.store';
import useTheme from '../../../store/theme.pinia';

const userStore = useUser()
const themeStore = useTheme()

function finishSetting() {
    themeStore.isDark = !themeStore.isDark
    userStore.updateMe()
    themeStore.setTheme()
}
</script>

<template>
    <h2 class="font-bold! text-[28px] mb-4">Profil sozlamalari</h2>
    <div class="flex justify-center w-full">
        <settings-form class="w-130" />
    </div>

    <h2 class="font-bold! text-[28px] mt-4 mb-4">Boshqa sozlamalar</h2>
    <div class="flex justify-center w-full">
        <other-settings />
    </div>

    <div class="relative -bottom-35 right-2 flex justify-end items-center gap-2">
        <a-button @click="$router.go(-1)" class="btn" danger size="large">
            <template #icon>
                <icon-close class="w-5 h-5" />
            </template>
            Bekor qilish
        </a-button>

        <a-button :loading="userStore.buttonLoading" @click="finishSetting" class="btn w-30!" type="primary" size="large">
            <template #icon>
                <icon-save class="w-5 h-5" />
                Saqlash
            </template>
        </a-button>
    </div>
</template>