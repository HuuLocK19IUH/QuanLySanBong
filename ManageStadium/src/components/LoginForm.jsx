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
    const [error, setError] = useState(true);
    const { setUser } = useUser();

    const handleSubmit = async () => {
        try {
            const user = await loginUser(phone, password);

            if (!user) {
                setError(true);
                return;
            }
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user)
        
            if (user.role === "admin") {
                navigate("/admin/apply-order");
            } else {
                navigate("/homepage");
            }
        } catch {
            setError(true);
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
            {!error && <span>Sai số điện thoại hoặc mật khẩu</span>}

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