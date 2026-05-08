import React, { useState, useEffect } from "react";
import AdminTaskbar from "../components/AdminTaskbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useUser } from "../hooks/context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/ApplyOrderPage.css";

const API_URL = "http://localhost:5000/api/orders";

function ApplyOrderPage() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterState, setFilterState] = useState("all");
    const [loading, setLoading] = useState(true);
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
                alert(`Đã cập nhật đơn hàng thành: ${newState}`);
                fetchAllOrders();
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật");
        }
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
                                            <button onClick={() => alert(JSON.stringify(order, null, 2))} className="btn-detail">Chi tiết</button>
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
            <Footer />
        </div>
    );
}

export default ApplyOrderPage;
