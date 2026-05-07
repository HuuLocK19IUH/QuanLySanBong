import { useMemo, useState, useEffect } from "react";
import Taskbar from "../components/HomePageTaskbar";
import CourtCard from "../components/CourtCard";
import Footer from "../components/Footer";
import { getOrdersByUser } from "../api/ordersApi/getOrdersByUser";
import { useUser } from "../hooks/context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/cartHistoryPages.css";

function CartPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Lấy ID người dùng từ context
        const userId = user.id_user || user.user_id || user._id || user.id;
        const data = await getOrdersByUser(userId);
        
        // Lọc ra các đơn đang chờ duyệt (pending) hoặc hết hạn (expired)
        const cartOrders = data.filter(order => order.state === "pending" || order.state === "expired");
        setOrders(cartOrders);
      } catch (err) {
        console.error("Lỗi lấy giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, refreshTrigger]);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return orders;
    const lower = searchTerm.toLowerCase();
    return orders.filter((order) => {
      const title = order.sportfield?.title?.toLowerCase() || "";
      const tag = order.sportfield?.sportfield_type?.toLowerCase() || "";
      return title.includes(lower) || tag.includes(lower);
    });
  }, [searchTerm, orders]);

  return (
    <div className="mh-page">
      <Taskbar />

      <div className="mh-main">
        <div className="mh-panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 className="mh-page-title" style={{ margin: 0 }}>Giỏ hàng</h2>
            <button 
                onClick={() => setRefreshTrigger(prev => prev + 1)}
                style={{
                    backgroundColor: "#75b06f", color: "white", border: "none", 
                    padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
                    fontFamily: "kanit"
                }}
            >
                Làm mới
            </button>
          </div>

          <div className="mh-secondary-search">
            <div className="mh-search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo loại sân trong giỏ hàng"
            />
          </div>

          <div className="mh-list">
            {loading ? (
              <div style={{ padding: 24, textAlign: "center" }}>Đang tải dữ liệu...</div>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((order) => {
                const sportfield = order.sportfield || {};
                const imageUrl = sportfield.img_url 
                    ? (sportfield.img_url.startsWith('/') ? sportfield.img_url : `/${sportfield.img_url}`)
                    : '/images/badminton.png';
                const isExpired = order.state === "expired";

                return (
                  <CourtCard
                    key={order._id || order.id_order}
                    title={sportfield.title || "Sân bóng"}
                    tag={sportfield.sportfield_type || "Chưa phân loại"}
                    img={imageUrl}
                    status={isExpired ? "Đã hết hạn" : "Đang chờ duyệt"}
                    isExpired={isExpired}
                    onPay={() => {
                        if (isExpired) return;

                        // Tính thời gian còn lại (15 phút = 900 giây)
                        const createdAt = new Date(order.date_created).getTime();
                        const now = new Date().getTime();
                        const diffSecs = Math.max(0, Math.floor((createdAt + 15 * 60 * 1000 - now) / 1000));

                        const start = new Date(order.start_hour);
                        const end = new Date(order.end_hour);
                        const formatHM = (d) => `${d.getHours()}h${String(d.getMinutes()).padStart(2, '0')}`;

                        navigate("/payment", {
                          state: {
                            existingOrderId: order.id_order,
                            initialTimeLeft: diffSecs,
                            selectedTime: {
                              start: formatHM(start),
                              end: formatHM(end)
                            },
                            selectedDate: start.toISOString().split("T")[0],
                            timeCount: "Chưa xác định", 
                            paid: order.total_hourly_cost,
                            totalService: order.total_order - order.total_hourly_cost,
                            idSportfield: order.id_sportfield,
                            phone: order.phone,
                            note: order.note,
                            returnservices: (order.services || []).map(s => ({
                                service_id: s.service_id,
                                name: s.service_name,
                                qty: s.quantity,
                                price: s.price
                            }))
                          }
                        });
                    }}
                  />
                );
              })
            ) : (
              <div style={{ padding: 24, textAlign: "center" }}>
                Không tìm thấy đơn hàng nào đang chờ duyệt.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;