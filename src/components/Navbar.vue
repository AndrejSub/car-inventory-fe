<script setup></script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-black bg-primary">
        <div class="container">
            <router-link class="navbar-brand" to="/">🚗 Car Inventory</router-link>

            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbarNav" class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/"> Cars</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/cars/create">Add car</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
