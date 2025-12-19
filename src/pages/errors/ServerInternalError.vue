<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <a-result status="500" sub-title="Server xatosi">
        <template #title>
            Server bilan bog'liq xatolik
        </template>
        <template #extra>
            <a-button @click="router.push({ name: 'Dashboard' })" type="primary" size="large">
                Bosh sahifa
            </a-button>
        </template>
    </a-result>
</template>