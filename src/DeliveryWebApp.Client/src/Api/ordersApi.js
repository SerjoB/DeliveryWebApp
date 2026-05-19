import { config } from "../config.js"

const BASE_URL = config.apiUrl;
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        
        if (error.errors) {
            const messages = Object.values(error.errors).flat().join(", ");
            throw new Error(messages);
        }
        
        throw new Error(error.message || "Ошибка сервера");
    }
    return response.json();
};

export const ordersApi = {
    getAll: () =>
        fetch(`${BASE_URL}/orders`).then(handleResponse),

    getById: (id) =>
        fetch(`${BASE_URL}/orders/${id}`).then(handleResponse),

    create: (data) =>
        fetch(`${BASE_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(handleResponse),
};