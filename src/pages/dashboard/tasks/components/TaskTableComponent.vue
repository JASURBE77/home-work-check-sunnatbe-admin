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
import { useRoute } from 'vue-router';
import useQueryParams from '../../../../utils/helpers/query.params';

const tasksStore = useTask()
const column = tasksColumn()
const route = useRoute()
const { t } = useI18n()
const { setQueries } = useQueryParams()

const openCheckModal = ref(false)

function checkModal(id) {
    setQueries({
        submissionId: id
    })

    openCheckModal.value = !openCheckModal.value
}

const handlePageChange = (pag) => {
    const userId = route.params.userId
    const page = pag.current ? pag.current - 1 : 0
    const size = pag.pageSize || 0
    tasksStore.getTasks(userId, { page, size })
}
</script>

<template>
    <base-table-component
        :columns="column"
        :data="tasksStore.tasks"
        :loading="tasksStore.loading"
        @page-change="handlePageChange"
        :total="tasksStore.totalTasks"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'colIndex'">
                <span class="text-center!">
                    {{ (tasksStore.currentPage - 1) * tasksStore.pageSize + index + 1 }}
                </span>
            </template>
            <template v-else-if="column.key === 'description'">
                {{ record.submission.description || '---' }}
            </template>
            <template v-else-if="column.key === 'teacherDescription'">
                <span class="line-clamp-4 text-center!">{{ record.submission.teacherDescription || '---' }}</span>
            </template>
            <template v-else-if="column.key === 'HwLink'">
                <a v-if="record.submission.HwLink" :href="record.submission.HwLink" target="blank">{{ record.submission.HwLink }}</a>
                <a-tag color="error" v-else>{{ t("STATUSES.NOTCREATED") }}</a-tag>
            </template>
            <template v-else-if="column.key === 'date'">
                {{ dayjs(record.submission.date).format("DD.MM.YYYY") }}
            </template>
            <template v-else-if="column.key === 'checkedDate'">
                {{ record.submission.checkedDate ? dayjs(record.submission.checkedDate).format("DD.MM.YYYY") : "---" }}
            </template>
            <template v-else-if="column.key === 'checkedBy'">
                {{ record.submission.checkedBy || '---' }}
            </template>
            <template v-else-if="column.key === 'status'">
                <a-tag :bordered="false" class="w-full! text-center!" v-if="record.submission.status === 'PENDING'" color="processing">
                    {{ t("STATUSES.PENDING") }}
                </a-tag>
                <a-tag :bordered="false" class="w-full! text-center!" v-if="record.submission.status === 'CHECKED'" color="success">
                    {{ t("STATUSES.CHECKED") }}
                </a-tag>
                <a-tag :bordered="false" class="w-full! text-center!" v-if="record.submission.status === 'AGAIN CHECKED'" color="orange">
                    {{ t("STATUSES.AGAIN_CHECKED") }}
                </a-tag>
            </template>
            <template v-else-if="column.key === 'actions'">
                <a-button v-if="record.submission.status === 'PENDING'" @click="checkModal(record.submission._id)" class="btn text-green-600! border-green-600!">
                    <template #icon>
                        <icon-check class="w-5 h-5"/>
                    </template>
                </a-button>

                <a-tooltip :title="t('CHECK.againCheck')" v-else-if="record.submission.status === 'CHECKED'" >
                    <a-button @click="checkModal(record.submission._id)" class="btn text-blue-600! border-blue-600!">
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