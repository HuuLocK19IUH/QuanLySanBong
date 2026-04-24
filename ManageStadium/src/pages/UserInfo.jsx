import "../styles/UserInfo.css";
import InputImgFile from "../components/InputImgFile";
import iconBack from "../assets/back_homepage.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateUser } from "../api/usersApi/updateUser";
import { uploadAvatar } from "../api/usersApi/uploadAvatar";

function UserInfo() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id_user: "",
        name: "",
        phone_number: "",
        date_of_birth: "",
        gender: "Nam",
        avatar: ""
    });

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("user"));

        if (localData) {
            const newData = {
                ...localData,
                date_of_birth: formatDate(localData.date_of_birth)
            };

            setForm(newData);
            console.log(newData);
        }
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const res = await updateUser(form);

            localStorage.setItem("user", JSON.stringify(res));

            alert("Cập nhật thành công");
        } catch (err) {
            console.error(err);
            alert(err.message || "Cập nhật thất bại");
        }
    };


    const handleAvatarChange = async (file) => {
        try {
            const res = await uploadAvatar(file);

            setForm(prev => ({
                ...prev,
                avatar: res.url
            }));

            console.log("Uploaded URL:", res.url);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="User-info-div">
            <div className="User-info">
                <div className="user-info-title-panel">
                    <img src={iconBack} alt="" onClick={() => navigate("/")} />
                    <h1 className="user-info-title">Chỉnh sửa thông tin cá nhân</h1>
                </div>

                <h2>Thông tin cá nhân</h2>

                <div className="user-info-compos">
                    <h3>Ảnh đại diện</h3>
                    <InputImgFile onChange={handleAvatarChange} initialAvatarUrl={form.avatar} />
                </div>

                <div className="user-info-compos">
                    <h3>Tên đầy đủ</h3>
                    <input
                        type="text"
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        placeholder="Nhập tên đầy đủ"
                    />
                </div>

                <div className="user-info-compos">
                    <h3>Số điện thoại</h3>
                    <input
                        type="text"
                        name="phone_number"
                        value={form.phone_number || ""}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                    />
                </div>

                <div className="user-info-compos2">
                    <div>
                        <h3>Ngày sinh</h3>
                        <input
                            type="date"
                            name="date_of_birth"
                            value={form.date_of_birth || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <h3>Giới tính</h3>
                        <select
                            name="gender"
                            value={form.gender || "Nam"}
                            onChange={handleChange}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>

                <div className="capnhat-pnl">
                    <button className="capnhat-btn" onClick={handleUpdate}>
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;