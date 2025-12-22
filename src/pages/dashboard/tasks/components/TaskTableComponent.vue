<script setup>
import BaseTableComponent from '../../../../components/base/BaseTableComponent.vue';
import useTask from '../../../../store/task.store';
import { tasksColumn } from '../../../../columns/tasks.table';
import dayjs from 'dayjs';

const tasksStore = useTask()
</script>

<template>
    <base-table-component
        :columns="tasksColumn"
        :data="tasksStore.tasks"
        :loading="tasksStore.loading"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'description'">
                {{ record.description }}
            </template>
            <template v-else-if="column.key === 'teacherDescription'">
                {{ record.teacherDescription || '---' }}
            </template>
            <template v-else-if="column.key === 'HwLink'">
                <a :href="record.HwLink" target="blank">{{ record.HwLink }}</a>
            </template>
            <template v-else-if="column.key === 'date'">
                {{ dayjs(record.date).format("DD.MM.YYYY") }}
            </template>
            <template v-else-if="column.key === 'status'">
                <a-tag v-if="record.status === 'PENDING'" color="processing">
                    Kutilmoqda
                </a-tag>
                <a-tag v-if="record.status === 'CHECKED'" color="success">
                    Tekshirilgan
                </a-tag>
            </template>
            <template v-else-if="column.key === 'actions'">

            </template>
        </template>
    </base-table-component>
</template>