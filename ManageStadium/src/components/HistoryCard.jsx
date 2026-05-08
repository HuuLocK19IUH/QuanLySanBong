import "../styles/cartHistoryPages.css";

function HistoryCard({ booking, openDetail, openReview }) {
  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "Đang chờ duyệt";
      case "completed": return "Hoàn thành";
      case "expired": return "Đã hết hạn";
      case "paid": return "Đã thanh toán";
      case "cancelled": return "Không được duyệt";
      default: return status || "Không rõ";
    }
  };

  return (
    <div className="mh-card">
      <img className="mh-court-img" src={booking?.img} alt="" />

      <div className="mh-card-info">
        <h3>{booking?.title}</h3>
        <span className="mh-tag">{booking?.tag}</span>
        <p className="mh-date">Ngày sử dụng: {booking?.date}</p>
      </div>

      <div className="mh-card-right">
        <p className="mh-card-status">Trạng thái: {getStatusText(booking?.status)}</p>
        <div className="mh-btn-group">
          <button className="mh-btn mh-btn--small" onClick={openDetail}>
            Chi tiết
          </button>
          <button className="mh-btn mh-btn--small" onClick={openReview}>
            Đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;