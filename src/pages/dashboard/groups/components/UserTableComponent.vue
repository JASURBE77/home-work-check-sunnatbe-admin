<script setup>
import { usersColumn } from '../../../../columns/users.table';
import BaseTableComponent from '../../../../components/base/BaseTableComponent.vue';
import useUser from '../../../../store/user.store';

const usersStore = useUser()
</script>

<template>
    <base-table-component
        :data="usersStore.users"
        :columns="usersColumn"
        :loading="usersStore.loading"
    >
    
    </base-table-component>
</template>