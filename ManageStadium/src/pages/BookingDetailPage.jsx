import { useLocation, useNavigate } from "react-router-dom";
import Taskbar from "../components/Taskbar";
import BookingDetailModal from "../components/BookingDetailModal";
import Footer from "../components/Footer";
import "../styles/cartHistoryPages.css";

function BookingDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="mh-page">
        <Taskbar />
        <div className="mh-main">
          <div className="mh-panel" style={{ textAlign: "center", padding: 24 }}>
            <h2 className="mh-page-title">Không có đơn đặt để hiển thị</h2>
            <p>Vui lòng quay lại trang lịch sử đặt sân để chọn đơn hàng.</p>
            <button className="mh-btn mh-btn--small" onClick={() => navigate("/history")}>Quay lại lịch sử</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleReview = () => {
    const sportfieldId = booking?.sportfield_id || booking?.id_sportfield;
    if (sportfieldId) {
      navigate(`/field-detail/${sportfieldId}`, {
        state: { focusReview: true },
      });
    }
  };

  return (
    <div className="mh-page">
      <Taskbar />

      <div className="mh-main">
        <div className="mh-panel">
          <h2 className="mh-page-title">Chi tiết đơn đặt</h2>
          <p style={{ marginBottom: 16 }}>
            Nhấn "Đánh giá" để chuyển sang trang đánh giá của sân thể thao.
          </p>
        </div>
      </div>

      <Footer />

      <BookingDetailModal booking={booking} onClose={() => navigate("/history")} onReview={handleReview} />
    </div>
  );
}

export default BookingDetailPage;

