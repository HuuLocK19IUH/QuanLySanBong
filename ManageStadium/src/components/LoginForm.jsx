import InputFieldLogin from "./InputFieldLogin.jsx"
import GoogleLoginBtn from "./GoogleLoginBtn.jsx"
import InputFieldPassword from "./InputFieldPassword.jsx"
import LoginBtn from "./LoginBtn.jsx"
import HomeIcon from "../assets/Home_fill.png"
import "../styles/LoginForm.css"
import { useNavigate } from "react-router-dom"

function LoginForm() {

    const navigate = useNavigate()

    return (
        <div className="login-form">

            <h1>Đăng nhập</h1>

            <InputFieldLogin
                label="SĐT"
                type="text"
                placeholder="Nhập số điện thoại"
            />

            <InputFieldPassword
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
            />

            <LoginBtn label="Đăng nhập" onClick={() => navigate("/")} />

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