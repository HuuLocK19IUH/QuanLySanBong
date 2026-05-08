import SearchIcon from "../assets/Search_light.png"
import FilterIcon from "../assets/Filter.png"
import BellIcon from "../assets/Bell_fill.png"
import CartIcon from "../assets/Bag_alt_fill.png"
import CheckIcon from "../assets/Check_fill.png"
import HomeIcon from "../assets/Home_fill_navbar.png"
import "../styles/HomePageTaskbar.css"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserMenu from "./UserMenu" // Lấy code import của Ngọc Long
import NoticeModal from "./NoticeModal"
import NotificationModal from "./NotificationModal"
import { useUser } from "../hooks/context/UserContext"

function HomePageTaskbar({ toggleFilter, searchTerm, setSearchTerm }) {
    const navigate = useNavigate()
    const { user } = useUser()
    const [showNoticeModal, setShowNoticeModal] = useState(false)
    const [showNotificationModal, setShowNotificationModal] = useState(false)
    const [noticeText, setNoticeText] = useState("")

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
                }}>
                    <img src={BellIcon} alt="" />
                    <a>Thông báo</a>
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