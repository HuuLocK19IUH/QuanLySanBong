import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import FieldDetail from './pages/FieldDetail'
import Booking from "./pages/Booking"
import Payment from "./pages/Payment"
import CartPage from "./pages/CartPage"
import HistoryPage from "./pages/HistoryPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/field-detail" element={<FieldDetail />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/cart" element={<CartPage />} />
        
        <Route path="/history" element={<HistoryPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App