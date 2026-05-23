import { useNavigate } from "react-router-dom";
import { useOrderForm } from "../Hooks/useOrderForm";

export default function CreateOrderPage() {
    const navigate = useNavigate();
    const { form, errors, submitting, today, handleChange, handleSubmit } = useOrderForm();

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title h3 mb-4">Создать заказ</h1>

                            {errors.general && (
                                <div className="alert alert-danger">{errors.general}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <fieldset className="mb-3">
                                    <legend className="h6 text-muted">Отправитель</legend>
                                    <div className="mb-3">
                                        <label className="form-label">Город</label>
                                        <input
                                            className={`form-control ${errors.senderCity ? "is-invalid" : ""}`}
                                            name="senderCity"
                                            value={form.senderCity}
                                            onChange={handleChange}
                                            placeholder="Москва"
                                            required
                                        />
                                        {errors.senderCity && (
                                            <div className="invalid-feedback">{errors.senderCity}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Адрес</label>
                                        <input
                                            className={`form-control ${errors.senderAddress ? "is-invalid" : ""}`}
                                            name="senderAddress"
                                            value={form.senderAddress}
                                            onChange={handleChange}
                                            placeholder="ул. Ленина, д. 1"
                                            required
                                        />
                                        {errors.senderAddress && (
                                            <div className="invalid-feedback">{errors.senderAddress}</div>
                                        )}
                                    </div>
                                </fieldset>

                                <fieldset className="mb-3">
                                    <legend className="h6 text-muted">Получатель</legend>
                                    <div className="mb-3">
                                        <label className="form-label">Город</label>
                                        <input
                                            className={`form-control ${errors.receiverCity ? "is-invalid" : ""}`}
                                            name="receiverCity"
                                            value={form.receiverCity}
                                            onChange={handleChange}
                                            placeholder="Санкт-Петербург"
                                            required
                                        />
                                        {errors.receiverCity && (
                                            <div className="invalid-feedback">{errors.receiverCity}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Адрес</label>
                                        <input
                                            className={`form-control ${errors.receiverAddress ? "is-invalid" : ""}`}
                                            name="receiverAddress"
                                            value={form.receiverAddress}
                                            onChange={handleChange}
                                            placeholder="ул. Пушкина, д. 10"
                                            required
                                        />
                                        {errors.receiverAddress && (
                                            <div className="invalid-feedback">{errors.receiverAddress}</div>
                                        )}
                                    </div>
                                </fieldset>

                                <div className="mb-3">
                                    <label className="form-label">Вес груза (кг)</label>
                                    <input
                                        className={`form-control ${errors.weightKg ? "is-invalid" : ""}`}
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
                                    {errors.weightKg && (
                                        <div className="invalid-feedback">{errors.weightKg}</div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Дата забора груза</label>
                                    <input
                                        className={`form-control ${errors.pickupDate ? "is-invalid" : ""}`}
                                        name="pickupDate"
                                        type="date"
                                        min={today}
                                        value={form.pickupDate}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.pickupDate && (
                                        <div className="invalid-feedback">{errors.pickupDate}</div>
                                    )}
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