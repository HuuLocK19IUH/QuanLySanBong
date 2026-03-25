import { useLocation, useNavigate } from "react-router-dom"
import Taskbar from "../components/Taskbar"
import BookingDetailModal from "../components/BookingDetailModal"
import Footer from "../components/Footer"
import HistoryCard from "../components/HistoryCard"
import "../styles/cartHistoryPages.css"

function BookingDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const booking = location.state?.booking

  const bookings = [
    {
      id: 1,
      code: "#232",
      title: "Sân cầu lông 4 người",
      tag: "Cầu lông",
      date: "06/03/2026",
      status: "hoàn thành",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      userName: "Quách Ngọc Long",
      phone: "0933544446",
      timeText: "17h - 18h30 - 06/03/2026",
      bill: {
        totalHoursText: "17h - 18h30 (1h30)",
        totalServicesQty: 1,
        items: [
          { qty: 1, name: "Cầu lông", price: 200000 },
          { qty: 3, name: "Suối Dasani nhỏ", price: 10000 }
        ],
        totalService: 230000,
        totalOrder: 290000
      }
    },
    {
      id: 2,
      code: "#233",
      title: "Sân cầu lông 4 người",
      tag: "Cầu lông",
      date: "06/03/2026",
      status: "hoàn thành",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      userName: "Quách Ngọc Long",
      phone: "0933544446",
      timeText: "18h - 19h30 - 06/03/2026",
      bill: {
        totalHoursText: "18h - 19h30 (1h30)",
        totalServicesQty: 1,
        items: [{ qty: 1, name: "Cầu lông", price: 200000 }],
        totalService: 200000,
        totalOrder: 260000
      }
    },
    {
      id: 3,
      code: "#234",
      title: "Sân cầu lông 4 người",
      tag: "Cầu lông",
      date: "06/03/2026",
      status: "hoàn thành",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      userName: "Quách Ngọc Long",
      phone: "0933544446",
      timeText: "19h - 20h30 - 06/03/2026",
      bill: {
        totalHoursText: "19h - 20h30 (1h30)",
        totalServicesQty: 1,
        items: [{ qty: 1, name: "Cầu lông", price: 200000 }],
        totalService: 200000,
        totalOrder: 260000
      }
    },
    {
      id: 4,
      code: "#235",
      title: "Sân cầu lông 4 người",
      tag: "Cầu lông",
      date: "06/03/2026",
      status: "hoàn thành",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      userName: "Quách Ngọc Long",
      phone: "0933544446",
      timeText: "20h - 21h30 - 06/03/2026",
      bill: {
        totalHoursText: "20h - 21h30 (1h30)",
        totalServicesQty: 1,
        items: [{ qty: 1, name: "Cầu lông", price: 200000 }],
        totalService: 200000,
        totalOrder: 260000
      }
    }
  ]

  return (
    <div className="mh-page">
      <Taskbar />

      <div className="mh-main">
        <div className="mh-panel">
          <h2 className="mh-page-title">Chi tiết lịch sử đặt sân</h2>

          <div className="mh-secondary-search">
            <div className="mh-search-icon" />
            <input type="text" placeholder="Tìm kiếm theo loại sân" />
          </div>

          <div className="mh-list">
            {bookings.map((b) => (
              <HistoryCard
                key={b.id}
                booking={b}
                openDetail={() =>
                  navigate("/booking-detail", {
                    state: { booking: b }
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {booking && (
        <BookingDetailModal
          booking={booking}
          onClose={() => navigate("/history")}
        />
      )}
    </div>
  )
}

export default BookingDetailPage

