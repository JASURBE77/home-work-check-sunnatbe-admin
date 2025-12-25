<script setup>
import BaseTableComponent from '../../../../components/base/BaseTableComponent.vue';
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useGroup from '../../../../store/group.store';
import IconGroup from '../../../../components/icons/line/IconGroup.vue';
import { groupColumns } from '../../../../columns/group.table';
import IconTrash from '../../../../components/icons/line/IconTrash.vue';
import { useI18n } from 'vue-i18n';

const groupStore = useGroup();
const route = useRoute();
const router = useRouter()
const column = groupColumns()
const { t } = useI18n()

function openStudents(id) {
    router.push({
        name: "GroupStudents",
        params: {
            groupId: id
        }
    })
}

const handlePageChange = (pag) => {
    const groupId = route.params.groupId;
    const page = pag.current ? pag.current - 1 : 0;
    const size = pag.pageSize || 10;
    groupStore.getGroupStudents(groupId, { page, size });
};

onMounted(() => {
    const groupId = route.params.groupId;
    groupStore.getGroupStudents(groupId, { page: 0, size: groupStore.pageSizeStudents });
});

watch(() => route.params.groupId, (newId) => {
    if (newId) {
        groupStore.getGroupStudents(newId, { page: 0, size: groupStore.pageSizeStudents });
    }
});
</script>

<template>
    <base-table-component :columns="column" :data="groupStore.groups" :loading="groupStore.loadingGroups"
        @page-change="handlePageChange" :total="groupStore.totalStudents">
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'colIndex'">
                <span class="text-center!">
                    {{ (groupStore.currentPageGroups - 1) * groupStore.pageSizeGroups + index + 1 }}
                </span>
            </template>
            <template v-else-if="column.key === 'groupName'">
                {{ record.groupName }}
            </template>
            <template v-else-if="column.key === 'groupUsersCount'">
                {{ record.groupUsersCount }}
            </template>
            <template v-else-if="column.key === 'groupLessons'">
                <div class="flex justify-center items-center gap-3 flex-wrap">
                    <a-tag v-if="record.groupLessons.length > 0" v-for="lesson in record.groupLessons" :key="lesson"
                        class="mt-2 w-25 text-center!" color="success">
                        {{ lesson }}
                    </a-tag>
                    <a-tag v-else color="error">
                        Belgilanmagan
                    </a-tag>
                </div>
            </template>
            <template v-else-if="column.key === 'description'">
                {{ record.description }}
            </template>
            <template v-else-if="column.key === 'actions'">
                <div class="flex justify-center items-center gap-2">
                    <a-button @click="openStudents(record._id)" class="btn text-green-600! border-green-600!">
                        <template #icon>
                            <icon-group class="w-5 h-5" />
                        </template>
                    </a-button>
                    <a-popconfirm :title="t('DO_DELETE')" :ok-text="t('YES')" :cancel-text="t('NO')" @confirm="groupStore.deleteGroup(record._id)">
                        <a-button class="btn" danger>
                            <template #icon>
                                <icon-trash class="w-5 h-5" />
                            </template>
                        </a-button>
                    </a-popconfirm>
                </div>
            </template>
        </template>
    </base-table-component>
</template>
