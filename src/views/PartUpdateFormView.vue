<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { fetchData } from "@/services/apiService.js";
import PartForm from "@/components/PartForm.vue";

const route = useRoute();
const part = ref(route.state?.partData || null);
const loading = ref(!part.value);
const error = ref(null);

const fetchPart = async () => {
    if (!part.value) {
        try {
            part.value = await fetchData(`parts/${route.params.id}`);
        } catch (err) {
            console.error("Chyba pri načítaní dielu:", err);
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }
};

const fetch = async () => {
    await fetchPart();
};

onMounted(fetch);
const patchRoute = `parts/${route.params.id}`;
</script>

<template>
    <div class="container mt-5">
        <p v-if="loading">Loading Data ...</p>

        <p v-else-if="error" class="text-danger">❌ Error when loading: {{ error }}</p>

        <part-form
            v-else
            :part="part.data"
            :route="patchRoute"
            method="PATCH"
            message="Part was updated successfully"
        >
        </part-form>
    </div>
</template>

<style scoped></style>
