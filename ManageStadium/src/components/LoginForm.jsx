import InputFieldLogin from "./InputFieldLogin.jsx"
import GoogleLoginBtn from "./GoogleLoginBtn.jsx"
import InputFieldPassword from "./InputFieldPassword.jsx"
import LoginBtn from "./LoginBtn.jsx"
import HomeIcon from "../assets/Home_fill.png"
import "../styles/LoginForm.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginUser } from "../api/usersApi/loginUser.js"
import { useUser } from "../hooks/context/UserContext.jsx"
function LoginForm() {

    const navigate = useNavigate()
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useUser();

    const handleSubmit = async () => {
        const phoneRegex = /^(02|03|08|09)\d{8}$/;
        if (!phoneRegex.test(phone)) {
            setError("Số điện thoại không hợp lệ");
            return;
        }
        if (password.length < 6) {
            setError("Mật khẩu phải có từ 6 ký tự trở lên");
            return;
        }

        try {
            const user = await loginUser(phone, password);

            if (!user) {
                setError("Sai số điện thoại hoặc mật khẩu");
                return;
            }
            setError("");
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user)
        
            if (user.role === "admin") {
                navigate("/admin/apply-order");
            } else {
                navigate("/homepage");
            }
        } catch {
            setError("Có lỗi xảy ra khi đăng nhập");
        }
    };

    return (
        <div className="login-form">

            <h1>Đăng nhập</h1>

            <InputFieldLogin
                label="SĐT"
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />


            <InputFieldPassword
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <span className="error" style={{ color: "red", fontSize: "14px", marginTop: "-10px", marginBottom: "10px", display: "block" }}>{error}</span>}

            <LoginBtn label="Đăng nhập" onClick={handleSubmit} />

            <GoogleLoginBtn />

            <a className="register-link" onClick={() => navigate("/register")}>
                Đăng ký
            </a>

            <img
                src={HomeIcon}
                alt=""
                id="home-icon"
                onClick={() => navigate("/")}
            />

        </div>
    )
}

export default LoginForm