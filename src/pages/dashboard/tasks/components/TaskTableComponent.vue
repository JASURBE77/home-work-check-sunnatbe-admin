<script setup>
import BaseTableComponent from '../../../../components/base/BaseTableComponent.vue';
import useTask from '../../../../store/task.store';
import { tasksColumn } from '../../../../columns/tasks.table';
import IconCheck from '../../../../components/icons/line/IconCheck.vue';
import CheckStudentdModal from './modal/CheckStudentdModal.vue';
import dayjs from 'dayjs';
import IconReset from '../../../../components/icons/line/IconReset.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const tasksStore = useTask()
const column = tasksColumn()
const { t } = useI18n()

const openCheckModal = ref(false)
</script>

<template>
    <base-table-component
        :columns="column"
        :data="tasksStore.tasks"
        :loading="tasksStore.loading"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'description'">
                {{ record.description || '---' }}
            </template>
            <template v-else-if="column.key === 'teacherDescription'">
                {{ record.teacherDescription || '---' }}
            </template>
            <template v-else-if="column.key === 'HwLink'">
                <a v-if="record.HwLink" :href="record.HwLink" target="blank">{{ record.HwLink }}</a>
                <a-tag color="error" v-else>{{ t("STATUSES.NOTCREATED") }}</a-tag>
            </template>
            <template v-else-if="column.key === 'date'">
                {{ dayjs(record.date).format("DD.MM.YYYY") }}
            </template>
            <template v-else-if="column.key === 'status'">
                <a-tag v-if="record.status === 'PENDING'" color="processing">
                    {{ t("STATUSES.PENDING") }}
                </a-tag>
                <a-tag v-if="record.status === 'CHECKED'" color="success">
                    {{ t("STATUSES.CHECKED") }}
                </a-tag>
            </template>
            <template v-else-if="column.key === 'actions'">
                <a-button v-if="false" @click="openCheckModal = true" class="btn text-green-600! border-green-600!">
                    <template #icon>
                        <icon-check class="w-5 h-5"/>
                    </template>
                </a-button>

                <a-tooltip :title="t('CHECK.againCheck')" v-else-if="true" >
                    <a-button @click="openCheckModal = true" class="btn text-blue-600! border-blue-600!">
                        <template #icon>
                            <icon-reset class="w-5 h-5"/>
                        </template>
                    </a-button>
                </a-tooltip>
            </template>
        </template>
    </base-table-component>

    <check-studentd-modal v-model:open="openCheckModal"/>
</template>