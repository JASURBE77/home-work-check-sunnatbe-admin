<script setup>
import useAuth from '../../../store/auth.store';

const authStore = useAuth()
</script>

<template>
    <a-form :model="authStore.formModel" layout="vertical">
        <a-form-item 
            :rules="{ required: true, message: 'Majburiy maydon' }" 
            label="Telefon raqam" 
            name="phone"
        >
            <a-input 
                size="large" 
                placeholder="00-000-00-00"
                v-model:value="authStore.formModel.phone"
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