<script setup>
import { onMounted } from 'vue';
import useGroup from '../../../store/group.store';
import GroupTableComponent from './components/GroupTableComponent.vue';
import GroupFilterComponent from './components/GroupFilterComponent.vue';
import { useRoute } from 'vue-router';

const groupsStore = useGroup()
const route = useRoute()

onMounted(() => {
    groupsStore.getGroups()
})
</script>

<template>
    <div v-if="route.name === 'Groups'">
        <group-filter-component />
        <group-table-component />
    </div>

    <router-view v-else />
</template>