<script setup>
import { useRoute, useRouter } from 'vue-router';
import IconBack from '../../../../components/icons/line/IconBack.vue';
import useTask from '../../../../store/task.store';
import useQueryParams from '../../../../utils/helpers/query.params';

const router = useRouter()
const tasksStore = useTask()
const { setQueries } = useQueryParams()
const route = useRoute()

function back() {
    tasksStore.$reset()
    router.push({ name: 'Users' })
}

const options = [
    { label: "Tekshirilmagan", value: "PENDING" },
    { label: "Tekshirilgan", value: "CHECKED" },
    { label: "Qayta tekshirilgan", value: "AGAIN CHECKED" },
]

function filterStatus(value) {
    const userId = route.params.userId
    setQueries({
        status: value || undefined
    })

    tasksStore.getTasks(userId, tasksStore.params)
}
</script>

<template>
    <div class="flex justify-between items-center mb-4 flex-wrap">
        <div class="flex items-center gap-3">
            <a-button size="large" class="btn rounded-full!" @click="back">
                <template #icon>
                    <icon-back class="w-6 h-6" />
                </template>
            </a-button>
            <h2 class="text-[24px] md:text-3xl font-bold p-0! mb-1!">O'quvchi vazifalari</h2>
        </div>
        <div class="mt-4 md:mt-0!">
            <a-select 
                :options="options"
                placeholder="Holatni tanlang"
                size="large"
                @change="filterStatus"
                v-model:value="tasksStore.params.status"
                class="w-60"
                allow-clear
           />
        </div>
    </div>
</template>