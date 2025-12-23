<script setup>
import IconClose from '../../../../../components/icons/line/IconClose.vue';
import IconCheck from '../../../../../components/icons/line/IconCheck.vue';
import { ref } from 'vue';
import { notification } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const open = defineModel("open", {
    type: Boolean,
    default: false
})

const score = ref(null)
const description = ref("")

function submit() {
    if (!score.value > 0) {
        notification.warn({
            message: t("CHECK.enterBall")
        })
        
        return
    }

    if (description.value.length < 4) {
        notification.warn({
            message: t("CHECK.moreDescription")
        })
        
        return
    }
}
</script>

<template>
    <a-modal
        v-model:open="open"
        :title="t('CHECK.checkModal')"
        centered
    >
        <div class="flex flex-col gap-3">
            <a-input-number 
                size="large" 
                :placeholder="t('CHECK.enterBall')" 
                class="w-40!"
                v-model:value="score"
            />

            <a-textarea 
                :placeholder="t('CHECK.enterDescription')" 
                size="large" 
                :auto-size="{ minRows: 1, maxRows: 6 }"
                v-model:value="description"
            />
        </div>

        <template #footer>
            <div class="flex justify-end items-center gap-2 mt-3!">
                <a-button danger size="large" @click="open = false" class="btn">
                    <template #icon>
                        <icon-close class="w-5 h-5"/>
                    </template>
                    {{ t("CANCEL") }}
                </a-button>
                <a-button size="large" @click="submit" class="btn border-green-600! text-green-600!">
                    <template #icon>
                        <icon-check class="w-5 h-5"/>
                    </template>
                    {{ t("CHECKED") }}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>