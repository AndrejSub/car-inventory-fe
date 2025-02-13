<script setup>
const props = defineProps({
    linkProps: {
        type: Object
    },
    updateLinkProps: {
        type: Object
    }
});
</script>

<template>
    <div class="d-flex justify-content-between">
        <router-link v-if="props.linkProps" :to="props.linkProps" class="btn btn-primary btn-sm"
            >Detail</router-link
        >
        <div class="d-flex">
            <div>
                <router-link class="btn btn-dark btn-sm gap-2" :to="props.updateLinkProps"
                    >Update</router-link
                >
            </div>
            <div>
                <button class="btn btn-sm btn-danger ms-2" @click="$emit('deleteItem')">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
