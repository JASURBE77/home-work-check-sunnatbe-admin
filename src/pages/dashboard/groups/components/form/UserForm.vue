<script setup>
import { storeToRefs } from 'pinia';
import useUser from '../../../../../store/user.store';
import IconCirclePlus from '../../../../../components/icons/line/IconCirclePlus.vue';
import IconUpdate from '../../../../../components/icons/line/IconUpdate.vue';

const usersStore = useUser()
const { userForm } = storeToRefs(usersStore)

const open = defineModel("open", {
    type: Boolean,
    required: true,
    default: false
})

const userId = defineModel("userId", {
    type: [String, Number, null],
    required: false
})

function addUser() {
    if (userId.value) {
        usersStore.updateUser(closeModal, userId.value)
    } else {
        usersStore.createUser(closeModal)
    }
}

function closeModal() {
    userForm.value.name = "",
    userForm.value.surname = "",
    userForm.value.login = "",
    userForm.value.group = "",
    userForm.value.level = 0,
    userForm.value.password = null,
    userForm.value.age = null

    open.value = false
}
</script>

<template>
    <a-modal 
        centered 
        :open="open"
        @cancel="closeModal"
        :title="userId ? 'Foydalanuvchini yangilash' : `Foydalanuvchi qo'shish`"
    >
        <a-form
            :model="userForm"
            layout="vertical"
            id="user-form"
            @finish="addUser"
        >
            <a-row :gutter="[24,24]">
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        label="Ismi"
                        name="name"
                    >
                        <a-input 
                            v-model:value="userForm.name" 
                            placeholder="Ismini kiriting" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        label="Familyasi"
                        name="surname"
                    >
                        <a-input 
                            v-model:value="userForm.surname" 
                            placeholder="Familyasini kiriting" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[24,24]">
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        label="Yoshini kiriting"
                        name="age"
                    >
                        <!-- <a-date-picker 
                            placeholder="Yoshini kiriting"
                            size="large"
                            v-model:value="userForm.age"
                            class="w-full!"
                        /> -->
                        <a-input-number 
                            placeholder="Yoshini kiriting"
                            size="large"
                            v-model:value="userForm.age"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        label="Login"
                        name="login"
                    >
                        <a-input 
                            v-model:value="userForm.login" 
                            placeholder="Loginini kiriting" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[24,24]">
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: !userId, message: 'Majburiy maydon' }"
                        label="Paroli"
                        name="password"
                    >
                        <a-input 
                            v-model:value="userForm.password" 
                            placeholder="Parolini kiriting" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        label="Guruhi"
                        name="group"
                    >
                        <a-input
                            v-model:value="userForm.group" 
                            placeholder="Guruh raqamini kiriting" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <template #footer>
            <div class="flex justify-end gap-2">
                <a-button 
                    @click="closeModal"
                    danger
                    size="large"
                >
                    Bekor qilish
                </a-button>
                <a-button
                    class="btn"
                    type="primary"
                    html-type="submit"
                    form="user-form"
                    :loading="usersStore.buttonLoading"
                    size="large"
                >
                    <template #icon>
                        <icon-circle-plus v-if="!userId" class="w-5 h-5"/>
                        <icon-update v-else class="w-5 h-5"/>
                    </template>
                    {{ userId ? "Yangilash" : "Qo'shish" }}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>