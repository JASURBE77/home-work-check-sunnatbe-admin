<script setup>
import useTheme from '../store/theme.pinia';
import IconNight from './icons/line/IconNight.vue';
import IconLight from './icons/line/IconLight.vue';

const themeStore = useTheme()
</script>

<template>
    <label class="ui-switch mr-4">
        <input v-model="themeStore.isDark" @change="themeStore.changeTheme" type="checkbox" />
        <div class="slider">
            <div class="circle">
                <icon-light class="icon sun" />

                <icon-night class="icon moon text-black!" />
            </div>
        </div>
    </label>
</template>

<style>
.ui-switch {
    width: 48px;
    height: 26px;
    position: relative;
    cursor: pointer;
}

.ui-switch input {
    display: none;
}

/* Background */
.slider {
    height: 100%;
    background: #e5e7eb;
    border-radius: 999px;
    padding: 3px;
    transition: background 0.2s ease;
}

/* Circle */
.circle {
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.2s ease;
}

/* Icons */
.icon {
    width: 12px;
    height: 12px;
}

.moon {
    position: absolute;
    opacity: 0;
}

/* DARK MODE */
.ui-switch input:checked+.slider {
    background: #1f2937;
}

.ui-switch input:checked+.slider .circle {
    transform: translateX(22px);
}

.ui-switch input:checked+.slider .sun {
    opacity: 0;
}

.ui-switch input:checked+.slider .moon {
    opacity: 1;
}

/* LIGHT MODE */
.ui-switch input:not(:checked)+.slider .sun {
    opacity: 1;
}

.ui-switch input:not(:checked)+.slider .moon {
    opacity: 0;
}
</style>