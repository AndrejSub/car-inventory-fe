<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import { postOrUpdateData } from "@/services/apiService.js";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
    id: {
        type: Number
    },
    part: {
        type: Object,
        default: { name: "", serial_number: "" }
    },
    method: {
        type: String,
        default: "POST"
    },
    route: {
        type: String,
        default: "parts"
    },
    message: {
        type: String,
        default: "Part was successfully added"
    }
});
const emit = defineEmits(["part-added"]);

const validationSchema = yup.object({
    name: yup.string().required("Part name is required"),
    serial_number: yup.string().required()
});

const isSubmitting = ref(false);
const errorMessage = ref("");

const submitForm = async (values) => {
    isSubmitting.value = true;
    errorMessage.value = "";
    values.car_id = props.id != null ? props.id : props.part["car"]["id"];
    try {
        const response = await postOrUpdateData(
            values,
            props.route,
            isSubmitting,
            errorMessage,
            props.message,
            props.method
        );
        emit("part-added", response.data); // Odoslanie dát do  parent componentu

        if (props.method === "PATCH") {
            if (response) {
                await router.push(`/cars/${values.car_id}`);
            }
        }
    } catch (error) {
        console.error("Error adding part:", error);
    }
};
</script>

<template>
    <Form v-slot="{ values }" :validation-schema="validationSchema" @submit="submitForm">
        <div class="mb-3">
            <label class="form-label">Part name</label>
            <Field
                v-model="values.name"
                :model-value="props.part.name"
                name="name"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <div class="mb-3">
            <label class="form-label">Serial number </label>
            <Field
                v-model="values.serial_number"
                :model-value="props.part.serial_number"
                name="serial_number"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="serial_number" class="text-danger" />
        </div>

        <!--Error message-->
        <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">🔄 Ukladám...</span>
            <span v-else>💾 Uložiť</span>
        </button>
    </Form>
</template>

<style scoped></style>
