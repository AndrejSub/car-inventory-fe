<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import { postOrUpdateData } from "@/services/apiService.js";

import { useRouter } from "vue-router";

const routerTest = useRouter();
const props = defineProps({
    car: {
        type: Object,
        default: { is_registered: false, name: "", registration_number: "" }
    },
    method: {
        type: String,
        default: "POST"
    },
    route: {
        type: String,
        default: "cars"
    }
});
const validationSchema = yup.object({
    name: yup.string().required("Name of car is required"),
    registration_number: yup.string().when("is_registered", {
        is: true,
        then: (schema) => schema.required("Registration number is mandatory for registered car"),
        otherwise: (schema) => schema.notRequired()
    }),
    is_registered: yup.boolean().default(false)
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const submitForm = async (values) => {
    isSubmitting.value = true;
    errorMessage.value = "";

    const success = await postOrUpdateData(
        values,
        props.route,
        isSubmitting,
        errorMessage,
        "Car was successfully added",
        props.method
    );

    if (success) {
        await routerTest.push("/");
    }
};
</script>

<template>
    <Form v-slot="{ values }" :validation-schema="validationSchema" @submit="submitForm">
        <!-- Názov auta -->
        <div class="mb-3">
            <label class="form-label">Car name</label>

            <Field
                v-model="values.name"
                :model-value="car.name"
                name="name"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <!-- Checkbox is_registered -->
        <div class="form-check mb-3">
            <Field
                v-model="values.is_registered"
                name="is_registered"
                :model-value="car.is_registered === 1"
                type="checkbox"
                class="form-check-input"
                :value="true"
                :unchecked-value="false"
            />
            <label class="form-check-label" for="is_registered">Registered</label>
            <ErrorMessage name="is_registered" class="text-danger" />
        </div>

        <!-- zobrazi sa ked is_registered == true -->
        <div v-if="values.is_registered" class="mb-3">
            <label class="form-label">Registration number</label>
            <Field
                v-model="values.registration_number"
                :model-value="car.registration_number"
                name="registration_number"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="registration_number" class="text-danger" />
        </div>

        <!-- Error massage -->
        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Saving ...</span>
            <span v-else>Save </span>
        </button>
    </Form>
</template>

<style scoped></style>
