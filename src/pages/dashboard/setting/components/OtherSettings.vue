<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const selectedLang = ref(localStorage.getItem("lang") || "uz")

// expose qilish
defineExpose({
  selectedLang
})
</script>

<template>
    <div class="flex justify-between items-center w-130">
        <span class="text-[17px]">{{ t("settings.changeLang") }}</span>
        <a-select v-model:value="selectedLang" size="middle" class="w-30">
            <a-select-option value="uz">O'zbekcha</a-select-option>
            <a-select-option value="ru">Русский</a-select-option>
            <a-select-option value="en">English</a-select-option>
        </a-select>
    </div>
</template>
