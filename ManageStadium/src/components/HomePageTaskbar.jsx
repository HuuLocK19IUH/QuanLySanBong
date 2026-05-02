import SearchIcon from "../assets/Search_light.png"
import FilterIcon from "../assets/Filter.png"
import BellIcon from "../assets/Bell_fill.png"
import CartIcon from "../assets/Bag_alt_fill.png"
import CheckIcon from "../assets/Check_fill.png"
import HomeIcon from "../assets/Home_fill_navbar.png"
import "../styles/HomePageTaskbar.css"
import { useNavigate } from "react-router-dom"
import UserMenu from "./UserMenu" // Lấy code import của Ngọc Long
import { useState, useEffect, useRef } from "react"
import { useUser } from "../hooks/context/UserContext"

function HomePageTaskbar({ toggleFilter, searchTerm, setSearchTerm, user: propUser }) {
    const navigate = useNavigate()
    const { user: contextUser } = useUser()
    const user = propUser || contextUser

    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const notificationRef = useRef(null)

    useEffect(() => {
        if (user && user.id) {
            fetch(`http://localhost:3000/api/notifications/user/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.data) setNotifications(data.data)
                })
                .catch(err => console.error(err))
        }
    }, [user])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
    }

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
                <div className="nav-item notification-container" ref={notificationRef} onClick={toggleNotifications} style={{ position: 'relative' }}>
                    <img src={BellIcon} alt="" />
                    <a>Thông báo</a>
                    {notifications.length > 0 && (
                        <span style={{ position: 'absolute', top: -5, left: 10, background: 'red', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px' }}>
                            {notifications.length}
                        </span>
                    )}
                    {showNotifications && (
                        <div className="notification-dropdown" style={{
                            position: 'absolute', top: '100%', right: -100, width: '300px', background: 'white', 
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', zIndex: 100, 
                            maxHeight: '400px', overflowY: 'auto', textAlign: 'left', color: '#333'
                        }} onClick={(e) => e.stopPropagation()}>
                            <h4 style={{ padding: '10px', margin: 0, borderBottom: '1px solid #eee' }}>Thông báo</h4>
                            {notifications.length === 0 ? (
                                <p style={{ padding: '10px', textAlign: 'center', color: '#888' }}>Không có thông báo nào</p>
                            ) : (
                                notifications.map(notif => (
                                    <div key={notif._id} style={{ padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer' }} 
                                        onClick={() => { setShowNotifications(false); if(notif.type === 'order_completed') navigate('/cart'); }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{notif.title}</p>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>{notif.message}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
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