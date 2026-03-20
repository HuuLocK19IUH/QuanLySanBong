import InputFieldLogin from "./InputFieldLogin.jsx"
import GoogleLoginBtn from "./GoogleLoginBtn.jsx"
import InputFieldPassword from "./InputFieldPassword.jsx"
import LoginBtn from "./LoginBtn.jsx"
import HomeIcon from "../assets/Home_fill.png"
import "../styles/RegisterForm.css"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
    const navigate = useNavigate()
    return (
        <div className="register-form">

            <h1>Đăng ký</h1>

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

            <InputFieldPassword
                label="Nhập lại mật khẩu"
                type="password"
                placeholder="Nhập lại mật khẩu"
            />

            <LoginBtn label="Đăng ký" />


            <a className="register-link"
                onClick={()=>navigate("/login")}
            >
                Đăng Nhập
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

export default RegisterForm;