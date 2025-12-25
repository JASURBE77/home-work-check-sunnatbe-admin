<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import GroupCreateModal from './GroupCreateModal.vue';
import useGroup from '../../../../store/group.store';
import IconCirclePlus from '../../../../components/icons/line/IconCirclePlus.vue';
import { useI18n } from 'vue-i18n';

const groupStore = useGroup();
const route = useRoute();
const searchValue = ref("");
const openCreateModal = ref(false);
const { t } = useI18n()

function handleSearch() {
    const groupId = route.params.groupId;
    groupStore.getGroupStudents(groupId, {
        page: groupStore.studentParams.page,
        size: groupStore.studentParams.size,
        search: searchValue.value,
    });
}

function openCreate() {
    openCreateModal.value = true;
}
</script>

<template>
    <div class="flex justify-between items-center mb-4 flex-wrap">
        <h2 class="text-3xl font-bold">{{ t("GROUP.groups") }}</h2>

        <div>
            <a-button class="btn" type="primary" size="large" @click="openCreate">
                <template #icon>
                    <icon-circle-plus class="w-5 h-5" />
                </template>
                {{ t("ADD") }}
            </a-button>
        </div>

        <group-create-modal v-model:open="openCreateModal" />
    </div>
</template>
