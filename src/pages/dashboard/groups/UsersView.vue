<script setup>
import { onMounted } from 'vue';
import useUser from '../../../store/user.store';
import UserTableComponent from './components/UserTableComponent.vue';
import UserFilterComponent from './components/UserFilterComponent.vue';

const usersStore = useUser()

onMounted(() => {
    usersStore.getUsers()
})
</script>

<template>
    <user-filter-component />
    <user-table-component />
</template>