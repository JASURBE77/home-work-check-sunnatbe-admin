<script setup>
import { onMounted } from 'vue';
import useGroup from '../../../store/group.store';
import { useRoute } from 'vue-router';
import GroupStudentsTableComponent from './components/GroupStudentsTableComponent.vue';
import GroupStudentsFilterComponent from './components/GroupStudentsFilterComponent.vue';

const groupsStore = useGroup()
const route = useRoute()

onMounted(() => {
    const groupId = route.params.groupId

    groupsStore.getGroupStudents(groupId)
})
</script>

<template>
    <group-students-filter-component />
    <group-students-table-component />
</template>
