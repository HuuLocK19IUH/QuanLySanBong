import React, { useState, useEffect } from "react";
import AdminTaskbar from "../components/AdminTaskbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useUser } from "../hooks/context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/ApplyOrderPage.css"; // Reuse some styles

const API_URL = "http://localhost:5000/api/sportfields";

function AdminSportfieldsPage() {
    const [activeFields, setActiveFields] = useState([]);
    const [deletedFields, setDeletedFields] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    const fetchFields = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            if (res.data) {
                // Backend returns all, or we could fetch by ?isActive=true/false
                // Here we fetch all and filter in frontend for simplicity
                const active = res.data.filter(f => f.isActive !== false);
                const deleted = res.data.filter(f => f.isActive === false);
                setActiveFields(active);
                setDeletedFields(deleted);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFields();
    }, [user, navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sân này? (Xóa mềm)")) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            alert("Xóa sân thành công!");
            fetchFields();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi xóa sân");
        }
    };

    const handleRestore = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn khôi phục sân này?")) return;
        try {
            await axios.put(`${API_URL}/${id}`, { isActive: true });
            alert("Khôi phục sân thành công!");
            fetchFields();
        } catch (err) {
            console.error(err);
            alert("Lỗi khi khôi phục sân");
        }
    };

    const filteredActiveFields = activeFields.filter(f => 
        searchTerm === "" || 
        f.sportfield_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <AdminTaskbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="admin-main">
                <h2>Quản lý danh sách sân</h2>
                <div className="admin-controls">
                    <button onClick={() => setShowModal(true)} className="btn-detail" style={{ background: '#f39c12', color: 'white' }}>
                        Xem danh sách sân đã xóa
                    </button>
                    <button onClick={fetchFields} className="admin-refresh-btn">Làm mới</button>
                </div>

                <div className="admin-table-container">
                    {loading ? <p>Đang tải dữ liệu...</p> : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Mã sân</th>
                                    <th>Tên sân</th>
                                    <th>Loại sân</th>
                                    <th>Đánh giá TB</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredActiveFields.map(field => (
                                    <tr key={field._id}>
                                        <td>{field.sportfield_id}</td>
                                        <td>{field.title}</td>
                                        <td>{field.sportfield_type}</td>
                                        <td>{field.avg_rating}</td>
                                        <td>
                                            <button onClick={() => handleDelete(field._id)} className="btn-reject">Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredActiveFields.length === 0 && (
                                    <tr><td colSpan="5" style={{textAlign:"center"}}>Không có sân nào.</td></tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" style={modalOverlayStyle}>
                    <div className="modal-content" style={modalContentStyle}>
                        <h3>Danh sách sân đã xóa</h3>
                        <button onClick={() => setShowModal(false)} style={closeBtnStyle}>X</button>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Mã sân</th>
                                        <th>Tên sân</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deletedFields.map(field => (
                                        <tr key={field._id}>
                                            <td>{field.sportfield_id}</td>
                                            <td>{field.title}</td>
                                            <td>
                                                <button onClick={() => handleRestore(field._id)} className="btn-approve">Khôi phục</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {deletedFields.length === 0 && (
                                        <tr><td colSpan="3" style={{textAlign:"center"}}>Trống.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

const modalOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '600px',
    maxWidth: '90%',
    position: 'relative'
};

const closeBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer'
};

export default AdminSportfieldsPage;
