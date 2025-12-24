<script setup>
import { ref } from 'vue';
import LoginFormComponent from './components/LoginFormComponent.vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()

const languageValue = ref(localStorage.getItem("lang") || 'uz')

const languageOptions = ref([
    { label: 'UZ', value: 'uz' },
    { label: 'RU', value: 'ru' },
    { label: 'EN', value: 'en' }
])

function changeLang(value) {
    localStorage.setItem("lang", value)
    locale.value = value
}
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="flex justify-between items-center shadow-md rounded-[30px]! relative">
            <img class="hidden md:block rounded-tl-[30px]! rounded-bl-[30px]!" width="500" height="600"
                src="../../assets/images/login.png" alt="login-img">
            <div class="p-14! md:px-35">
                <h2 class="font-bold text-4xl mb-4">{{ t("Login.login") }}</h2>
                <login-form-component />
            </div>

            <a-select 
                class="absolute! top-4! right-2!" 
                v-model:value="languageValue" 
                :options="languageOptions" 
                @change="changeLang"
            />
        </div>
    </div>
</template>