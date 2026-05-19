import { useNavigate } from "react-router-dom";
import { ordersApi } from "../api/ordersApi";
import {useAsync} from "../hooks/useAsync.js";

export default function OrderListPage() {
    const { data: orders, loading, error } = useAsync(() => ordersApi.getAll());
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

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0">Список заказов</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/orders/create")}
                >
                    Создать заказ
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="alert alert-info">Заказов пока нет</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Номер заказа</th>
                            <th>Откуда</th>
                            <th>Куда</th>
                            <th>Вес (кг)</th>
                            <th>Дата забора</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                onClick={() => navigate(`/orders/${order.id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <td>{order.orderNumber}</td>
                                <td className="text-truncate-cell" title={`${order.senderCity}, ${order.senderAddress}`}>
                                    {order.senderCity}, {order.senderAddress}
                                </td>
                                <td className="text-truncate-cell" title={`${order.receiverCity}, ${order.receiverAddress}`}>
                                    {order.receiverCity}, {order.receiverAddress}
                                </td>
                                <td>{order.weightKg}</td>
                                <td>
                                    {new Date(order.pickupDate).toLocaleDateString("ru-RU", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}