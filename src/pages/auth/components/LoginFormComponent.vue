<script setup>
import useAuth from '../../../store/auth.store';
import { formatPhoneNumber } from '../../../utils/helpers/format.phone.number';
import { phoneCodeValidator } from '../../../utils/helpers/phone.validator';

const authStore = useAuth()

const phoneRules = [
    {
        required: true,
        message: "Majburiy maydon",
    },
    {
        validator: (_rule, value) => {
            if (!value) return Promise.resolve();
            const val = value || '';
            const cleanVal = val.replace(/[-\s]/g, '');

            if (!phoneCodeValidator(cleanVal)) {
                return Promise.reject(new Error("Raqamni tog'ri formatda kiriting"));
            } else if (cleanVal.length < 9) {
                return Promise.reject(new Error("Minimal 9 ta raqamdan iborat bo'lishi kerak"));
            }
            return Promise.resolve();
        },
        trigger: "blur"
    }
];

function handleInput(value) {
    authStore.formModel.phone = formatPhoneNumber(value) ?? "";
}
</script>

<template>
    <a-form :model="authStore.formModel" layout="vertical">
        <a-form-item 
            :rules="phoneRules" 
            label="Telefon raqam" 
            name="phone"
        >
            <a-input 
                size="large" 
                placeholder="00-000-00-00"
                v-model:value="authStore.formModel.phone"
                @input="handleInput"
                addonBefore="+998"
                :maxlength="12"
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