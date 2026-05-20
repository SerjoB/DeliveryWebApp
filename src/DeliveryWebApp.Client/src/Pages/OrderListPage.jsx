import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ordersApi } from "../api/ordersApi";
import { useAsync } from "../hooks/useAsync";

export default function OrderListPage() {
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const navigate = useNavigate();

    const { data, loading, error } = useAsync(
        () => ordersApi.getAll(page, pageSize),
        [page]
    );

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

            {data?.items?.length === 0 ? (
                <div className="alert alert-info">Заказов пока нет</div>
            ) : (
                <>
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
                            {data?.items?.map((order) => (
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
                                    <td>{new Date(order.pickupDate).toLocaleDateString("ru-RU", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-muted">
                            Всего заказов: {data?.totalCount}
                        </span>
                        <nav>
                            <ul className="pagination mb-0">
                                <li className={`page-item ${!data?.hasPrevious ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(p => p - 1)}
                                        disabled={!data?.hasPrevious}
                                    >
                                        ←
                                    </button>
                                </li>
                                {Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(p => (
                                    <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(p)}
                                        >
                                            {p}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${!data?.hasNext ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={!data?.hasNext}
                                    >
                                        →
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}