<!-- components/Pagination.vue -->
<script setup>
const props = defineProps({
    meta: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["page-changed"]);

function changePage(link) {
    if (!link.url) return;
    emit("page-changed", link.url);
}
</script>

<template>
    <nav aria-label="Page navigation bg-black" class="mt-3">
        <ul class="pagination">
            <li
                v-for="(link, index) in props.meta.links"
                :key="index"
                class="page-item"
                :class="{
                    active: link.active,
                    disabled: !link.url
                }"
            >
                <a
                    class="page-link"
                    href="javascript:"
                    @click="changePage(link)"
                    v-html="link.label"
                ></a>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>
