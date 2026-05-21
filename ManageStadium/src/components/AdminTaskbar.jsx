import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchIcon from "../assets/Search_light.png"
import CheckIcon from "../assets/Check_fill.png"
import "../styles/HomePageTaskbar.css"
import UserMenu from "./UserMenu"
import { useUser } from "../hooks/context/UserContext"

function AdminTaskbar({ searchTerm, setSearchTerm }) {
    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <div className="taskbar">
            <div className="logo-text" onClick={() => navigate("/admin/apply-order")}>
                AdminPanel
            </div>
            {/* <img src={SearchIcon} alt="" />
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm kiếm mã đơn, SĐT..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div> */}
            <div className="navigation-bar">
                <div className={`nav-item ${window.location.pathname === '/admin/apply-order' ? 'active' : ''}`} onClick={() => navigate("/admin/apply-order")}>
                    <img src={CheckIcon} alt="" />
                    <a>Duyệt đơn hàng</a>
                </div>
                <div className={`nav-item ${window.location.pathname === '/admin/add-sportfield' ? 'active' : ''}`} onClick={() => navigate("/admin/add-sportfield")}>
                    <img src={CheckIcon} alt="" />
                    <a>Thêm sân mới</a>
                </div>
                <div className={`nav-item ${window.location.pathname === '/admin/sportfields' ? 'active' : ''}`} onClick={() => navigate("/admin/sportfields")}>
                    <img src={CheckIcon} alt="" />
                    <a>Danh sách sân</a>
                </div>
            </div>
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
        </div >
    )
}
export default AdminTaskbar;
