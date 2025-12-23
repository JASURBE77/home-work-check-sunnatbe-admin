<script setup>
import { useI18n } from 'vue-i18n';
import useUser from '../../../../store/user.store';

const usersStore = useUser()
const { t } = useI18n()
</script>

<template>
    <a-form :label-col="{
        style: { display: 'flex', alignItems: 'start' },
        span: 8
    }" :model="usersStore.user">
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" :label="t('settings.name')" name="name">
            <a-input v-model:value="usersStore.user.name" size="large" :placeholder="t('Users.UserForm.enterName')" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" :label="t('settings.surname')"
            name="surname">
            <a-input v-model:value="usersStore.user.surname" size="large"
                :placeholder="t('Users.UserForm.enterSurname')" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" :label="t('settings.age')" name="age">
            <a-input-number class="w-full!" :maxlength="2" v-model:value="usersStore.user.age" size="large"
                :placeholder="t('Users.UserForm.enterAge')" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" :label="t('settings.login')"
            name="login">
            <a-input v-model:value="usersStore.user.login" size="large" :placeholder="t('Users.UserForm.enterLogin')" />
        </a-form-item>
        <!-- <a-form-item :label="t('settings.password')" name="name">
            <a-input v-model:value="usersStore.name" size="large" :placeholder="t('Users.UserForm.enterPassword')" />
        </a-form-item> -->
    </a-form>
</template>