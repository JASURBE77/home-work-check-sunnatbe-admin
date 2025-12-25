<script setup>
import { storeToRefs } from 'pinia';
import useUser from '../../../../../store/user.store';
import IconCirclePlus from '../../../../../components/icons/line/IconCirclePlus.vue';
import IconUpdate from '../../../../../components/icons/line/IconUpdate.vue';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import useGroup from '../../../../../store/group.store';

const usersStore = useUser()
const { userForm } = storeToRefs(usersStore)
const { t } = useI18n()
const groupsStore = useGroup()

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
        usersStore.updateUser(t, closeModal, userId.value)
    } else {
        usersStore.createUser(t, closeModal)
    }
}

function closeModal() {
    userForm.value.name = "",
    userForm.value.surname = "",
    userForm.value.login = "",
    userForm.value.group = null,
    userForm.value.level = 0,
    userForm.value.password = null,
    userForm.value.age = null

    open.value = false
}

watch(() => open.value, () => {
    groupsStore.getGroups()
})
</script>

<template>
    <a-modal 
        centered 
        :open="open"
        @cancel="closeModal"
        :title="userId ? t('UPDATE_USER') : t('ADD_USER')"
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
                        :label="t('Users.UserForm.name')"
                        name="name"
                    >
                        <a-input 
                            v-model:value="userForm.name" 
                            :placeholder="t('Users.UserForm.enterName')" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        :label="t('Users.UserForm.surname')"
                        name="surname"
                    >
                        <a-input 
                            v-model:value="userForm.surname" 
                            :placeholder="t('Users.UserForm.enterSurname')" 
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
                        :label="t('Users.UserForm.age')"
                        name="age"
                    >
                        <!-- <a-date-picker 
                            placeholder="Yoshini kiriting"
                            size="large"
                            v-model:value="userForm.age"
                            class="w-full!"
                        /> -->
                        <a-input-number 
                            :placeholder="t('Users.UserForm.enterAge')" 
                            size="large"
                            v-model:value="userForm.age"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item 
                        :rules="{ required: true, message: 'Majburiy maydon' }"
                        :label="t('Users.UserForm.login')"
                        name="login"
                    >
                        <a-input 
                            v-model:value="userForm.login" 
                            :placeholder="t('Users.UserForm.enterLogin')" 
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
                        :label="t('Users.UserForm.password')"
                        name="password"
                    >
                        <a-input 
                            v-model:value="userForm.password" 
                            :placeholder="t('Users.UserForm.enterPassword')" 
                            size="large"
                            class="w-full!"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item 
                        :label="t('Users.UserForm.group')"
                        name="group"
                    >
                        <a-select v-model:value="userForm.group" size="large" :placeholder="t('Users.UserForm.enterGroup')">
                            <a-select-option :value="group._id" v-for="group in groupsStore.groups" :key="group._id">
                                {{ group.groupName }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>

        <template #footer>
            <div class="flex justify-end gap-2">
                <a-button 
                    @click="closeModal"
                    type="primary"
                    danger
                    size="large"
                    class="btn"
                >
                    {{ t("CANCEL") }}
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
                    {{ userId ? t("UPDATE") : t("ADD") }}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>