<script setup>
import SettingsForm from './components/SettingsForm.vue';
import IconSave from '../../../components/icons/line/IconSave.vue';
import IconClose from '../../../components/icons/line/IconClose.vue';
import OtherSettings from './components/OtherSettings.vue';
import useUser from '../../../store/user.store';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const userStore = useUser()
const { t, locale } = useI18n()

const otherSettingsRef = ref(null)

function finishSetting() {
    const lang = otherSettingsRef.value.selectedLang
    localStorage.setItem("lang", lang)
    locale.value = lang

    userStore.updateMe(t)
}
</script>

<template>
    <h2 class="font-bold! text-[28px] mb-4">{{ t("settings.profileSettings") }}</h2>
    <div class="flex justify-center w-full">
        <settings-form class="w-130" />
    </div>

    <h2 class="font-bold! text-[28px] mt-4 mb-4">{{ t("settings.otherSettings") }}</h2>
    <div class="flex justify-center w-full">
        <other-settings ref="otherSettingsRef" />
    </div>

    <div class="relative -bottom-35 right-2 flex justify-end items-center gap-2">
        <a-button @click="$router.go(-1)" class="btn" danger size="large">
            <template #icon>
                <icon-close class="w-5 h-5" />
            </template>
            {{ t("CANCEL") }}
        </a-button>

        <a-button :loading="userStore.buttonLoading" @click="finishSetting" class="btn w-30!" type="primary"
            size="large">
            <template #icon>
                <icon-save class="w-5 h-5" />
                {{ t("SAVE") }}
            </template>
        </a-button>
    </div>
</template>