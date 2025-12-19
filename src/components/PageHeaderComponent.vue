<script setup>
const props = defineProps({
    title: String,
    subTitle: String
})
</script>

<template>
    <a-page-header
        class="demo-page-header"
        style="border: 1px solid rgb(235, 237, 240)"
        :title="title"
        :sub-title="subTitle"
        @back="() => $router.go(-1)"
    >
        <template #extra>
            <slot />
        </template>
    </a-page-header>
</template>