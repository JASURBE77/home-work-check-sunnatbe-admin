<script setup>
import { ref } from 'vue';
import LoginFormComponent from './components/LoginFormComponent.vue';

const languageValue = ref(localStorage.getItem("lang") || 'uz')

const languageOptions = ref([
    { label: 'UZ', value: 'uz' },
    { label: 'RU', value: 'ru' },
    { label: 'EN', value: 'en' }
])
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="flex justify-between items-center shadow-md rounded-[30px]! relative">
            <img class="rounded-tl-[30px]! rounded-bl-[30px]!" width="500" height="600"
                src="../../assets/images/login.png" alt="login-img">
            <div class="px-35">
                <h2 class="font-bold text-4xl mb-4">Tizimga kirish</h2>
                <login-form-component />
            </div>

            <a-select class="absolute! top-2! right-2!" v-model:value="languageValue" :options="languageOptions" />
        </div>
    </div>
</template>