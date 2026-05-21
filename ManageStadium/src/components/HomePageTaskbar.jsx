import SearchIcon from "../assets/Search_light.png"
import FilterIcon from "../assets/Filter.png"
import BellIcon from "../assets/Bell_fill.png"
import CartIcon from "../assets/Bag_alt_fill.png"
import CheckIcon from "../assets/Check_fill.png"
import HomeIcon from "../assets/Home_fill_navbar.png"
import "../styles/HomePageTaskbar.css"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserMenu from "./UserMenu" // Lấy code import của Ngọc Long
import NoticeModal from "./NoticeModal"
import NotificationModal from "./NotificationModal"
import { useUser } from "../hooks/context/UserContext"
import { getNotificationsByUserId } from "../api/NotificationApi/notificationApi"

function HomePageTaskbar({ toggleFilter, searchTerm, setSearchTerm }) {
    const navigate = useNavigate()
    const { user } = useUser()
    const [showNoticeModal, setShowNoticeModal] = useState(false)
    const [showNotificationModal, setShowNotificationModal] = useState(false)
    const [noticeText, setNoticeText] = useState("")
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) {
                setUnreadCount(0);
                return;
            }
            try {
                const userId = user.id_user || user.user_id || user._id || user.id || user.phone_number;
                const data = await getNotificationsByUserId(userId);
                const unread = (data || []).filter(n => !n.is_read).length;
                setUnreadCount(unread);
            } catch (err) {
                console.error("Lỗi tải thông báo taskbar:", err);
            }
        };

        fetchNotifications();
    }, [user, showNotificationModal]);

    const handleProtectedNavigation = (path, text) => {
        if (!user) {
            setNoticeText(text)
            setShowNoticeModal(true)
        } else {
            if (path) navigate(path)
        }
    }

    return (
        <div className="taskbar">
            <div className="logo-text" onClick={() => navigate("/")}>
                MyCourt
            </div>
            <img src={SearchIcon} alt="" />
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm sân..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={FilterIcon}
                    alt=""
                    className="filter-icon"
                    onClick={toggleFilter}
                />
            </div>
            <div className="navigation-bar">
                <div className="nav-item" onClick={() => navigate("/homepage")}>
                    <img src={HomeIcon} alt="" />
                    <a>Trang chủ</a>
                </div>
                <div className="nav-item" onClick={() => {
                    if (!user) {
                        setNoticeText("Bạn cần đăng nhập để xem thông báo")
                        setShowNoticeModal(true)
                    } else {
                        setShowNotificationModal(true)
                    }
                }} style={{ position: "relative" }}>
                    <img src={BellIcon} alt="" />
                    <a>Thông báo</a>
                    {unreadCount > 0 && (
                        <span style={{
                            position: "absolute",
                            top: "-5px",
                            right: "10px",
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            pointerEvents: "none"
                        }}>
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </div>
                <div className="nav-item" onClick={() => handleProtectedNavigation("/cart", "Bạn cần đăng nhập để xem giỏ hàng")}>
                    <img src={CartIcon} alt="" />
                    <a>Giỏ hàng</a>
                </div>
                <div className="nav-item" onClick={() => handleProtectedNavigation("/history", "Bạn cần đăng nhập để xem sân đã đặt")}>
                    <img src={CheckIcon} alt="" />
                    <a>Sân đã đặt</a>
                </div>
            </div>
            {/* Logic hiển thị nút đăng nhập của Ngọc Long vẫn được giữ nguyên */}
            {
                user ? (
                    <UserMenu user={user} />
                ) : (
                    <button
                        className="taskbar-login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </button>
                )
            }
            {showNoticeModal && (
                <NoticeModal 
                    handleCloseModal={() => {
                        setShowNoticeModal(false);
                        navigate("/login");
                    }} 
                    text={noticeText} 
                />
            )}
            {showNotificationModal && (
                <NotificationModal 
                    handleCloseModal={() => setShowNotificationModal(false)} 
                    user={user} 
                />
            )}
        </div >
    )
}
export default HomePageTaskbar;