import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ordersApi } from "../api/ordersApi";

const initialForm = {
    senderCity: "",
    senderAddress: "",
    receiverCity: "",
    receiverAddress: "",
    weightKg: "",
    pickupDate: "",
};

export default function CreateOrderPage() {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = {
                ...form,
                weightKg: parseFloat(form.weightKg),
            };
            const order = await ordersApi.create(payload);
            navigate(`/orders/${order.id}`);
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Создать заказ</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Город отправителя</label>
                    <input name="senderCity" value={form.senderCity} onChange={handleChange} required />
                </div>
                <div>
                    <label>Адрес отправителя</label>
                    <input name="senderAddress" value={form.senderAddress} onChange={handleChange} required />
                </div>
                <div>
                    <label>Город получателя</label>
                    <input name="receiverCity" value={form.receiverCity} onChange={handleChange} required />
                </div>
                <div>
                    <label>Адрес получателя</label>
                    <input name="receiverAddress" value={form.receiverAddress} onChange={handleChange} required />
                </div>
                <div>
                    <label>Вес груза (кг)</label>
                    <input name="weightKg" type="number" step="0.1" min="0.1" value={form.weightKg} onChange={handleChange} required />
                </div>
                <div>
                    <label>Дата забора груза</label>
                    <input name="pickupDate" type="date" min={new Date().toISOString().split("T")[0]} value={form.pickupDate} onChange={handleChange} required />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? "Создание..." : "Создать"}
                </button>
                <button type="button" onClick={() => navigate("/orders")}>
                    Отмена
                </button>
            </form>
        </div>
    );
}