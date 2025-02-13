<script setup>
const props = defineProps({
    title: String,
    info: String,
    infoLabel: String
});
</script>

<template>
    <div class="card shadow-sm bg-black text-white">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p v-if="infoLabel" class="card-text">
                <strong>{{ infoLabel }}</strong> {{ info }}
            </p>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped></style>
