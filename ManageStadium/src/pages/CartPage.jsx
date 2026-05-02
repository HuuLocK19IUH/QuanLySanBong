import Taskbar from "../components/HomePageTaskbar"
import CourtCard from "../components/CourtCard"
import Footer from "../components/Footer"
import NoticeModalFalse from "../components/NoticeModalFalse"
import "../styles/cartHistoryPages.css"
import { useUser } from "../hooks/context/UserContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CartPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/api/orders/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const filteredOrders = data.data.filter(o => o.state === "pending" || o.state === "expired");
            setOrders(filteredOrders);
          }
        })
        .catch(err => console.error("Error fetching orders:", err));
    }
  }, [user]);

  const handlePay = (order) => {
    if (order.state === "expired") {
      setShowErrorModal(true);
    } else if (order.state === "pending") {
      navigate("/payment", { 
        state: { 
          id_order: order.id_order,
          id_sportfield: order.id_sportfield,
          selectedTime: [{
             start_hour: new Date(order.start_hour).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}),
             end_hour: new Date(order.end_hour).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})
          }],
          timeCount: order.total_time,
          paid: order.paid,
          returnservices: order.service_details || [],
          start_hour: order.start_hour,
          end_hour: order.end_hour
        } 
      });
    }
  };

  return (
    <div className="mh-page">

      <Taskbar user={user} />

      <div className="mh-main">
        <div className="mh-panel">
          <h2 className="mh-page-title">Giỏ hàng</h2>

          <div className="mh-secondary-search">
            <div className="mh-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo loại sân"
            />
          </div>

          <div className="mh-list">
            {orders.length === 0 ? (
                <p>Không có đơn hàng nào đang chờ thanh toán.</p>
            ) : (
                orders.map(order => (
                    <CourtCard
                        key={order._id || order.id_order}
                        title={`Đơn hàng ${order.id_order}`}
                        tag="Sân bóng"
                        img="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
                        status={order.state === "pending" ? "đang chờ thanh toán" : "hết hạn thanh toán"}
                        btnText={order.state === "pending" ? "Thanh toán" : "Hết hạn"}
                        onPay={() => handlePay(order)}
                    />
                ))
            )}
          </div>
        </div>
      </div>

      <Footer />

      {showErrorModal && (
        <NoticeModalFalse 
          text="Đơn hàng đã hết hạn, không thể thanh toán" 
          handleCloseModal={() => setShowErrorModal(false)} 
        />
      )}

    </div>
  )
}

export default CartPage