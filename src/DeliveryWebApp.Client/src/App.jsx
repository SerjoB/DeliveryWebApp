import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/orders" replace />} />
                <Route path="/orders" element={<OrderListPage />} />
                <Route path="/orders/create" element={<CreateOrderPage />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}