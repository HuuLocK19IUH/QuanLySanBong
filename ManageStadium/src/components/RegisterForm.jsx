import InputFieldLogin from "./InputFieldLogin.jsx"
import GoogleLoginBtn from "./GoogleLoginBtn.jsx"
import InputFieldPassword from "./InputFieldPassword.jsx"
import LoginBtn from "./LoginBtn.jsx"
import HomeIcon from "../assets/Home_fill.png"
import "../styles/RegisterForm.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Handle from "rc-slider/lib/Handles/Handle.js"
import { createUser } from "../api/usersApi/createNewUser.js"

function RegisterForm() {
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = async () => {
        try {
            if (!phone || !password1 || !password2) {
                setError("Vui lòng nhập đầy đủ thông tin");
                return;
            }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                setError("Số điện thoại không hợp lệ");
                return;
            }

            if (password1.length < 6) {
                setError("Mật khẩu phải >= 6 ký tự");
                return;
            }

            if (password1 !== password2) {
                setError("Mật khẩu nhập lại không khớp");
                return;
            }

            setError("");

            // gọi API backend
            const user = await createUser(phone, password1);

            if (!user) {
                setError("Đăng ký thất bại (có thể số điện thoại đã tồn tại)");
                return;
            }

            alert("Đăng ký thành công!");
            navigate("/login");

        } catch {
            setError("Có lỗi xảy ra");
        }
    };

    return (
        <div className="register-form">

            <h1>Đăng ký</h1>

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
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
            />

            <InputFieldPassword
                label="Nhập lại mật khẩu"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
            />

            {error && <span className="error">{error}</span>}

            <LoginBtn label="Đăng ký" onClick={handleSubmit} />


            <a className="register-link"
                onClick={() => navigate("/login")}
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