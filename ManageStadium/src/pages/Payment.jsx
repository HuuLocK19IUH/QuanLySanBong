import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import '../styles/Booking_Payment.css'
export default function Payment() {

  const location = useLocation()

  const { selectedTime, services, name, phone, note, totalOrder } =
    location.state || {}

  const [timeLeft, setTimeLeft] = useState(900)

  const [success, setSuccess] = useState(false)

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1)
    }, 1000)

    return () => clearInterval(timer)

  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (

    <div className="payment-page">

      <h2>Thanh toán</h2>

      <div className="payment-grid">

        <div className="card">

          <h3>Tài khoản ngân hàng</h3>

          <p>Tên: Quach Ngoc Long</p>

          <p>STK: 0933354446</p>

          <p>MB Bank</p>

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bank"
          />

        </div>

        <div className="card">

          <h3>Thông tin đặt sân</h3>

          <p>Tên: {name}</p>

          <p>SĐT: {phone}</p>

          <p>Thời gian: {selectedTime?.start} - {selectedTime?.end}</p>

          <textarea value={note} readOnly />

        </div>

      </div>

      <div className="card invoice">

        <h3>Thông tin hóa đơn</h3>

        {services?.map((s, i) => (
          <div key={i}>

            x{s.qty} {s.name} {s.price}

          </div>
        ))}

        <h2>Tổng đơn: {totalOrder?.toLocaleString()}đ</h2>

      </div>

      <p className="countdown">

        Thời gian giữ chỗ còn lại:
        {minutes}:{seconds.toString().padStart(2, '0')}

      </p>

      <div className="payment-actions">

        <button className="cancel">Huỷ</button>

        <button
          className="pay"
          onClick={() => setSuccess(true)}
        >
          THANH TOÁN
        </button>

      </div>

      {success && (

        <div className="success-modal">

          <div className="success-box">

            <div className="icon">✓</div>

            <h3>Bạn đã thanh toán thành công</h3>

          </div>

        </div>

      )}

    </div>

  )
}