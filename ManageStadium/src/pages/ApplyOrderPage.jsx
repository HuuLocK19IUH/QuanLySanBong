import React, { useState, useEffect } from "react";
import AdminTaskbar from "../components/AdminTaskbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useUser } from "../hooks/context/UserContext";
import { useNavigate } from "react-router-dom";
import BookingDetailModal from "../components/BookingDetailModal";
import NoticeModalTrue from "../components/NoticeModalTrue";
import "../styles/ApplyOrderPage.css";

const API_URL = "http://localhost:5000/api/orders";

function ApplyOrderPage() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterState, setFilterState] = useState("all");
    const [loading, setLoading] = useState(true);
    const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);
    const [showNoticeModalTrue, setShowNoticeModalTrue] = useState(false);
    const [noticeContent, setNoticeContent] = useState("");
    const { user } = useUser();
    const navigate = useNavigate();

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/all`);
            if (res.data.success) {
                setOrders(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [user, navigate]);

    const handleUpdateStatus = async (id_order, newState) => {
        try {
            const res = await axios.put(`${API_URL}/${id_order}/status`, { state: newState });
            if (res.data.success) {
                setNoticeContent(`Đã cập nhật đơn hàng thành: ${newState}`);
                setShowNoticeModalTrue(true);
                fetchAllOrders();
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật");
        }
    };

    const handleViewDetail = (order) => {
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

        const mappedServices = (order.services || []).map(s => ({
            qty: s.quantity || 1,
            name: s.service_name || s.name || "Dịch vụ",
            price: s.price || 0
        }));

        const booking = {
            id: order._id || order.id_order || Math.random().toString(),
            code: order.id_order || `#${String(order._id).slice(-4)}`,
            title: sportfield.title || "Sân thể thao",
            tag: sportfield.sportfield_type || "Không rõ",
            date: formattedDate,
            status: order.state || "pending",
            timeText: startTime && endTime ? `${formatTime(startTime)} - ${formatTime(endTime)} - ${formattedDate}` : "",
            img: sportfield.img_url || "https://via.placeholder.com/300x200",
            bill: {
                totalHoursText: startTime && endTime ? `${formatTime(startTime)} - ${formatTime(endTime)} (${(Math.round((endTime - startTime) / (1000 * 60 * 60) * 10) / 10)}h)` : "",
                totalServicesQty: mappedServices.length,
                items: mappedServices,
                totalService: mappedServices.reduce((sum, s) => sum + (s.price * s.qty), 0) || 0,
                totalHourlyCost: order.total_hourly_cost || 0,
                totalOrder: order.total_order || 0
            },
            sportfield_id: order.id_sportfield || sportfield._id || sportfield.sportfield_id,
            avatar: sportfield.img_url || "https://i.pravatar.cc/70",
            userName: order.user?.name || "Khách hàng",
            phone: order.phone || ""
        };

        setSelectedBookingDetail(booking);
    };

    const filteredOrders = orders.filter(order => {
        const matchState = filterState === "all" || order.state === filterState;
        const matchSearch = searchTerm === "" || 
            order.id_order?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.sportfield?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone?.includes(searchTerm);
        return matchState && matchSearch;
    });

    return (
        <div className="admin-page">
            <AdminTaskbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="admin-main">
                <h2>Quản lý duyệt đơn hàng</h2>
                <div className="admin-controls">
                    <select value={filterState} onChange={e => setFilterState(e.target.value)} className="admin-select">
                        <option value="all">Tất cả trạng thái</option>
                        <option value="pending">Chờ duyệt (pending)</option>
                        <option value="paid">Đã thanh toán (paid)</option>
                        <option value="cancelled">Đã hủy (cancelled)</option>
                        <option value="expired">Hết hạn (expired)</option>
                        <option value="completed">Đã hoàn thành (completed)</option>
                    </select>
                    <button onClick={fetchAllOrders} className="admin-refresh-btn">Làm mới</button>
                </div>

                <div className="admin-table-container">
                    {loading ? <p>Đang tải dữ liệu...</p> : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Tên sân</th>
                                    <th>SĐT đặt</th>
                                    <th>Giờ đá</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order.id_order}</td>
                                        <td>{order.sportfield?.title}</td>
                                        <td>{order.phone}</td>
                                        <td>
                                            {new Date(order.start_hour).toLocaleString('vi-VN')} - 
                                            {new Date(order.end_hour).toLocaleTimeString('vi-VN')}
                                        </td>
                                        <td>{order.total_order?.toLocaleString()}đ</td>
                                        <td>
                                            <span className={`status-badge status-${order.state}`}>
                                                {order.state}
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={() => handleViewDetail(order)} className="btn-detail">Chi tiết</button>
                                            {order.state === "pending" && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(order.id_order, "paid")} className="btn-approve">Duyệt</button>
                                                    <button onClick={() => handleUpdateStatus(order.id_order, "cancelled")} className="btn-reject">Hủy</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr><td colSpan="7" style={{textAlign:"center"}}>Không có đơn hàng nào.</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {selectedBookingDetail && (
                <BookingDetailModal 
                    booking={selectedBookingDetail} 
                    onClose={() => setSelectedBookingDetail(null)} 
                    hideReview={true}
                />
            )}
            {showNoticeModalTrue && (
                <NoticeModalTrue 
                    text={noticeContent}
                    handleCloseModal={() => setShowNoticeModalTrue(false)}
                />
            )}
            <Footer />
        </div>
    );
}

export default ApplyOrderPage;
