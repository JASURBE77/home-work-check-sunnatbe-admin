<script setup>
import { onMounted } from 'vue';
import useTask from '../../../store/task.store';
import TasksFilterComponent from './components/TasksFilterComponent.vue';
import { useRoute } from 'vue-router';
import TaskTableComponent from './components/TaskTableComponent.vue';

const tasksStore = useTask()
const route = useRoute()

onMounted(() => {
    const userId = route.params.userId

    tasksStore.getTasks(userId)
})
</script>

<template>
    <tasks-filter-component />
    <task-table-component class="mt-4"/>
</template>