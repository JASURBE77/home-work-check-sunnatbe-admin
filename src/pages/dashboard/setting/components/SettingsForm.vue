<script setup>
import useUser from '../../../../store/user.store';

const usersStore = useUser()
</script>

<template>
    <a-form :label-col="{
        style: { display: 'flex', alignItems: 'start' },
        span: 8
    }" :model="usersStore.user">
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Ismingiz" name="name">
            <a-input v-model:value="usersStore.user.name" size="large" placeholder="Ismingizni kiriting" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Familyangiz" name="surname">
            <a-input v-model:value="usersStore.user.surname" size="large" placeholder="Familyangizni kiriting" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Yoshingiz" name="age">
            <a-input-number class="w-full!" :maxlength="2" v-model:value="usersStore.user.age" size="large" placeholder="Yoshingizni kiriting" />
        </a-form-item>
        <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" label="Loginingiz" name="login">
            <a-input v-model:value="usersStore.user.login" size="large" placeholder="Loginingizni kiriting" />
        </a-form-item>
        <!-- <a-form-item label="Parolingiz" name="name">
            <a-input v-model:value="usersStore.name" size="large" placeholder="Parolingiz kiriting" />
        </a-form-item> -->
    </a-form>
</template>