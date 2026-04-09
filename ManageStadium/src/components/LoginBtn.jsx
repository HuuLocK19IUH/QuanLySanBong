import "../styles/LoginBtn.css"
function LoginBtn({ label, onClick }) {
    return (
        <button className="login-btn" onClick={onClick}>
            {label}
        </button>
    )
}

export default LoginBtn;