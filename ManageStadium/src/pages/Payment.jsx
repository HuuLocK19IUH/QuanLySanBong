import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/context/UserContext"
import "../styles/Payment.css";
import { createOrder } from "../api/ordersApi/createOrder.js";
import NoticeModalTrue from "../components/NoticeModalTrue.jsx";
import NoticeModalFalse from "../components/NoticeModalFalse.jsx";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const {
    selectedTime,
    selectedDate,
    timeCount,
    paid,
    totalService,
    idSportfield,
    phone,
    returnservices,
    note
  } = location.state || {};


  const [timeLeft, setTimeLeft] = useState(15);
  const [orderId, setOrderId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnSuccessModal, setShowUnSuccessModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer); // dừng khi về 0
          setShowUnSuccessModal(true);
          console.log("Đã về 0");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const serviceTotal = returnservices?.reduce((sum, s) => sum + s.price * s.qty, 0) || 0;
  const grandTotal = paid + serviceTotal;

  const formatDateTime = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split("-");

    let [hour, minute] = timeStr.trim().replace("h", ":").split(":");

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );

    // bù timezone VN (+7)
    const vnOffset = 7 * 60; // phút
    const localOffset = date.getTimezoneOffset(); // phút

    return new Date(date.getTime() + (localOffset + vnOffset) * 60000)
      .toISOString();
  };

  const handleConfirmPay = async () => {
    try {
      const orderData = {
        id_user: user.id_user,
        id_sportfield: idSportfield,
        phone,
        note: note || "",

        start_hour: formatDateTime(selectedDate, selectedTime.start),
        end_hour: formatDateTime(selectedDate, selectedTime.end),

        total_hourly_cost: paid,

        services: (returnservices || []).map((s) => ({
          service_id: s.service_id,
          service_name: s.name,
          quantity: Number(s.qty || 1),
          price: Number(s.price || 0),
          service_cost: Number(s.price || 0) * Number(s.qty || 1),
        })),

        total_order: grandTotal,
      };

      const data = await createOrder(orderData);

      setOrderId(data.data?.id_order);
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Create order error:", error.response?.data?.message || error.message);
    }
  };

  // Hàm đóng modal
  const handleCloseTrueModal = () => {
    setShowSuccessModal(false);
    navigate("/history")
  };

  const handleCloseFalseModal = () => {
    setShowUnSuccessModal(false);
    navigate("/")
  };
  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="payment-page">
      {/* HEADER NỀN XANH */}
      <header className="payment-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="chevron-left"></span>
          </button>
          <h1 className="payment-title-yellow">THANH TOÁN</h1>
          <div className="step-dots">
            <span className="dot"></span>
            <span className="dot active"></span>
          </div>
        </div>
      </header>

      {/* MAIN NỀN TRẮNG */}
      <main className="payment-main">
        <div className="payment-grid">
          {/* CỘT TRÁI */}
          <div className="column-left">
            {/* CARD 1: TÀI KHOẢN NGÂN HÀNG */}
            <div className="pay-card">
              <h3 className="pay-card-title">Tài khoản ngân hàng</h3>
              <div className="bank-info-container">
                <div className="bank-text">
                  <p>Tên tài khoản: <b>QUÁCH NGỌC LONG</b></p>
                  <p>Số tài khoản: <b>0933354446</b></p>
                  <p>Ngân hàng: <b>MB BANK</b></p>
                </div>
                <div className="qr-wrapper">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=pay" alt="QR" />
                </div>
              </div>
            </div>

            {/* CARD 2: THÔNG TIN HÓA ĐƠN */}
            <div className="pay-card">
              <h3 className="pay-card-title">Thông tin hóa đơn</h3>
              <div className="invoice-details">
                {/* Dòng Tổng giờ & Tổng tiền */}
                <div className="invoice-row">
                  <span>Tổng giờ: <b>{timeCount}</b></span>
                  <span>Tổng tiền: <b>{paid.toLocaleString()}đ</b></span>
                </div>
                {/* Dòng Tổng dịch vụ */}
                <div className="invoice-row">
                  <span>Tổng dịch vụ: <b>{returnservices?.length || 0}</b></span>
                </div>

                {/* Bảng Dịch Vụ */}
                <div className="invoice-table">
                  <div className="table-header-pay white-text">
                    <span>Số lượng</span>
                    <span>Dịch vụ</span>
                    <span className="text-right">Giá</span>
                  </div>
                  {returnservices?.map((s, i) => (
                    <div key={i} className="table-row-pay white-text">
                      <span>x{s.qty}</span>
                      <span>{s.name}</span>
                      <span className="text-right">{(s.price * s.qty).toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>

                {/* Tổng tiền dịch vụ & Tổng đơn */}
                <div className="invoice-row right-align">
                  <span>Tổng tiền dịch vụ: <b>{serviceTotal.toLocaleString()}đ</b></span>
                </div>
                <div className="invoice-row right-align">
                  <span className="pay-card-title total-order-text">Tổng đơn: {grandTotal.toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            {/* THỜI GIAN GIỮ CHỖ NẰM BÊN TRÁI, DƯỚI HÓA ĐƠN */}
            <div className="timer-container-left">
              <p>Thời gian giữ chỗ còn lại: <span className="timer-red">{formatTime(timeLeft)}</span></p>
            </div>
          </div>

          {/* CỘT PHẢI */}
          <div className="column-right">
            <div className="pay-card">
              <h3 className="pay-card-title">Thông tin đặt sân</h3>
              <div className="booking-summary">
                <p className="inline-field"><span>Mã đơn:</span> <b>{orderId}</b></p>
                <p className="inline-field"><span>Tên người đặt sân:</span> <b>{user.name}</b></p>
                <p className="inline-field"><span>Số điện thoại:</span> <b>{phone || "Chưa nhập"}</b></p>
                <p className="inline-field"><span>Thời gian đặt sân:</span> <b>{formatDate(selectedDate)} | {selectedTime?.start} - {selectedTime?.end}</b></p>

                {/* Ghi chú có tiêu đề vàng */}
                <h4 className="pay-card-title note-title">Ghi chú</h4>
                <textarea className="pay-note-view" value={note || "Không có ghi chú"} readOnly />
              </div>
            </div>

            {/* LƯU Ý NẰM BÊN PHẢI, DƯỚI ĐẶT SÂN */}
            <div className="note-container-right">
              <p>* Lưu ý: Kiểm tra số tiền trước khi chuyển khoản</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="payment-footer-white">
        <div className="footer-btns-right">
          <button className="btn-cancel-red" onClick={() => navigate(-1)}>HỦY</button>
          <button className="btn-confirm-pay-green" onClick={handleConfirmPay}>
            THANH TOÁN
          </button>
        </div>
      </footer>

      {/* --- MODAL THÔNG BÁO THÀNH CÔNG (Click overlay để tắt) --- */}
      {showSuccessModal && (
        <NoticeModalTrue handleCloseModal={handleCloseTrueModal} text={"Bạn đã thanh toán thành công"} />
      )}
      {showUnSuccessModal && (
        <NoticeModalFalse handleCloseModal={handleCloseFalseModal} text={"Bạn đã hết thời gian thanh toán"} />
      )}
    </div>
  );
}