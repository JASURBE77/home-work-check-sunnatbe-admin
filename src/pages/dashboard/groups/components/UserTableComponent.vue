<script setup>
import { ref } from 'vue';
import { usersColumn } from '../../../../columns/users.table';
import BaseTableComponent from '../../../../components/base/BaseTableComponent.vue';
import UserForm from './form/UserForm.vue';
import useUser from '../../../../store/user.store';
import IconMore from '../../../../components/icons/line/IconMore.vue';
import IconEdit from '../../../../components/icons/line/IconEdit.vue';
import IconTasks from '../../../../components/icons/line/IconTasks.vue';
import IconTrash from '../../../../components/icons/line/IconTrash.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const usersStore = useUser()
const { userForm } = storeToRefs(usersStore)
const router = useRouter()

const openUserForm = ref(false)
const userId = ref(null)

function openForm(record) {
    userId.value = record._id
    userForm.value.name = record.name
    userForm.value.surname = record.surname
    userForm.value.age = record.age
    userForm.value.login = record.login
    userForm.value.group = record.group

    openUserForm.value = true
} 

const options = [
    { label: "Adminstrator", value: "admin" },
    { label: "Student", value: "student" },
]

function changeRole(value, id) {
    usersStore.updateRole(value, id)
}

function openTasks(id) {
    router.push({
        name: 'Tasks',
        params: {
            userId: id
        }
    })
}
</script>

<template>
    <base-table-component
        :data="usersStore.users"
        :columns="usersColumn"
        :loading="usersStore.loading"
    >
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'name'">
                {{ record.name }} {{ record.surname }}
            </template>
            <template v-else-if="column.key === 'age'">
                {{ record.age }}
            </template>
            <template v-else-if="column.key === 'login'">
                {{ record.login }}
            </template>
            <template v-else-if="column.key === 'role'">
                <a-select 
                    @change="(value) => changeRole(value, record._id)"
                    v-model:value="record.role" 
                    :disabled="usersStore.user._id === record._id"
                    :loading="usersStore.selectLoading[record._id]"
                    :options="options"
                    class="w-full!"
                />
            </template>
            <template v-else-if="column.key === 'level'">
                {{ record.level }}
            </template>
            <template v-else-if="column.key === 'group'">
                {{ record.group }}
            </template>
            <template v-else-if="column.key === 'actions'">
               <div class="flex justify-center items-center">
                    <a-dropdown v-if="usersStore.user._id !== record._id" trigger="click" class="cursor-pointer! outline-none!">
                       <icon-more class="w-5 h-5"/>

                       <template #overlay>
                           <a-menu>
                               <a-menu-item @click="openForm(record)">
                                   <a-button class="flex! justify-center! items-center! gap-2!">
                                       Tahrirlash 
                                      <template #icon>
                                           <icon-edit class="w-5 h-5"/>
                                      </template>
                                   </a-button>
                               </a-menu-item>
                               <a-menu-item v-if="record.role === 'student'" @click="openTasks(record._id)">
                                   <a-button class="flex! justify-center! items-center! gap-2!">
                                       Vazifalari 
                                      <template #icon>
                                           <icon-tasks class="w-5 h-5"/>
                                      </template>
                                   </a-button>
                               </a-menu-item>
                               <a-menu-item>
                                   <a-popconfirm @confirm="usersStore.deleteUser(record._id)" ok-text="Ha" cancel-text="Yo'q" title="O'chirishga rozimisiz ?">
                                        <a-button class="flex! justify-center! items-center! gap-2!" danger>
                                           O'chirish
                                          <template #icon>
                                               <icon-trash class="w-5 h-5"/>
                                          </template>
                                        </a-button>
                                   </a-popconfirm>
                               </a-menu-item>
                           </a-menu>
                       </template>
                    </a-dropdown>
               </div>
            </template>
        </template>
    </base-table-component>

    <user-form v-model:user-id="userId" v-model:open="openUserForm"/>
</template>