import { useEffect, useState } from "react";
import "../styles/Booking.css";
import { useLocation, useNavigate } from "react-router-dom";
import BookingServiceModal from "../components/BookingServiceModal";
import { getServices } from "../api/serviceApi/getService";
import { useUser } from "../hooks/context/UserContext";

function BookingInfo() {

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUser();
    const [selectedDate] = useState(
        location.state?.selectedDate || ""
    );

    const [selectedTime] = useState(
        location.state?.selectedTime || { start: "", end: "" }
    );

    const [timeCount] = useState(
        location.state?.timeCount || 0
    );

    const [paid] = useState(
        location.state?.paid || false
    );

    const [idSportfield] = useState(
        location.state?.id || null
    );
    console.log(idSportfield)

    const [totalService, setTotalService] = useState(0);

    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");

    const [services, setServices] = useState([]);
    const [returnservices, setReturnservices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataServices = await getServices();
                if (dataServices) {
                    setServices(dataServices);
                }
                if (user?.phone_number) {
                    setPhone(user.phone_number);
                } else {
                    setPhone("");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [user]);

    const [showServiceModal, setShowServiceModal] = useState(false);
    // 👉 HÀM BACK
    const handleBack = () => {
        window.history.back();
    };

    function formatDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    }


    const handleSelectService = (service) => {
        setReturnservices((prev) => {
            const index = prev.findIndex(item => item._id === service._id);

            let updatedServices;

            if (index !== -1) {
                // đã tồn tại → cập nhật qty + price
                updatedServices = [...prev];
                updatedServices[index] = {
                    ...updatedServices[index],
                    qty: (updatedServices[index].qty || 0) + 1,
                    price: (updatedServices[index].price || 0) + service.price,
                };
            } else {
                // chưa có → thêm mới
                updatedServices = [
                    { ...service, qty: 1 },
                    ...prev
                ];
            }

            // tính lại total
            const total = updatedServices.reduce((sum, item) => {
                return sum + (item.price || 0);
            }, 0);

            setTotalService(total);

            return updatedServices;
        });

        setShowServiceModal(false);
    };

    const handleConfirm = () => {
        if (!phone) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        const bookingData = {
            selectedDate,
            selectedTime,
            timeCount,
            paid,
            totalService,
            idSportfield,
            phone,
            returnservices,
            note,
            name,
        };

        console.log("Booking:", bookingData);

        navigate("/payment", {
            state: bookingData
        });
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
                        <p>Ngày: <b>{formatDate(selectedDate)}</b></p> {/* prop */}

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
                        Tổng dịch vụ: {returnservices.length}
                    </p>

                    <div className="services-table">
                        <div className="table-header">
                            <span className="col-qty">Số lượng</span>
                            <span className="col-name">Dịch vụ</span>
                            <span className="col-price">Giá</span>
                            <span className="col-action"></span>
                        </div>

                        {returnservices.map((s, i) => (
                            <div key={i} className="table-row">
                                <span className="col-qty">x{s.qty}</span>
                                <span className="col-name">{s.name}</span>
                                <span className="col-price">
                                    {s.price.toLocaleString()}đ
                                </span>

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        const newReturnService = [...returnservices];
                                        newReturnService.splice(i, 1);
                                        setReturnservices(newReturnService);
                                    }}
                                >
                                    🗑
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="card-footer-row">
                        <button
                            className="add-service-btn-styled"
                            onClick={() => setShowServiceModal(true)}
                        >
                            Thêm dịch vụ
                        </button>
                        {showServiceModal && (
                            <BookingServiceModal
                                services={services}
                                handleSelectService={handleSelectService}
                                setShowServiceModal={setShowServiceModal}
                            />
                        )}
                        <div className="card-total-right">
                            Tổng tiền: {totalService.toLocaleString()}đ
                        </div>
                    </div>
                </div>

                {/* INPUT */}
                <div className="input-group-outside">

                    <div className="input-field-wrapper">
                        <label className="outside-label">SĐT</label>

                        <div className="phone-input-wrapper">
                            <div className="country-selector">
                                <img src="https://flagcdn.com/w20/vn.png" alt="VN" />
                                <span>+84</span>
                            </div>

                            <input
                                className="custom-input phone-field"
                                placeholder={user?.phone}
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