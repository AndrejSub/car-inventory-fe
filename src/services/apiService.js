import axios from "axios";
import { useToast } from "vue-toast-notification";

const API_BASE_URL = "http://car-inventory-be.test";

export const fetchData = async (resource) => {
    try {
        let response;
        if (resource.startsWith("http")) {
            response = await axios.get(resource);
        } else {
            response = await axios.get(`${API_BASE_URL}/api/${resource}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Error when getting data ${resource}:`, error);
        throw new Error("Could not fetch data.");
    }
};

export const deleteData = async (resource, id) => {
    const $toast = useToast();
    if (!confirm(`You sure you want to delete this ?`)) return;

    try {
        await axios.delete(`${API_BASE_URL}/api/${resource}/${id}`);
        $toast.open({
            duration: 4000,
            position: "top-right",
            message: "Successfully deleted",
            type: "success"
        });
        return true; // Úspešné vymazanie
    } catch (error) {
        console.error(`Error when deleting ${resource}/${id}:`, error);
        $toast.open({
            duration: 4000,
            position: "top-right",
            message: "Error when deleting",
            type: "error"
        });
        alert("Could not delete this!");
        throw error;
    }
};

export const postOrUpdateData = async (
    data,
    resource,
    isSubmitting,
    errorMessage,
    message,
    method
) => {
    const $toast = useToast();
    try {
        let response;
        if (method === "POST") {
            response = await axios.post(`${API_BASE_URL}/api/${resource}`, data);
        } else {
            response = await axios.patch(`${API_BASE_URL}/api/${resource}`, data);
        }

        $toast.open({
            duration: 4000,
            position: "top-right",
            message: message,
            type: "success"
        });
        return response.data;
    } catch (error) {
        $toast.open({
            duration: 4000,
            position: "top-right",
            message: "Could not send form ",
            type: "error"
        });
        console.error(" error when sending form:", error.response?.data || error.message);
        errorMessage.value = error.response?.data?.message || " Could not create.";
    } finally {
        isSubmitting.value = false;
    }
};
