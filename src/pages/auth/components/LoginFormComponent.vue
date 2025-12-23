<script setup>
import { useRouter } from 'vue-router';
import useAuth from '../../../store/auth.store';
import { useI18n } from 'vue-i18n';

const authStore = useAuth()
const router = useRouter()
const { t } = useI18n()

function login() {
    authStore.login( t, pushDashboard)
}

function pushDashboard() {
    router.push({ name: "Dashboard" })
}
</script>

<template>
    <a-form @finish="login" :model="authStore.formModel" layout="vertical">
        <a-form-item 
            :rules="[
                { required: true, message: t('Login.fields.required_field') }, 
                { min: 4, message: t('Login.fields.min4Length')}
            ]"
            label="Login" 
            name="login"
        >
            <a-input
                :placeholder="t('Login.enterLogin')"
                size="large"
                v-model:value="authStore.formModel.login"
            />
        </a-form-item>
        <a-form-item 
            :rules="{ required: true, message: t('Login.fields.required_field') }" 
            :label="t('Login.password')" 
            name="password"
        >
            <a-input-password 
                size="large" 
                :placeholder="t('Login.enterPassword')" 
                v-model:value="authStore.formModel.password"
            />
        </a-form-item>

        <div class="flex justify-end">
            <a-button 
                type="primary" 
                size="large"
                html-type="submit"
                :loading="authStore.loading"
                class="w-full! mt-4"
            >
                <template #icon>
                    {{ t('Login.login') }}
                </template>
            </a-button>
        </div>
    </a-form>
</template>