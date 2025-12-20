<script setup>
import { useRouter } from 'vue-router';
import IconSearch from '../../../../components/icons/line/IconSearch.vue';
import IconBack from '../../../../components/icons/line/IconBack.vue';

const router = useRouter()
</script>

<template>
    <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
            <a-button size="large" class="btn rounded-full!" @click="router.push({ name: 'Users' })">
                <template #icon>
                    <icon-back class="w-6 h-6" />
                </template>
            </a-button>
            <h2 class="text-3xl font-bold p-0! mb-1!">O'quvchi vazifalari</h2>
        </div>
        <div>
            <a-input size="large" placeholder="Qidirish...">
                <template #addonAfter>
                    <icon-search class="w-5 h-5 text-gray-500" />
                </template>
            </a-input>
        </div>
    </div>
</template>