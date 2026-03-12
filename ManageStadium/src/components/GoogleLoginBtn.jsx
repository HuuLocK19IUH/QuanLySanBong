import "../styles/GoogleLoginBtn.css"
import GGlogo from "../assets/GGicon.png";
function GoogleLoginBtn() {
    return (
        <div>
            <button className="google-btn">
                <img src={GGlogo} alt="" />
                Đăng nhập với Gmail
            </button>
        </div>
    )
}

export default GoogleLoginBtn;