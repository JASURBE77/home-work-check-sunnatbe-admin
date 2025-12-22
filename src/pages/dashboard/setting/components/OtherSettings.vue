<script setup>
import { ref } from 'vue';
import SwitchComponent from '../../../../components/SwitchComponent.vue';

const language = ref("uz")
</script>

<template>
    <div class="flex justify-center items-center flex-col gap-10">
        <!-- <div class="flex justify-between items-center w-130">
            <span class="text-[17px]">Sayt tili</span>
            <a-select v-model:value="language" size="small">
                <a-select-option value="uz">O'zbekcha</a-select-option>
                <a-select-option value="ru">Руский</a-select-option>
                <a-select-option value="en">English</a-select-option>
            </a-select>
        </div> -->

        Qilinmoqda...
    </div>
</template>