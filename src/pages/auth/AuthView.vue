<script setup>
import LoginFormComponent from './components/LoginFormComponent.vue';
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-100 shadow-md border border-gray-200 p-4 rounded-2xl">
            <div class="mb-4">
                <h2 class="font-bold text-3xl">Tizimga kirish</h2>
                <p class="mt-2 text-gray-500 text-[14px]">O'quvchilaringizni vazifalarini oson boshqaring</p>
            </div>
            <login-form-component />
        </div>
    </div>
</template>