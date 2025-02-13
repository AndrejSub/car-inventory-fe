<script setup>
import CarForm from "@/components/CarForm.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchData } from "@/services/apiService.js";

const route = useRoute();
const car = ref(route.state?.carData || null);
const loading = ref(!car.value); // Ak car nemáme, zobrazíme loading
const error = ref(null);

const fetchCar = async () => {
    if (!car.value) {
        try {
            car.value = await fetchData(`cars/${route.params.id}`);
        } catch (err) {
            console.error("Chyba pri načítaní auta:", err);
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }
};

const fetch = async () => {
    await fetchCar();
};

onMounted(fetch);
const patchRoute = `cars/${route.params.id}`;
</script>

<template>
    <div class="container mt-5">
        <p v-if="loading">🔄 Načítavam dáta...</p>

        <p v-else-if="error" class="text-danger">❌ Chyba pri načítaní: {{ error }}</p>

        <car-form v-else :car="car.data" :route="patchRoute" method="patch"> </car-form>
    </div>
</template>

<style scoped></style>
