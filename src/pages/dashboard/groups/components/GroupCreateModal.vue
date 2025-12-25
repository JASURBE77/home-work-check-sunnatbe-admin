<script setup>
import { ref, defineProps } from 'vue';
import useGroup from '../../../../store/group.store';
import { useI18n } from 'vue-i18n';

const groupsStore = useGroup()
const { t } = useI18n()

const props = defineProps({
    open: { type: Boolean, default: false },
});

const emit = defineEmits(['update:open', 'created']);

const form = ref(null);
const formData = ref({
    groupName: '',
    description: '',
    groupLessons: []
});

function closeModal() {
    emit('update:open', false);
    resetForm();
}

function resetForm() {
    formData.value = {
        groupName: '',
        description: '',
        groupLessons: []
    };
    form.value?.resetFields();
}

function submit() {
    groupsStore.createGroup(formData.value, closeModal);
}

const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

function toggleDay(day) {
    const index = formData.value.groupLessons.indexOf(day);

    if (index > -1) {
        formData.value.groupLessons.splice(index, 1);
    } else {
        if (formData.value.groupLessons.length >= 3) return;
        formData.value.groupLessons.push(day);
    }
}
</script>

<template>
    <a-modal centered :title="'Yangi Guruh yaratish'" :open="open">
        <a-form @finish="submit" id="groupForm" ref="form" layout="vertical" :model="formData">
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon !' }]" label="Guruh nomi"
                name="groupName">
                <a-input size="large" v-model:value="formData.groupName" placeholder="Masalan: A1 Guruh" />
            </a-form-item>

            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon !' }]" label="Dars kunlari (max 3 ta)">
                <a-space wrap>
                    <a-checkable-tag v-for="day in weekDays" :key="day" :checked="formData.groupLessons.includes(day)"
                        @change="() => toggleDay(day)">
                        {{ day }}
                    </a-checkable-tag>
                </a-space>

                <div class="text-xs text-gray-400 mt-1 text-end">
                    Tanlangan: {{ formData.groupLessons.length }} / 3
                </div>
            </a-form-item>

            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon !' }]" label="Tavsif" name="description">
                <a-input size="large" v-model:value="formData.description" placeholder="Guruh haqida qisqacha" />
            </a-form-item>
        </a-form>

        <template #footer>
            <div class="flex justify-end items-centere gap-2">
                <a-button @click="closeModal" type="primary" danger size="large">
                    {{ t("CANCEL") }}
                </a-button>
                <a-button :loading="groupsStore.buttonLoading" html-type="submit" form="groupForm" type="primary"
                    size="large" class="btn">
                    {{ t("ADD") }}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>