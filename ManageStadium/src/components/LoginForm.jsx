import InputFieldLogin from "./InputFieldLogin.jsx"
import GoogleLoginBtn from "./GoogleLoginBtn.jsx"
import InputFieldPassword from "./InputFieldPassword.jsx"
import LoginBtn from "./LoginBtn.jsx"
import "../styles/LoginForm.css"
function LoginForm() {
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

            <LoginBtn />

            <GoogleLoginBtn />

            <a className="register-link">
                Đăng ký
            </a>

        </div>
    )
}

export default LoginForm