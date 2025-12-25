<script setup>
import { groupStudentColumns } from '../../../../columns/group.table';
import BaseTableComponent from '../../../../components/base/BaseTableComponent.vue';
import useGroup from '../../../../store/group.store';
import IconChat from '../../../../components/icons/line/IconChat.vue';

const groupsStore = useGroup()
const columns = groupStudentColumns()
</script>

<template>
    <base-table-component
        :columns="columns"
        :data="groupsStore.groupStudents"
        :loading="groupsStore.loadingStudents"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'colIndex'">
                <span class="text-center!">
                    {{ (groupsStore.currentPageStudents - 1) * groupsStore.pageSizeStudents + index + 1 }}
                </span>
            </template>
            <template v-else-if="column.key === 'name'">
                {{ record.name }} {{ record.surname }}
            </template>
            <template v-else-if="column.key === 'totalHomeworks'">
                {{ record.totalLessons }} ta
            </template>
            <template v-else-if="column.key === 'completedHomeworks'">
                {{ record.completedLessons }} ta
            </template>
            <template v-else-if="column.key === 'pendingHomeworks'">
                {{ record.pendingLessons }} ta
            </template>
            <template v-else-if="column.key === 'wpm'">
                {{ record.wpm }} WPM
            </template>
            <template v-else-if="column.key === 'actions'">
                <div class="flex justify-center items-center">
                   <a-tooltip title="Xabaringizni yuboring">
                        <a-button type="primary" class="btn">
                            <template #icon>
                                <icon-chat class="w-5 h-5"/>
                            </template>
                        </a-button>
                   </a-tooltip>
                </div>
            </template>
        </template>
    </base-table-component>
</template>