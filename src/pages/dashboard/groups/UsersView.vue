<script setup>
import { onMounted } from 'vue';
import useUser from '../../../store/user.store';
import UserTableComponent from './components/UserTableComponent.vue';
import UserFilterComponent from './components/UserFilterComponent.vue';
import { useRoute } from 'vue-router';

const usersStore = useUser()
const route = useRoute()

onMounted(() => {
    usersStore.params.search = route.query.search
    usersStore.getUsers({
        size: usersStore.params.size,
        page: usersStore.params.page,
        search: usersStore.params.search
    })
})
</script>

<template>
    <div v-if="route.name === 'Users'">
        <user-filter-component />
        <user-table-component />
    </div>

    <router-view v-else />
</template>