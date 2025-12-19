<script setup>
import { useRouter } from 'vue-router';
import useAuth from '../../../store/auth.store';

const authStore = useAuth()
const router = useRouter()

function login() {
    authStore.login(pushDashboard)
}

function pushDashboard() {
    router.push({ name: "Dashboard" })
}
</script>

<template>
    <a-form @finish="login" :model="authStore.formModel" layout="vertical">
        <a-form-item 
            :rules="[
                { required: true, message: 'Majburiy maydon' }, 
                { min: 4, message: 'Kamida 4 belgi'}
            ]"
            label="Login" 
            name="login"
        >
            <a-input
                placeholder="Loginni kiriting"
                size="large"
                v-model:value="authStore.formModel.login"
            />
        </a-form-item>
        <a-form-item 
            :rules="{ required: true, message: 'Majburiy maydon' }" 
            label="Parol" 
            name="password"
        >
            <a-input-password 
                size="large" 
                placeholder="Parolni kiriting" 
                v-model:value="authStore.formModel.password"
            />
        </a-form-item>

        <div class="flex justify-end">
            <a-button 
                type="primary" 
                size="large"
                html-type="submit"
                :loading="authStore.loading"
            >
                Tizimga kirish
            </a-button>
        </div>
    </a-form>
</template>