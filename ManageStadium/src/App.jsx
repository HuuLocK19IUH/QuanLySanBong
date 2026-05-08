import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import FieldDetail from './pages/FieldDetail'
import Payment from "./pages/Payment"
import Register from "./pages/Register"
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import BookingDetailPage from "./pages/BookingDetailPage";
import UserInfo from "./pages/UserInfo"
import { UserProvider } from "./hooks/context/UserContext";
import CalendarBooking from "./pages/CalendarBooking"
import BookingInfo from "./pages/BookingInfo"
import NewLandingpage from "./pages/NewLandingpage";
import ApplyOrderPage from "./pages/ApplyOrderPage";
import AddSportFieldPage from "./pages/AddSportFieldPage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<Register />} />

          <Route path="/field-detail" element={<FieldDetail />} />

          <Route path="/field-detail/:id" element={<FieldDetail />} />

          <Route path="/payment" element={<Payment />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/history" element={<HistoryPage />} />

          <Route path="/booking-detail" element={<BookingDetailPage />} />

          <Route path="/user-info" element={<UserInfo />} />

          <Route path="/calendar-booking" element={<CalendarBooking />} />

          <Route path="/info-booking" element={<BookingInfo />} />

          <Route path="/" element={<NewLandingpage />} />

          <Route path="/admin/apply-order" element={<ApplyOrderPage />} />
          
          <Route path="/admin/add-sportfield" element={<AddSportFieldPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App;