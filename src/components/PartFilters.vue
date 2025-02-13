<script setup>
import { defineProps } from "vue";

const props = defineProps(["changeFilter", "activeFilter"]);
</script>

<template>
    <li>
        <a
            class="dropdown-item"
            :class="{ active: activeFilter === 'latest' }"
            @click="changeFilter('latest')"
        >
            Latest Added
        </a>
    </li>
    <li>
        <a
            class="dropdown-item"
            :class="{ active: activeFilter === 'oldest' }"
            @click="changeFilter('oldest')"
        >
            Oldest Added
        </a>
    </li>
    <li>
        <a
            class="dropdown-item"
            :class="{ active: activeFilter === 'name_asc' }"
            @click="changeFilter('name_asc')"
        >
            Name (A-Z)
        </a>
    </li>
    <li>
        <a
            class="dropdown-item"
            :class="{ active: activeFilter === 'name_desc' }"
            @click="changeFilter('name_desc')"
        >
            Name (Z-A)
        </a>
    </li>
    <li>
        <a
            class="dropdown-item"
            :class="{ active: activeFilter === 'serial_asc' }"
            @click="changeFilter('serial_asc')"
        >
            Serial Number (A-Z)
        </a>
    </li>
    <li>
        <a
            class="dropdown-item"
            :class="{ active: activeFilter === 'serial_desc' }"
            @click="changeFilter('serial_desc')"
        >
            Serial Number (Z-A)
        </a>
    </li>
</template>

<style scoped></style>
