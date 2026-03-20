import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import FieldDetail from './pages/FieldDetail'
import Booking from "./pages/Booking"
import Payment from "./pages/Payment"
import Register from "./pages/Register"
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<Register />} />

        <Route path="/field-detail" element={<FieldDetail />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/payment" element={<Payment />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App