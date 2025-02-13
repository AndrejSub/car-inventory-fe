<script setup>
import { ref, onMounted, watch } from "vue";
import Card from "@/components/Card.vue";
import DashboardCardButtons from "@/components/DashboardCardButtons.vue";
import Pagination from "@/components/Pagination.vue";
import FilterButtons from "@/components/FilterButtons.vue";
import { deleteData, fetchData } from "@/services/apiService.js";

// Stav pre zoznam áut
const cars = ref(null);
const loading = ref(true);
const error = ref(null);
const filter = ref(localStorage.getItem("car_filter") || "latest"); //

// Sleduj zmeny filtra a ulož ich do localStorage
watch(filter, (newFilter) => {
    localStorage.setItem("car_filter", newFilter);
    fetchCars();
});

// Načítanie áut s filtrom
const fetchCars = async (url = null) => {
    try {
        loading.value = true;
        const baseUrl = "cars/filter";
        const fullUrl = url ? `${url}&filter=${filter.value}` : `${baseUrl}?filter=${filter.value}`;
        cars.value = await fetchData(fullUrl);
    } catch (err) {
        console.error(err);
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Zmena stránky
const onPageChanged = async (pageUrl) => {
    console.log("Loading page:", pageUrl);
    await fetchCars(pageUrl);
};

// Odstránenie auta
const remove = async (id) => {
    if (await deleteData("cars", id)) {
        cars.value.data = cars.value.data.filter((car) => car.id !== id);
    }
};

// Načítanie dát pri načítaní komponentu
onMounted(fetchCars);
</script>

<template>
    <div class="container mt-5 pb-2">
        <h2 class="pb-3">Cars</h2>

        <!-- filter -->
        <FilterButtons v-model="filter">
            <template #default="{ changeFilter, activeFilter }">
                <button
                    class="btn btn-outline-primary"
                    :class="{ active: activeFilter === 'latest' }"
                    @click="changeFilter('latest')"
                >
                    Latest Added
                </button>
                <button
                    class="btn btn-outline-primary"
                    :class="{ active: activeFilter === 'oldest' }"
                    @click="changeFilter('oldest')"
                >
                    Oldest Added
                </button>
                <button
                    class="btn btn-outline-primary"
                    :class="{ active: activeFilter === 'registered' }"
                    @click="changeFilter('registered')"
                >
                    Registered
                </button>
            </template>
        </FilterButtons>

        <!-- Loading alebo error stavy -->
        <p v-if="loading">Loading Data...</p>
        <p v-else-if="error" class="text-danger">Error when loading: {{ error }}</p>

        <!-- Zoznam áut + stránkovanie -->
        <div v-else-if="cars">
            <div class="row">
                <div v-for="car in cars.data" :key="car.id" class="col-md-4 col-sm-6 mb-4">
                    <Card
                        :title="car.name"
                        :info-label="
                            car.is_registered ? 'Registration number:' : 'Car is not registered'
                        "
                        :info="car.registration_number || ''"
                    >
                        <DashboardCardButtons
                            :link-props="{
                                name: 'carDetail',
                                params: { id: car.id },
                                state: { carData: car }
                            }"
                            :update-link-props="{
                                name: 'carUpdate',
                                params: { id: car.id },
                                state: { carData: car }
                            }"
                            @delete-item="remove(car.id)"
                        />
                    </Card>
                </div>
            </div>

            <!-- Pagination -->
            <Pagination v-if="cars.meta" :meta="cars.meta" @page-changed="onPageChanged" />
        </div>
    </div>
</template>

<style scoped></style>
