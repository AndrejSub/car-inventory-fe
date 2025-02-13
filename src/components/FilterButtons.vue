<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    modelValue: String, // 📌 Aktuálna hodnota filtra
    isDropdown: Boolean // 📌 Ak true, zobrazí dropdown namiesto tlačidiel
});
const emit = defineEmits(["update:modelValue"]);

const changeFilter = (newFilter) => {
    emit("update:modelValue", newFilter); // 📌 Posiela novú hodnotu do rodiča
};
</script>

<template>
    <div class="pb-3 pt-3">
        <!-- Dropdown verzia (ak `isDropdown == true`) -->
        <div v-if="isDropdown" class="dropdown">
            <button
                class="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
            >
                {{ modelValue }}
            </button>
            <ul class="dropdown-menu">
                <slot :change-filter="changeFilter" :active-filter="modelValue"></slot>
            </ul>
        </div>

        <!-- Tlačidlová verzia (ak `isDropdown == false`) -->
        <div v-else class="btn-group">
            <slot :change-filter="changeFilter" :active-filter="modelValue"></slot>
        </div>
    </div>
</template>

<style scoped></style>
