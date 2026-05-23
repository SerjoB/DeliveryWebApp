import { config } from "../config.js"

const BASE_URL = config.apiUrl;
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        if (error.errors) {
            const validationError = new Error("Validation error");
            validationError.fields = error.errors;
            throw validationError;
        }

        throw new Error(error.message || "Ошибка сервера");
    }
    return response.json();
};
export const ordersApi = {
    getAll: (page = 1, pageSize = 10) =>
        fetch(`${BASE_URL}/orders?page=${page}&pageSize=${pageSize}`)
            .then(handleResponse),

    getByOrderNumber: (orderNumber) =>
        fetch(`${BASE_URL}/orders/${orderNumber}`).then(handleResponse),

    create: (data) =>
        fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
};