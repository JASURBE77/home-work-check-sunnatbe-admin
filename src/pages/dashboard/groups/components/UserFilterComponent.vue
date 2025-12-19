<script setup>
import { debounce } from '../../../../utils/helpers/debounce';
import useQueryParams from '../../../../utils/helpers/query.params';
import useUser from '../../../../store/user.store';
import IconSearch from '../../../../components/icons/line/IconSearch.vue';
import IconCirclePlus from '../../../../components/icons/line/IconCirclePlus.vue';
import UserForm from './form/UserForm.vue';
import { ref } from 'vue';

const { setQueries } = useQueryParams()
const userStore = useUser()

const openUserForm = ref(false)

const search = debounce((e) => {
    setQueries({
        search: e.target?.value || undefined
    })
    userStore.getUsers(userStore.params)
}, 500)
</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-bold">Foydalanuvchilar</h2>

        <div class="flex justify-center gap-2">
            <a-input 
                v-model:value="userStore.params.search" 
                @input="search" 
                placeholder="Qidirish..." 
                size="large"
                :maxlength="40"
                allow-clear
            >
                <template #addonAfter>
                    <icon-search class="w-5 h-5 text-gray-500" />
                </template>
            </a-input>
            <a-button 
                type="primary" 
                size="large"
                class="btn"
                @click="openUserForm = true"
            >
                <template #icon>
                    <icon-circle-plus class="w-5 h-5"/>
                </template>
                Qo'shish
            </a-button>
        </div>
    </div>

    <user-form v-model:open="openUserForm"/>
</template>