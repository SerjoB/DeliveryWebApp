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

export default function CreateOrderPage() {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title h3 mb-4">Создать заказ</h1>

                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <fieldset className="mb-3">
                                    <legend className="h6 text-muted">Отправитель</legend>
                                    <div className="mb-3">
                                        <label className="form-label">Город</label>
                                        <input
                                            className="form-control"
                                            name="senderCity"
                                            value={form.senderCity}
                                            onChange={handleChange}
                                            placeholder="Москва"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Адрес</label>
                                        <input
                                            className="form-control"
                                            name="senderAddress"
                                            value={form.senderAddress}
                                            onChange={handleChange}
                                            placeholder="ул. Ленина, д. 1"
                                            required
                                        />
                                    </div>
                                </fieldset>

                                <fieldset className="mb-3">
                                    <legend className="h6 text-muted">Получатель</legend>
                                    <div className="mb-3">
                                        <label className="form-label">Город</label>
                                        <input
                                            className="form-control"
                                            name="receiverCity"
                                            value={form.receiverCity}
                                            onChange={handleChange}
                                            placeholder="Санкт-Петербург"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Адрес</label>
                                        <input
                                            className="form-control"
                                            name="receiverAddress"
                                            value={form.receiverAddress}
                                            onChange={handleChange}
                                            placeholder="ул. Пушкина, д. 10"
                                            required
                                        />
                                    </div>
                                </fieldset>

                                <div className="mb-3">
                                    <label className="form-label">Вес груза (кг)</label>
                                    <input
                                        className="form-control"
                                        name="weightKg"
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        max="10000"
                                        value={form.weightKg}
                                        onChange={handleChange}
                                        placeholder="10.5"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Дата забора груза</label>
                                    <input
                                        className="form-control"
                                        name="pickupDate"
                                        type="date"
                                        min={today}
                                        value={form.pickupDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                                Создание...
                                            </>
                                        ) : "Создать"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate("/orders")}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}