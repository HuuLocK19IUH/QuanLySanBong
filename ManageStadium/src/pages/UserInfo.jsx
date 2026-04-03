import "../styles/UserInfo.css";
import InputImgFile from "../components/InputImgFile";
import iconBack from "../assets/back_homepage.png"
import { useNavigate } from "react-router-dom";

function UserInfo() {
    const navigate = useNavigate();

    return (
        <div className="User-info">
            <div className="user-info-title-panel">
                <img src={iconBack} alt="" onClick={() => navigate("/")} />
                <h1 className="user-info-title">Chỉnh sửa thông tin cá nhân</h1>
            </div>
            <h2>Thông tin cá nhân</h2>
            <div className="user-info-compos">
                <h3>Ảnh đại diện</h3>
                <InputImgFile />
            </div>
            <div className="user-info-compos">
                <h3>Tên đầy đủ</h3>
                <input type="text" placeholder="Nhập tên đầy đủ" />
            </div>
            <div className="user-info-compos">
                <h3>Số điện thoại</h3>
                <input type="text" placeholder="Nhập số điện thoại" />
            </div>
            <div className="user-info-compos2">
                <div>
                    <h3>Ngày sinh</h3>
                    <input type="date" />
                </div>
                <div>
                    <h3>Giới tính</h3>
                    <select>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
            </div>
            <div className="capnhat-pnl">
                <button className="capnhat-btn">Cập nhật</button>
            </div>

        </div>
    )
}

export default UserInfo;