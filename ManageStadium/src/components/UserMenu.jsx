import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserMenu.css";

function UserMenu({ user }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
        console.log("Đăng xuất");
    };

    return (
        <div
            className="taskbar-user"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <span>{user.name}</span>
            <img src={user.avatar} alt="" className="avatar" />

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