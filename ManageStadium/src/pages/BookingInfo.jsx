import { useState, useEffect } from "react";
import "../styles/Booking.css";

function BookingInfo() {

    // 👉 STATE
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState({
        start: "",
        end: ""
    });

    const [services, setServices] = useState([]);
    const [totalService, setTotalService] = useState(0);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const [timeCount, setTimeCount] = useState(""); // dạng "01h30"
    const [paid, setPaid] = useState(0);

    // 👉 TÍNH TỔNG TIỀN SERVICE
    useEffect(() => {
        const total = services.reduce((sum, s) => {
            return sum + s.price * s.qty;
        }, 0);

        setTotalService(total);
    }, [services]);

    // 👉 HÀM BACK
    const handleBack = () => {
        window.history.back();
    };

    // 👉 HÀM CONFIRM
    const handleConfirm = () => {
        if (!name || !phone) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const bookingData = {
            date: selectedDate,
            time: selectedTime,
            duration: timeCount,
            totalPrice: paid + totalService,
            services,
            name,
            phone,
            note
        };

        console.log("Booking:", bookingData);

        alert("Đặt sân thành công!");
    };

    return (
        <div className="booking-page">
            {/* HEADER */}
            <div className="booking-header">
                <div className="header-top">
                    <button className="back-btn" onClick={handleBack}>
                        <span className="chevron-left"></span>
                    </button>

                    <h1 className="main-title">Đặt lịch ngày trực quan</h1>
                </div>
            </div>

            <div className="booking-confirmation-container">

                {/* CARD 1 */}
                <div className="info-card">
                    <h3 className="card-title">
                        <i className="icon-doc"></i> Thông tin lịch đặt
                    </h3>

                    <div className="info-content-text">
                        <p>Ngày: <b>{selectedDate}</b></p> {/* prop */}

                        <p>
                            Sân cầu lông 4 người:
                            <b> {selectedTime.start} – {selectedTime.end}</b> {/* prop */}
                        </p>

                        <p>Tổng giờ: <b>{timeCount}</b></p> {/* prop */}

                        <div className="card-total-left">
                            Tổng tiền: {paid.toLocaleString()}đ  {/* prop */}
                        </div>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="info-card">
                    <h3 className="card-title">
                        <i className="icon-service"></i> Thông tin dịch vụ
                    </h3>

                    <p className="total-service-count">
                        Tổng dịch vụ: {services.length} 
                    </p>

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
                                <span className="col-price">
                                    {s.price.toLocaleString()}đ
                                </span>

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        const newS = [...services];
                                        newS.splice(i, 1);
                                        setServices(newS);
                                    }}
                                >
                                    🗑
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="card-footer-row">
                        <button className="add-service-btn-styled">
                            Thêm dịch vụ
                        </button>

                        <div className="card-total-right">
                            Tổng tiền: {totalService.toLocaleString()}đ
                        </div>
                    </div>
                </div>

                {/* INPUT */}
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
                                <img src="https://flagcdn.com/w20/vn.png" alt="VN" />
                                <span>+84</span>
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
                        <label className="outside-label">Ghi chú</label>
                        <textarea
                            className="custom-textarea"
                            placeholder="Nhập ghi chú"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <div className="order-footer">
                <button
                    className="confirm-btn-final"
                    onClick={handleConfirm}
                >
                    XÁC NHẬN & THANH TOÁN
                </button>
            </div>
        </div>
    );
}

export default BookingInfo;