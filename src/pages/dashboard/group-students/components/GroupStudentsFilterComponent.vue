<script setup>
import { useI18n } from 'vue-i18n';
import IconSearch from '../../../../components/icons/line/IconSearch.vue';
import IconBack from '../../../../components/icons/line/IconBack.vue';
import { useRouter } from 'vue-router';
import useGroup from '../../../../store/group.store';

const { t } = useI18n()
const router = useRouter()
const groupsStore = useGroup()

function back() {
    groupsStore.$reset()
    groupsStore.getGroups()
    router.push({ name: "Groups" })
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
            <h2 class="text-[24px] md:text-3xl font-bold p-0! mb-1!">{{ t("Students.students") }}</h2>
        </div>

        <div class="flex justify-center gap-2 mt-4 md:mt-0!">
            <a-input 
                :placeholder="t('SEARCH')" 
                size="large"
                :maxlength="40"
                allow-clear
                class="w-50!"
            >
                <template #addonAfter>
                    <icon-search class="w-5 h-5 text-gray-500" />
                </template>
            </a-input>
        </div>
    </div>
</template>