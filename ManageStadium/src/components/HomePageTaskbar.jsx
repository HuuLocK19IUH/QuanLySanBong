import SearchIcon from "../assets/Search_light.png"
import FilterIcon from "../assets/Filter.png"
import BellIcon from "../assets/Bell_fill.png"
import CartIcon from "../assets/Bag_alt_fill.png"
import CheckIcon from "../assets/Check_fill.png"
import HomeIcon from "../assets/Home_fill_navbar.png"
import "../styles/HomePageTaskbar.css"
import { useNavigate } from "react-router-dom"
import UserMenu from "./UserMenu" // Lấy code import của Ngọc Long

function HomePageTaskbar({ toggleFilter, searchTerm, setSearchTerm, user }) {
    const navigate = useNavigate()

    return (
        <div className="taskbar">
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
                <div className="nav-item" onClick={() => navigate("/")}>
                    <img src={HomeIcon} alt="" />
                    <a>Trang chủ</a>
                </div>
                <div className="nav-item">
                    <img src={BellIcon} alt="" />
                    <a>Thông báo</a>
                </div>
                <div className="nav-item" onClick={() => navigate("/cart")}>
                    <img src={CartIcon} alt="" />
                    <a>Giỏ hàng</a>
                </div>
                <div className="nav-item" onClick={() => navigate("/history")}>
                    <img src={CheckIcon} alt="" />
                    <a>Sân đã đặt</a>
                </div>
            </div>
            {/* Logic hiển thị nút đăng nhập của Ngọc Long vẫn được giữ nguyên */}
            {
                user !== null ? (
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
export default HomePageTaskbar;