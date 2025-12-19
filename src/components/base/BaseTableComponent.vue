<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    data: Array,
    columns: Array,
    loading: Boolean,
    total: Number,
    pageSize: { type: Number, default: 10 },
})

const emit = defineEmits(['pageChange'])

const pagination = ref({
    current: 1,
    pageSize: props.pageSize,
    total: props.total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `Jami ${total} ta ma'lumot`
})

watch(() => props.total, (val) => {
    pagination.value.total = val
})

const handleTableChange = (pag) => {
    pagination.value = pag
    emit('pageChange', pag)
}
</script>

<template>
    <a-table
        :data-source="props.data"
        :columns="props.columns"
        :loading="props.loading"
        :pagination="pagination"
        @change="handleTableChange"
        bordered
        :scroll="{ x: 'max-content' }"
    >
        <template #bodyCell="{ column, record, index }">
            <slot name="bodyCell" :column="column" :record="record" :index="index" />
        </template>
    </a-table>
</template>
