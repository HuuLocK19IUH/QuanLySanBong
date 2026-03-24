import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Payment.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTime, services, name, phone, note, selectedDate } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(900);
  const orderId = "ORD" + Math.floor(Math.random() * 1000000);

  // State kiểm soát việc hiển thị modal thông báo thành công
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const courtPrice = 160000;
  const serviceTotal = services?.reduce((sum, s) => sum + s.price * s.qty, 0) || 0;
  const grandTotal = courtPrice + serviceTotal;

  // Hàm xử lý khi nhấn nút "THANH TOÁN"
  const handleConfirmPay = () => {
    // Trong thực tế, bạn sẽ gọi API thanh toán ở đây.
    // Nếu API thành công, bạn mới hiển thị modal.
    setShowSuccessModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Sau khi đóng modal, thường bạn sẽ chuyển người dùng về trang chủ hoặc trang lịch sử đặt sân.
    // navigate("/"); 
  };

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
                  <span>Tổng giờ: <b>1.5h</b></span>
                  <span>Tổng tiền: <b>{courtPrice.toLocaleString()}đ</b></span>
                </div>
                {/* Dòng Tổng dịch vụ */}
                <div className="invoice-row">
                  <span>Tổng dịch vụ: <b>{services?.length || 0}</b></span>
                </div>
                
                {/* Bảng Dịch Vụ */}
                <div className="invoice-table">
                  <div className="table-header-pay white-text">
                    <span>Số lượng</span>
                    <span>Dịch vụ</span>
                    <span className="text-right">Giá</span>
                  </div>
                  {services?.map((s, i) => (
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
                <p className="inline-field"><span>Tên người đặt sân:</span> <b>{name || "Chưa nhập"}</b></p>
                <p className="inline-field"><span>Số điện thoại:</span> <b>{phone || "Chưa nhập"}</b></p>
                <p className="inline-field"><span>Thời gian đặt sân:</span> <b>{selectedDate} | {selectedTime?.start} - {selectedTime?.end}</b></p>
                
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
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Dấu "×" trên cùng bên trái để tắt */}
            <button className="close-x" onClick={handleCloseModal}>×</button>
            
            {/* Biểu tượng tích xanh giống Figma */}
            <div className="checkmark-container">
              <span className="checkmark-icon">✔</span>
            </div>
            
            {/* Văn bản thông báo chính xác như Figma */}
            <p className="success-text">Bạn đã thanh toán thành công</p>
          </div>
        </div>
      )}

    </div>
  );
}