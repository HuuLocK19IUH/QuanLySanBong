import React, { useState } from 'react';
import axios from 'axios';
import AdminTaskbar from '../components/AdminTaskbar';
import NoticeModalTrue from '../components/NoticeModalTrue';
import '../styles/AddSportFieldPage.css';

const AddSportFieldPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState('');
    const [sportfieldType, setSportfieldType] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [imgDescripFiles, setImgDescripFiles] = useState([]);
    
    // Description state
    const [shortDescription, setShortDescription] = useState('');
    const [loaimatsan, setLoaimatsan] = useState('');
    const [hethongchieusang, setHethongchieusang] = useState('');
    const [giothuhoatdong, setGiothuhoatdong] = useState('');
    const [dieukhoan, setDieukhoan] = useState('');
    
    // Pricing state
    const [pricing, setPricing] = useState([]);
    const [currentPrice, setCurrentPrice] = useState('');
    const [currentDays, setCurrentDays] = useState([]);
    const [currentStartTime, setCurrentStartTime] = useState('');
    const [currentEndTime, setCurrentEndTime] = useState('');
    
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const daysOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const handleSingleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImgFile(file);
    };

    const handleMultipleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;
        setImgDescripFiles(prev => [...prev, ...files]);
    };

    const handleAddPricing = () => {
        if (!currentPrice || currentDays.length === 0 || !currentStartTime || !currentEndTime) {
            alert("Vui lòng nhập đủ thông tin cho pricing");
            return;
        }

        setPricing(prev => [...prev, {
            price: Number(currentPrice),
            days: currentDays,
            startTime: Number(currentStartTime),
            endTime: Number(currentEndTime)
        }]);

        setCurrentPrice('');
        setCurrentDays([]);
        setCurrentStartTime('');
        setCurrentEndTime('');
    };

    const handleRemovePricing = (index) => {
        setPricing(prev => prev.filter((_, i) => i !== index));
    };

    const toggleDay = (day) => {
        setCurrentDays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSave = async () => {
        try {
            let uploadedImgUrl = '';
            let uploadedImgDescripUrls = [];

            // Upload single image if exists
            if (imgFile) {
                const formData = new FormData();
                formData.append('images', imgFile);
                const res = await axios.post('http://localhost:5000/api/upload/images', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.data.urls && res.data.urls.length > 0) {
                    uploadedImgUrl = res.data.urls[0];
                }
            }

            // Upload multiple images if exists
            if (imgDescripFiles.length > 0) {
                const formData = new FormData();
                imgDescripFiles.forEach(file => {
                    formData.append('images', file);
                });
                const res = await axios.post('http://localhost:5000/api/upload/images', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.data.urls) {
                    uploadedImgDescripUrls = res.data.urls;
                }
            }

            const sportfieldData = {
                title,
                sportfield_type: sportfieldType,
                state: true,
                img_url: uploadedImgUrl,
                img_descrip: uploadedImgDescripUrls,
                keywords: [sportfieldType],
                description: {
                    short_description: shortDescription,
                    loaimatsan: loaimatsan,
                    hethongchieusang: hethongchieusang,
                    giothuhoatdong: giothuhoatdong,
                    dieukhoan_quydinh: dieukhoan
                },
                pricing: pricing,
                total_rating: 0,
                avg_rating: 0
            };

            const res = await axios.post('http://localhost:5000/api/sportfields', sportfieldData);
            
            setModalText("Lưu sân thành công!");
            setShowModal(true);
            
            // Reset form
            setTitle('');
            setSportfieldType('');
            setImgFile(null);
            setImgDescripFiles([]);
            setShortDescription('');
            setLoaimatsan('');
            setHethongchieusang('');
            setGiothuhoatdong('');
            setDieukhoan('');
            setPricing([]);
            
        } catch (error) {
            console.error("Lỗi khi lưu sân:", error);
            alert("Lỗi khi lưu sân: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="admin-container">
            <AdminTaskbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            <div className="admin-content">
                <h2>Thêm sân mới</h2>
                
                <div className="form-group">
                    <label>Tên sân (title)</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Nhập tên sân..." 
                    />
                </div>

                <div className="form-group">
                    <label>Loại sân (sportfield_type)</label>
                    <input 
                        type="text" 
                        value={sportfieldType} 
                        onChange={(e) => setSportfieldType(e.target.value)} 
                        placeholder="Nhập loại sân..." 
                    />
                </div>

                <div className="form-group">
                    <label>Ảnh sân (img_url)</label>
                    <input type="file" onChange={handleSingleImageUpload} accept="image/*" />
                    {imgFile && <img src={URL.createObjectURL(imgFile)} alt="Preview" className="preview-img" />}
                </div>

                <div className="form-group">
                    <label>Ảnh mô tả (img_descrip)</label>
                    <input type="file" multiple onChange={handleMultipleImageUpload} accept="image/*" />
                    <div className="preview-images">
                        {imgDescripFiles.map((file, i) => (
                            <img key={i} src={URL.createObjectURL(file)} alt="Preview" className="preview-img" />
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Mô tả (Description)</h3>
                    <div className="form-group">
                        <label>Short Description</label>
                        <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Loại mặt sân</label>
                        <input type="text" value={loaimatsan} onChange={(e) => setLoaimatsan(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Hệ thống chiếu sáng</label>
                        <input type="text" value={hethongchieusang} onChange={(e) => setHethongchieusang(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Giờ thủ hoạt động</label>
                        <input type="text" value={giothuhoatdong} onChange={(e) => setGiothuhoatdong(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Điều khoản & Quy định</label>
                        <textarea value={dieukhoan} onChange={(e) => setDieukhoan(e.target.value)} rows={4}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Bảng giá (Pricing)</h3>
                    <div className="pricing-input-group">
                        <div className="form-group">
                            <label>Price</label>
                            <input type="number" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} placeholder="VD: 250000" />
                        </div>
                        <div className="form-group">
                            <label>Days</label>
                            <div className="days-selector">
                                <select 
                                    multiple 
                                    className="day-combobox"
                                    value={currentDays} 
                                    onChange={(e) => {
                                        const options = [...e.target.selectedOptions];
                                        const values = options.map(option => option.value);
                                        setCurrentDays(values);
                                    }}
                                >
                                    {daysOptions.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <small>Giữ Ctrl (hoặc Cmd) để chọn nhiều ngày</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Start Time</label>
                            <input type="number" value={currentStartTime} onChange={(e) => setCurrentStartTime(e.target.value)} placeholder="Giờ bắt đầu (VD: 6)" />
                        </div>
                        <div className="form-group">
                            <label>End Time</label>
                            <input type="number" value={currentEndTime} onChange={(e) => setCurrentEndTime(e.target.value)} placeholder="Giờ kết thúc (VD: 18)" />
                        </div>
                        <button className="add-btn" onClick={handleAddPricing}>Thêm Giá</button>
                    </div>

                    {pricing.length > 0 && (
                        <table className="pricing-table">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Days</th>
                                    <th>Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricing.map((p, index) => (
                                    <tr key={index}>
                                        <td>{p.price}</td>
                                        <td>{p.days.join(', ')}</td>
                                        <td>{p.startTime}:00 - {p.endTime}:00</td>
                                        <td><button className="delete-btn" onClick={() => handleRemovePricing(index)}>Xóa</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <button className="save-btn" onClick={handleSave}>Lưu Sân</button>
            </div>

            {showModal && (
                <NoticeModalTrue 
                    text={modalText} 
                    handleCloseModal={() => setShowModal(false)} 
                />
            )}
        </div>
    );
};

export default AddSportFieldPage;
