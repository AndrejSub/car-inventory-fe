<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Card from "@/components/Card.vue";
import { deleteData, fetchData } from "@/services/apiService.js";
import PartForm from "@/components/PartForm.vue";
import CarDetailCardButtons from "@/components/CarDetailCardButtons.vue";
import Pagination from "@/components/Pagination.vue";
import FilterButtons from "@/components/FilterButtons.vue";
import PartFilters from "@/components/PartFilters.vue";

const route = useRoute();
const car = ref(route.state?.carData || null);
const parts = ref(null);
const loading = ref(!car.value);
const error = ref(null);

// Reaktívny stav pre filter, uložený v `localStorage`
const partsFilter = ref(localStorage.getItem("parts_filter") || "latest");

// Reaktívny stav pre prepínanie medzi zobrazením zoznamu a formulára
const currentView = ref("list");

// Funkcia na prepínanie zobrazenia medzi zoznamom a formulárom
const toggleView = () => {
    currentView.value = currentView.value === "list" ? "add" : "list";
};

// Sleduj zmeny `partsFilter` a ukladaj do `localStorage`, zároveň načítaj nové dáta
watch(partsFilter, async (newFilter) => {
    localStorage.setItem("parts_filter", newFilter);
    await fetchParts(); // Automaticky načíta nové dáta po zmene filtra
});

// Načítanie detailov auta (iba ak ich nemáme)
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

// Načítanie zoznamu dielov s aplikovaným filtrom
const fetchParts = async (url = null) => {
    try {
        loading.value = true;
        const baseUrl = `cars/${route.params.id}/parts`;
        const fullUrl = url
            ? `${url}&filter=${partsFilter.value}`
            : `${baseUrl}?filter=${partsFilter.value}`;
        parts.value = await fetchData(fullUrl);
    } catch (err) {
        console.error("Chyba pri načítaní dielov:", err);
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Funkcia na spracovanie stránkovania
const onPageChanged = async (pageUrl) => {
    await fetchParts(pageUrl); // Zachová filter pri stránkovaní
};

// Odstránenie dielu zo zoznamu
const remove = async (id) => {
    if (await deleteData("parts", id)) {
        parts.value.data = parts.value.data.filter((part) => part.id !== id);
    }
};

// Funkcia na spracovanie pridania nového dielu
const handlePartAdded = (newPart) => {
    if (parts.value && parts.value.data) {
        parts.value.data.push(newPart);
    } else {
        parts.value = { data: [newPart] };
    }
    currentView.value = "list"; // Po pridaní dielu sa prepne späť na zoznam
};

// Spusti načítanie dát pri načítaní komponentu
onMounted(async () => {
    await fetchCar();
    await fetchParts();
});
</script>

<template>
    <div class="container mt-5">
        <section>
            <h2>Car details</h2>
            <p v-if="loading">Loading data....</p>
            <p v-if="error" class="text-danger">Error when loading: {{ error }}</p>
            <div v-if="car">
                <p><strong>Name:</strong> {{ car.data.name }}</p>
                <p>
                    <strong>
                        {{
                            car.data.is_registered
                                ? "Registration Number: "
                                : "Car is not registered"
                        }}
                    </strong>
                    {{ car.data.registration_number }}
                </p>
            </div>
        </section>

        <!-- Tlačidlo na prepínanie medzi zoznamom a formulárom -->
        <button class="btn btn-secondary" @click="toggleView">
            {{ currentView === "list" ? "Pridať nový diel" : "Zobraziť zoznam dielov" }}
        </button>

        <!-- Sekcia so zoznamom dielov -->
        <section v-if="currentView === 'list'" class="pt-5">
            <FilterButtons v-model="partsFilter" :is-dropdown="true">
                <template #default="{ changeFilter, activeFilter }">
                    <PartFilters :change-filter="changeFilter" :active-filter="activeFilter" />
                </template>
            </FilterButtons>

            <div v-if="parts" class="row">
                <h2 v-if="parts.data.length > 0">Parts belonging to {{ car.data.name }}</h2>
                <h2 v-else>No parts belong to {{ car.data.name }}</h2>

                <div v-for="part in parts.data" :key="part.id" class="col-md-4 col-sm-6 mb-4">
                    <Card
                        :title="part.name"
                        info-label="Serial number: "
                        :info="part.serial_number"
                    >
                        <CarDetailCardButtons
                            :link-props="{
                                name: 'partUpdate',
                                params: { id: part.id },
                                state: { partData: part, car_id: car.data.id }
                            }"
                            @delete-item="remove(part.id)"
                        />
                    </Card>
                </div>
            </div>
        </section>

        <!-- Sekcia s formulárom na pridanie dielu -->
        <section v-else class="pt-5">
            <PartForm :id="car.data.id" @part-added="handlePartAdded"></PartForm>
        </section>

        <!-- Pagination -->
        <div v-if="parts">
            <Pagination v-if="parts.meta" :meta="parts.meta" @page-changed="onPageChanged" />
        </div>
    </div>
</template>

<style scoped></style>
