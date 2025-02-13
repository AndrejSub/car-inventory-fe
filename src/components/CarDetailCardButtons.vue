<script setup>
const props = defineProps({
    linkProps: {
        type: Object
    }
});
</script>

<template>
    <div class="d-flex justify-content-between">
        <router-link class="btn btn-dark btn-sm gap-2" :to="props.linkProps">Update</router-link>
        <button class="btn btn-sm btn-danger" @click="$emit('deleteItem')">Delete</button>
    </div>
</template>

<style scoped></style>
