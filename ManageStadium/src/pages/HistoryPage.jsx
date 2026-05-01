import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/context/UserContext";
import Taskbar from "../components/HomePageTaskbar";
import HistoryCard from "../components/HistoryCard";
import Footer from "../components/Footer";
import { getOrdersByUser } from "../api/ordersApi/getOrdersByUser";
import pagenavleft from "../assets/Expand_left.png";
import pagenavright from "../assets/Expand_right.png";
import "../styles/cartHistoryPages.css";

function HistoryPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getOrdersByUser(user.id_user || user.user_id || user._id, searchTerm);
        const mapped = (data || []).map((order) => {
          const sportfield = order.sportfield || {};
          const startTime = order.start_hour ? new Date(order.start_hour) : null;
          const endTime = order.end_hour ? new Date(order.end_hour) : null;
          const formatTime = (date) => {
            if (!date) return "";
            return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
          };
          const formattedDate = startTime
            ? `${String(startTime.getDate()).padStart(2, "0")}/${String(startTime.getMonth() + 1).padStart(2, "0")}/${startTime.getFullYear()}`
            : "";

          // Map services with correct field names
          const mappedServices = (order.services || []).map(s => ({
            qty: s.quantity || 1,
            name: s.service_name || s.name || "Dịch vụ",
            price: s.price || 0
          }));

          return {
            id: order._id || order.id_order || Math.random().toString(),
            code: order.id_order || `#${String(order._id).slice(-4)}`,
            title: sportfield.title || "Sân thể thao",
            tag: sportfield.sportfield_type || "Không rõ",
            date: formattedDate,
            status: order.state || "pending",
            timeText: startTime && endTime ? `${formatTime(startTime)} - ${formatTime(endTime)}` : "",
            img: sportfield.img_url || "https://via.placeholder.com/300x200",
            bill: {
              totalHoursText: startTime && endTime ? `${formatTime(startTime)} - ${formatTime(endTime)} (${(Math.round((endTime - startTime) / (1000 * 60 * 60) * 10) / 10)}h)` : "",
              totalServicesQty: mappedServices.length,
              items: mappedServices,
              totalService: mappedServices.reduce((sum, s) => sum + (s.price * s.qty), 0) || 0,
              totalOrder: order.total_order || 0
            },
            sportfield_id: order.id_sportfield || sportfield._id || sportfield.sportfield_id,
            avatar: sportfield.img_url || "https://i.pravatar.cc/70",
            userName: order.user?.name || "Khách hàng",
            phone: order.phone || ""
          };
        });

        setBookings(mapped);
      } catch (err) {
        setError(err?.message || "Không thể tải lịch sử đặt sân");
        console.error("Error loading bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, searchTerm]);

  const handleOpenDetail = (booking) => {
    navigate("/booking-detail", { state: { booking } });
  };

  const handleOpenReview = (booking) => {
    if (!booking?.sportfield_id) return;
    navigate(`/field-detail/${booking.sportfield_id}`, {
      state: { focusReview: true },
    });
  };

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookings;
    const lowerSearch = searchTerm.toLowerCase();
    return bookings.filter(booking =>
      booking.title.toLowerCase().includes(lowerSearch) ||
      booking.tag.toLowerCase().includes(lowerSearch)
    );
  }, [bookings, searchTerm]);

  return (
    <div className="mh-page">
      <Taskbar />

      <div className="mh-main">
        <div className="mh-panel">
          <h2 className="mh-page-title">Lịch sử đặt sân</h2>

          <div className="mh-secondary-search">
            <div className="mh-search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo loại sân hoặc tên sân"
            />
          </div>

          {loading && <p>Đang tải lịch sử đặt sân...</p>}
          {error && <p style={{ color: "#a62828" }}>{error}</p>}

          <div className="mh-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <HistoryCard
                  key={booking.id}
                  booking={booking}
                  openDetail={() => handleOpenDetail(booking)}
                  openReview={() => handleOpenReview(booking)}
                />
              ))
            ) : (
              !loading && (
                <div style={{ padding: 24, textAlign: "center" }}>
                  Không tìm thấy đơn đặt nào phù hợp.
                </div>
              )
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 18,
              marginTop: 16,
            }}
          >
            <img src={pagenavleft} alt="" style={{ cursor: "pointer", opacity: 0.6 }} />
            <img src={pagenavright} alt="" style={{ cursor: "pointer", opacity: 0.6 }} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HistoryPage;