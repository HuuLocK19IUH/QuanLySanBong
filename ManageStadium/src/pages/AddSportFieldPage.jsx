import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AdminTaskbar from '../components/AdminTaskbar';
import NoticeModalTrue from '../components/NoticeModalTrue';
import NoticeModal from '../components/NoticeModal';
import { getKeywords } from '../api/sportfieldApi/sportfieldsApi.js';
import '../styles/AddSportFieldPage.css';

const AddSportFieldPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState('');
    const [sportfieldType, setSportfieldType] = useState('');
    const [imgFile, setImgFile] = useState(null);
    const [imgDescripFiles, setImgDescripFiles] = useState([]);

    // Refs for focus
    const titleRef = useRef(null);
    const typeRef = useRef(null);
    const imgRef = useRef(null);
    const imgDescripRef = useRef(null);
    const shortDescRef = useRef(null);
    const loaiMatSanRef = useRef(null);
    const chieuSangRef = useRef(null);
    const startHourRef = useRef(null);
    const endHourRef = useRef(null);
    const pricingPriceRef = useRef(null);
    const pricingDaysRef = useRef(null);
    const pricingStartRef = useRef(null);
    const pricingEndRef = useRef(null);

    // Error Modal State
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorText, setErrorText] = useState('');

    const showError = (msg, ref) => {
        setErrorText(msg);
        setShowErrorModal(true);
        if (ref && ref.current) {
            ref.current.focus();
        }
    };

    // Description state
    const [shortDescription, setShortDescription] = useState('');
    const [loaimatsan, setLoaimatsan] = useState('');
    const [hethongchieusang, setHethongchieusang] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [dieukhoan, setDieukhoan] = useState('');
    const [sportfieldTypesList, setSportfieldTypesList] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await getKeywords();
                if (Array.isArray(res)) {
                    setSportfieldTypesList(res);
                }
            } catch (err) {
                console.error("Lỗi khi tải loại sân:", err);
            }
        };
        fetchTypes();
    }, []);

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
        if (!currentPrice) return showError("Giá không được rỗng", pricingPriceRef);
        if (currentDays.length === 0) return showError("Vui lòng chọn ngày", pricingDaysRef);
        if (currentStartTime === '') return showError("Start time không được rỗng", pricingStartRef);
        if (currentEndTime === '') return showError("End time không được rỗng", pricingEndRef);

        const st = Number(currentStartTime);
        const et = Number(currentEndTime);

        if (st < 0 || et < 0) return showError("Time không được có số âm", st < 0 ? pricingStartRef : pricingEndRef);
        if (st >= et) return showError("Start time phải trước End time", pricingStartRef);

        setPricing(prev => [...prev, {
            price: Number(currentPrice),
            days: currentDays,
            startTime: st,
            endTime: et
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
        if (!title.trim()) return showError("Tên sân không được rỗng", titleRef);
        if (!sportfieldType.trim()) return showError("Loại sân không được rỗng", typeRef);
        if (!imgFile) return showError("Ảnh sân không được để trống", imgRef);
        if (imgDescripFiles.length === 0) return showError("Ảnh mô tả không được để trống", imgDescripRef);
        if (!shortDescription.trim()) return showError("Short Description không được rỗng", shortDescRef);
        if (!loaimatsan.trim()) return showError("Loại mặt sân không được rỗng", loaiMatSanRef);
        if (!hethongchieusang.trim()) return showError("Hệ thống chiếu sáng không được rỗng", chieuSangRef);
        
        if (startHour === '' || endHour === '') return showError("Giờ hoạt động không được rỗng", startHour === '' ? startHourRef : endHourRef);
        const sH = Number(startHour);
        const eH = Number(endHour);
        if (sH < 0 || eH < 0) return showError("Giờ hoạt động không được có số âm", sH < 0 ? startHourRef : endHourRef);
        if (sH >= eH) return showError("Giờ bắt đầu phải trước giờ kết thúc", startHourRef);

        if (pricing.length === 0) return showError("Phải có ít nhất 1 giá được set trong Bảng giá", pricingPriceRef);
        
        const allCoveredDays = new Set();
        pricing.forEach(p => p.days.forEach(d => allCoveredDays.add(d)));
        if (allCoveredDays.size < 7) {
            return showError("Bảng giá phải có đủ các ngày (Mon đến Sun)", pricingDaysRef);
        }

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
                    giothuhoatdong: (startHour && endHour) ? `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00` : '',
                    dieukhoan_quydinh: dieukhoan.trim() ? dieukhoan : 'Không có'
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
            setStartHour('');
            setEndHour('');
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
                    <label>Tên sân <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="text"
                        ref={titleRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tên sân..."
                    />
                </div>

                <div className="form-group">
                    <label>Loại sân <span style={{ color: "red" }}>*</span></label>
                    <input
                        type="text"
                        list="sportfield-types"
                        ref={typeRef}
                        value={sportfieldType}
                        onChange={(e) => setSportfieldType(e.target.value)}
                        placeholder="Chọn hoặc nhập loại sân..."
                    />
                    <datalist id="sportfield-types">
                        {sportfieldTypesList.map((type, index) => (
                            <option key={index} value={type} />
                        ))}
                    </datalist>
                </div>

                <div className="form-group">
                    <label>Ảnh sân <span style={{ color: "red" }}>*</span></label>
                    <input type="file" ref={imgRef} onChange={handleSingleImageUpload} accept="image/*" />
                    {imgFile && <img src={URL.createObjectURL(imgFile)} alt="Preview" className="preview-img" />}
                </div>

                <div className="form-group">
                    <label>Ảnh mô tả <span style={{ color: "red" }}>*</span></label>
                    <input type="file" ref={imgDescripRef} multiple onChange={handleMultipleImageUpload} accept="image/*" />
                    <div className="preview-images">
                        {imgDescripFiles.map((file, i) => (
                            <img key={i} src={URL.createObjectURL(file)} alt="Preview" className="preview-img" />
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Mô tả <span style={{ color: "red" }}>*</span></h3>
                    <div className="form-group">
                        <label>Mô tả ngắn <span style={{ color: "red" }}>*</span></label>
                        <input type="text" ref={shortDescRef} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Loại mặt sân <span style={{ color: "red" }}>*</span></label>
                        <input type="text" ref={loaiMatSanRef} value={loaimatsan} onChange={(e) => setLoaimatsan(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Hệ thống chiếu sáng <span style={{ color: "red" }}>*</span></label>
                        <input type="text" ref={chieuSangRef} value={hethongchieusang} onChange={(e) => setHethongchieusang(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Giờ hoạt động <span style={{ color: "red" }}>*</span></label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="number" ref={startHourRef} value={startHour} onChange={(e) => setStartHour(e.target.value)} placeholder="Giờ bắt đầu (VD: 6)" min="0" max="23" style={{ flex: 1 }} />
                            <span style={{ alignSelf: 'center' }}> - </span>
                            <input type="number" ref={endHourRef} value={endHour} onChange={(e) => setEndHour(e.target.value)} placeholder="Giờ kết thúc (VD: 22)" min="0" max="23" style={{ flex: 1 }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Điều khoản & Quy định</label>
                        <textarea value={dieukhoan} onChange={(e) => setDieukhoan(e.target.value)} rows={4}></textarea>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Bảng giá <span style={{ color: "red" }}>*</span></h3>
                    <div className="pricing-input-group">
                        <div className="form-group">
                            <label>Giá <span style={{ color: "red" }}>*</span></label>
                            <input 
                                type="text" 
                                ref={pricingPriceRef}
                                value={currentPrice ? Number(currentPrice).toLocaleString('vi-VN') : ''} 
                                onChange={(e) => setCurrentPrice(e.target.value.replace(/\D/g, ''))} 
                                placeholder="VD: 120.000" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày áp dụng <span style={{ color: "red" }}>*</span></label>
                            <div className="days-selector">
                                <select
                                    multiple
                                    ref={pricingDaysRef}
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
                            <label>Giờ bắt đầu <span style={{ color: "red" }}>*</span></label>
                            <input type="number" ref={pricingStartRef} value={currentStartTime} onChange={(e) => setCurrentStartTime(e.target.value)} placeholder="Giờ bắt đầu (VD: 6)" />
                        </div>
                        <div className="form-group">
                            <label>Giờ kết thúc <span style={{ color: "red" }}>*</span></label>
                            <input type="number" ref={pricingEndRef} value={currentEndTime} onChange={(e) => setCurrentEndTime(e.target.value)} placeholder="Giờ kết thúc (VD: 18)" />
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
            {showErrorModal && (
                <NoticeModal
                    text={errorText}
                    handleCloseModal={() => setShowErrorModal(false)}
                />
            )}
        </div>
    );
};

export default AddSportFieldPage;
