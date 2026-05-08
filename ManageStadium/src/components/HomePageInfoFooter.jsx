import facebookicon from "../assets/facebook_icon.png"
import instagramicon from "../assets/instagram_icon.png"
import tiktokicon from "../assets/tiktok_icon.png"
import "../styles/HomePageInfoFooter.css"
function HomePageInfoFooter() {
    return (
        <div className="HomePageInfoFooter-card">
            <div className="f-right">
                <div>
                    <h3>Địa chỉ</h3>
                    <p>252/4/46, QL1A, Bình Hưng Hoà B, Bình Tân, <br />Thành phố Hồ Chí Minh</p>
                </div>
                <div>
                    <h3>HASHTAG</h3>
                    <div className="tags">
                        <button>MyCourt</button>
                        <button>MyClub</button>
                    </div>
                </div>
                <div>
                    <h3>MẠNG XÃ HỘI</h3>
                    <div className="s-icons">
                        <img src={facebookicon} alt="" />
                        <img src={instagramicon} alt="" />
                        <img src={tiktokicon} alt="" />
                    </div>
                </div>
            </div>
            <div className="f-left">
                <div className="f-left-com1">
                    <div className="sdt-con">
                        <h3>SĐT</h3>
                        <p>0933354446</p>
                    </div>
                    <div className="gmail-con">
                        <h3>Email</h3>
                        <p>mycourt@gmail.com</p>
                    </div>
                </div>
                <div className="f-left-com2">
                    <div className="time-con">
                        <h3>GIỜ HOẠT ĐỘNG</h3>
                        <p>5:00 - 23:00 từ thứ 2 đến cn</p>
                    </div>
                    <div className="website-con">
                        <h3>WEBSITE</h3>
                        <p>www.mycourt.com</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomePageInfoFooter;