import React, { useEffect, useState } from "react";
import "../styles/NotificationModal.css";
import { getNotificationsByUserId, markNotificationAsRead } from "../api/NotificationApi/notificationApi";
import checkIcon from "../assets/Check_fill_noti.png";
import cacelIcon from "../assets/Subtract.png";
import timeIcon from "../assets/Alarmclock_fill.png"

function NotificationModal({ handleCloseModal, user }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;
            try {
                // Determine user ID
                const userId = user.id_user || user.user_id || user._id || user.id || user.phone_number;
                const data = await getNotificationsByUserId(userId);
                setNotifications(data || []);
            } catch (err) {
                console.error("Lỗi tải thông báo:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    const handleMarkAsRead = async (id, currentStatus) => {
        if (currentStatus) return; // Đã đọc thì bỏ qua
        try {
            await markNotificationAsRead(id);
            // Cập nhật state cục bộ
            setNotifications(prev =>
                prev.map(notif => notif._id === id ? { ...notif, is_read: true } : notif)
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notif-modal-overlay" onClick={handleCloseModal}>
            <div className="notif-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="notif-modal-header">
                    <h2>Thông báo của bạn</h2>
                    <button className="notif-close-btn" onClick={handleCloseModal}>X</button>
                </div>
                <div className="notif-modal-body">
                    {loading ? (
                        <p className="notif-loading">Đang tải thông báo...</p>
                    ) : notifications.length === 0 ? (
                        <p className="notif-empty">Bạn không có thông báo nào.</p>
                    ) : (
                        <ul className="notif-list">
                            {notifications.map((notif) => (
                                <li
                                    key={notif._id}
                                    className={`notif-item ${notif.is_read ? "read" : "unread"}`}
                                    onClick={() => handleMarkAsRead(notif._id, notif.is_read)}
                                >
                                    <div className="notif-icon">
                                        {notif.type === "order_completed" ? <img src={checkIcon} alt="" /> :
                                            notif.type === "order_cancelled" ? <img src={cacelIcon} alt="" /> :
                                                notif.type === "order_pending" ? <img src={timeIcon} alt="" /> :
                                                    notif.type === "order_expired" ? <img src={cacelIcon} alt="" /> : null}
                                    </div>
                                    <div className="notif-details">
                                        <h4>{notif.title}</h4>
                                        <p>{notif.message}</p>
                                        <span className="notif-date">
                                            {new Date(notif.created_at).toLocaleString('vi-VN')}
                                        </span>
                                    </div>
                                    {!notif.is_read && <span className="notif-dot"></span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NotificationModal;
