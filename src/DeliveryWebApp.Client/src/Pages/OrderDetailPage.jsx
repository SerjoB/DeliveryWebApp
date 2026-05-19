import { useNavigate, useParams } from "react-router-dom";
import { ordersApi } from "../Api/ordersApi";
import {useAsync} from "../Hooks/useAsync.js";

export default function OrderDetailPage() {
    const { id } = useParams();
    const { data: order, loading, error } = useAsync(() => ordersApi.getById(id), [id]);
    const navigate = useNavigate();

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    if (!order) return (
        <div className="container mt-4">
            <div className="alert alert-warning">Заказ не найден</div>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 className="card-title h3 mb-0">
                                    Заказ {order.orderNumber}
                                </h1>
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => navigate("/orders")}
                                >
                                    ← Назад
                                </button>
                            </div>

                            <h6 className="text-muted mb-2">Отправитель</h6>
                            <dl className="row mb-3">
                                <dt className="col-sm-4">Город</dt>
                                <dd className="col-sm-8">{order.senderCity}</dd>
                                <dt className="col-sm-4">Адрес</dt>
                                <dd className="col-sm-8">{order.senderAddress}</dd>
                            </dl>

                            <hr />

                            <h6 className="text-muted mb-2">Получатель</h6>
                            <dl className="row mb-3">
                                <dt className="col-sm-4">Город</dt>
                                <dd className="col-sm-8">{order.receiverCity}</dd>
                                <dt className="col-sm-4">Адрес</dt>
                                <dd className="col-sm-8">{order.receiverAddress}</dd>
                            </dl>

                            <hr />

                            <h6 className="text-muted mb-2">Груз</h6>
                            <dl className="row mb-3">
                                <dt className="col-sm-4">Вес (кг)</dt>
                                <dd className="col-sm-8">{order.weightKg}</dd>
                                <dt className="col-sm-4">Дата забора</dt>
                                <dd className="col-sm-8">
                                    {new Date(order.pickupDate).toLocaleDateString("ru-RU", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })}
                                </dd>
                            </dl>

                            <hr />

                            <h6 className="text-muted mb-2">Системная информация</h6>
                            <dl className="row">
                                <dt className="col-sm-4">Номер заказа</dt>
                                <dd className="col-sm-8">{order.orderNumber}</dd>
                                <dt className="col-sm-4">Дата создания</dt>
                                <dd className="col-sm-8">
                                    {new Date(order.createdAt).toLocaleString("ru-RU")}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}