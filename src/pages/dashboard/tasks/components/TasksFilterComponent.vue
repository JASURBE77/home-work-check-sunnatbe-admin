<script setup>
import { useRouter } from 'vue-router';
import IconSearch from '../../../../components/icons/line/IconSearch.vue';
import IconBack from '../../../../components/icons/line/IconBack.vue';
import useTask from '../../../../store/task.store';

const router = useRouter()
const tasksStore = useTask()

function back() {
    tasksStore.$reset()
    router.push({ name: 'Users' })
}
</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
            <a-button size="large" class="btn rounded-full!" @click="back">
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