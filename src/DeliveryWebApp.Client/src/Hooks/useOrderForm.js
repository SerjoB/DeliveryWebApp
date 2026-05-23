import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ordersApi } from "../Api/ordersApi";

const initialForm = {
    senderCity: "",
    senderAddress: "",
    receiverCity: "",
    receiverAddress: "",
    weightKg: "",
    pickupDate: "",
};

const initialErrors = {
    senderCity: "",
    senderAddress: "",
    receiverCity: "",
    receiverAddress: "",
    weightKg: "",
    pickupDate: "",
    general: "",
};

const fieldMap = {
    SenderCity: "senderCity",
    SenderAddress: "senderAddress",
    ReceiverCity: "receiverCity",
    ReceiverAddress: "receiverAddress",
    WeightKg: "weightKg",
    PickupDate: "pickupDate",
};

export function useOrderForm() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState(initialErrors);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors(initialErrors);

        try {
            const payload = {
                ...form,
                weightKg: parseFloat(form.weightKg),
            };
            const order = await ordersApi.create(payload);
            navigate(`/orders/${order.orderNumber}`);
        } catch (e) {
            if (e.fields) {
                const newErrors = { ...initialErrors };
                Object.entries(e.fields).forEach(([key, messages]) => {
                    const fieldName = fieldMap[key];
                    if (fieldName) {
                        newErrors[fieldName] = messages[0];
                    }
                });
                setErrors(newErrors);
            } else {
                setErrors((prev) => ({ ...prev, general: e.message }));
            }
        } finally {
            setSubmitting(false);
        }
    };

    return { form, errors, submitting, today, handleChange, handleSubmit };
}