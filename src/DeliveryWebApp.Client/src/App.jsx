import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OrderListPage from "./pages/OrderListPage";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrderListPage />} />
        </Routes>
      </BrowserRouter>
  );
}