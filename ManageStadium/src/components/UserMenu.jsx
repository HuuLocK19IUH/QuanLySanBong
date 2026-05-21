import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserMenu.css";
import { useUser } from "../hooks/context/UserContext";
function UserMenu() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div
            className="taskbar-user"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <span>{user.name}</span>
            <img src={user.avatar || "/images/User_cicrle_light.png"} alt="" className="avatar" />
            {open && (
                <div className="dropdown">
                    <div onClick={() => navigate("/user-info")}>
                        Thông tin cá nhân
                    </div>
                    <div onClick={handleLogout}>
                        Đăng xuất
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;