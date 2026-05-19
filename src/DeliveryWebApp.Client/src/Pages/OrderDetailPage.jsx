import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ordersApi } from "../api/ordersApi";

export default function OrderDetailPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ordersApi.getById(id)
            .then(setOrder)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!order) return <p>Заказ не найден</p>;

    return (
        <div>
            <button onClick={() => navigate("/orders")}>← Назад</button>
            <h1>Заказ {order.orderNumber}</h1>
            <table border="1" cellPadding="8">
                <tbody>
                <tr><td>Номер заказа</td><td>{order.orderNumber}</td></tr>
                <tr><td>Город отправителя</td><td>{order.senderCity}</td></tr>
                <tr><td>Адрес отправителя</td><td>{order.senderAddress}</td></tr>
                <tr><td>Город получателя</td><td>{order.receiverCity}</td></tr>
                <tr><td>Адрес получателя</td><td>{order.receiverAddress}</td></tr>
                <tr><td>Вес груза (кг)</td><td>{order.weightKg}</td></tr>
                <tr><td>Дата забора</td><td>{order.pickupDate}</td></tr>
                <tr><td>Дата создания</td><td>{new Date(order.createdAt).toLocaleString("ru-RU")}</td></tr>
                </tbody>
            </table>
        </div>
    );
}