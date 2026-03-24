import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Booking.css"

export default function Booking() {

  const [selectedDate, setSelectedDate] = useState("2026-03-06")
  const [selectedIndex, setSelectedIndex] = useState(null)
  const getSlotStatus = (index) => {
    if (index >= 24 && index <= 27) return "booked"
    if (index === 32 || index === 33) return "booked"
    if (index >= 6 && index <= 10) return "locked"
    return "empty"
  }

  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const [selectedTime, setSelectedTime] = useState({
    start: "17:00",
    end: "18:30"
  })

  const [services, setServices] = useState([
    { name: "Cầu lông", price: 200000, qty: 1 },
    { name: "Suối danasi nhỏ", price: 10000, qty: 3 }
  ])

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [note,setNote] = useState("")

  // Hàm kiểm tra Regex
  const handleConfirm = () => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/
    if (name.trim().length < 2) {
      alert("Vui lòng nhập tên hợp lệ (tối thiểu 2 ký tự)")
      return
    }
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không đúng định dạng Việt Nam")
      return
    }
    
    // Nếu OK thì chuyển trang
    navigate("/payment", {
      state: { selectedTime, services, name, phone, note, totalOrder }
    })
  }

  const totalService = services.reduce((t,s)=>t+s.price*s.qty,0)
  const totalOrder = totalService + 60000

  // Trong Booking.jsx, cập nhật lại mảng timeSlots
  const timeSlots = [
    "5:00", "5:30", "6:00", "6:30", "7:00", "7:30",
    "8:00", "8:30", "9:00", "9:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00",
    "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", 
    "21:00", "21:30", "22:00", "22:30", "23:00" // Đã thêm đến 23:00
  ];


  // Logic nút Back
  const handleBack = () => {
    if (step === 2) setStep(1)
    else navigate(-1)
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="header-top">
          <button className="back-btn" onClick={handleBack}>
            <span className="chevron-left"></span>
          </button>
          <h1 className="main-title">Đặt lịch ngày trực quan</h1>
          {step === 1 && (
            <div className="calendar-wrapper">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="calendar-input"
              />
            </div>
          )}
          {step === 2 && <div style={{ width: "60px" }}></div>}
        </div>

        {step === 1 && (
          <div className="legend">
            <div className="legend-item"><span className="box empty"></span> Trống</div>
            <div className="legend-item"><span className="box booked"></span> Đã đặt</div>
            <div className="legend-item"><span className="box locked"></span> Khóa</div>
          </div>
        )}
      </div>

      {step === 1 ? (
        <>
          <div className="time-axis-container">
            <div className="time-axis">
              {timeSlots.map((t, i) => {
                const status = getSlotStatus(i);
                return (
                  <div
                    key={i}
                    className={`time-slot ${status} ${selectedIndex === i ? "active" : ""}`}
                    onClick={() => {
                      if (status === "empty") {
                        setSelectedIndex(i);
                        setSelectedTime({
                          start: t,
                          end: timeSlots[i + 3] || timeSlots[timeSlots.length - 1]
                        });
                      }
                    }}
                  >
                    <span className="time-label">{t}</span>
                    <div className="status-bar"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vùng màu trắng ở giữa */}
          <div className="white-content-area"></div>

          <div className="order-footer">
            <div className="footer-info">
              <b className="footer-time">Thời gian: {selectedTime.start} - {selectedTime.end}</b>
              <p className="footer-duration">Tổng giờ: 1h30</p>
            </div>

            <div className="footer-action">
              <p className="footer-price">Tổng tiền: 160.000đ</p>
              <button className="order-btn" onClick={() => setStep(2)}>
                TIẾP THEO
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="booking-confirmation-container">
            {/* CARD 1: Thông tin lịch đặt */}
            <div className="info-card">
              <h3 className="card-title">
                <i className="icon-doc"></i> Thông tin lịch đặt
              </h3>
              <div className="info-content-text">
                <p>Ngày: <b>{selectedDate}</b></p>
                <p>Sân cầu lông 4 người: <b>{selectedTime.start} – {selectedTime.end}</b></p>
                <p>Tổng giờ: <b>1h30</b></p>
                <div className="card-total-left">
                  Tổng tiền: 160.000đ
                </div>
              </div>
            </div>

            {/* CARD 2: Thông tin dịch vụ */}
            <div className="info-card">
              <h3 className="card-title">
                <i className="icon-service"></i> Thông tin dịch vụ
              </h3>
              <p className="total-service-count">Tổng dịch vụ: {services.length}</p>
              
              <div className="services-table">
                <div className="table-header">
                  <span className="col-qty">Số lượng</span>
                  <span className="col-name">Dịch vụ</span>
                  <span className="col-price">Giá</span>
                  <span className="col-action"></span>
                </div>
                {services.map((s, i) => (
                  <div key={i} className="table-row">
                    <span className="col-qty">x{s.qty}</span>
                    <span className="col-name">{s.name}</span>
                    <span className="col-price">{s.price.toLocaleString()}đ</span>
                    <button className="delete-btn" onClick={() => {
                      const newS = [...services];
                      newS.splice(i, 1);
                      setServices(newS);
                    }}>🗑</button>
                  </div>
                ))}
              </div>
              
              <div className="card-footer-row">
                <button className="add-service-btn-styled">Thêm dịch vụ</button>
                <div className="card-total-right">
                  Tổng tiền: {totalService.toLocaleString()}đ
                </div>
              </div>
            </div>

            {/* INPUTS CÓ NHÃN BÊN NGOÀI */}
            <div className="input-group-outside">
              <div className="input-field-wrapper">
                <label className="outside-label">Tên người đặt sân</label>
                <input
                  className="custom-input"
                  placeholder="Nhập tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="input-field-wrapper">
                <label className="outside-label">SĐT</label>
                <div className="phone-input-wrapper">
                  <div className="country-selector">
                    <img src="https://flagcdn.com/w20/vn.png" alt="VN Flag" className="flag-icon" />
                    <span className="country-code">+ 84</span>
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  <input
                    className="custom-input phone-field"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-field-wrapper">
                <label className="outside-label">Ghi chú cho chủ sân</label>
                <textarea
                  className="custom-textarea"
                  placeholder="Nhập ghi chú"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* FOOTER GIỐNG BƯỚC 1 */}
          <div className="order-footer">
            <div className="footer-action">
              <button className="confirm-btn-final" onClick={handleConfirm}>
                XÁC NHẬN & THANH TOÁN
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}