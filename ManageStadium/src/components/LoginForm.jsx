import InputFieldLogin from "./InputFieldLogin.jsx"
import GoogleLoginBtn from "./GoogleLoginBtn.jsx"
import InputFieldPassword from "./InputFieldPassword.jsx"
import LoginBtn from "./LoginBtn.jsx"
import HomeIcon from "../assets/Home_fill.png"
import "../styles/LoginForm.css"
import { useNavigate } from "react-router-dom"
import { getUserByPhone } from "../api/usersApi/userByPhone.js"
import { useState } from "react"

function LoginForm() {

    const navigate = useNavigate()

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(true);

    const handleSubmit = async () => {
        const foundUser = await getUserByPhone(phone);
        console.log("phone:", phone);
        console.log("user:", foundUser);
        if (!foundUser || foundUser.password !== password) {
            setError(true);
            return;
        }
        localStorage.setItem("user", JSON.stringify(foundUser));
        navigate("/");
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