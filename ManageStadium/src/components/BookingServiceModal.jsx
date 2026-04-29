import "../styles/BookingServiceModal.css"

function BookingServiceModal({ services, handleSelectService, setShowServiceModal }) {
    const formatMoneyVND = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value) + "đ";
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Chọn dịch vụ</h3>

                <div className="service-list">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="service-item"
                            onClick={() => handleSelectService(service)}
                        >
                            <span>{service.name}</span>
                            <span>{formatMoneyVND(service.price)}</span>
                        </div>
                    ))}
                </div>

                <button
                    className="close-btn"
                    onClick={() => setShowServiceModal(false)}
                >
                    Đóng
                </button>
            </div>
        </div>
    )
};
export default BookingServiceModal;