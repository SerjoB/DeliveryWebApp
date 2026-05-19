import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ordersApi } from "../api/ordersApi";

export default function OrderListPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ordersApi.getAll()
            .then(setOrders)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Список заказов</h1>
                <button onClick={() => navigate("/orders/create")}>
                    Создать заказ
                </button>
            </div>

            {orders.length === 0 ? (
                <p>Заказов пока нет</p>
            ) : (
                <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
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
                            <td>{order.senderCity}, {order.senderAddress}</td>
                            <td>{order.receiverCity}, {order.receiverAddress}</td>
                            <td>{order.weightKg}</td>
                            <td>{order.pickupDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}