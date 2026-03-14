import React from 'react';
import '../styles/FieldInfoTab.css';

import img48 from '../assets/image 48.png';
import img49 from '../assets/image 49.png';
import img50 from '../assets/image 50.png';
import img51 from '../assets/image 51.png';

const FieldInfoTab = () => {
  return (
    <div className="field-info-container">
      
      {/* --- PHẦN 1: THƯ VIỆN ẢNH (GALLERY) --- */}
      <div className="gallery-section">
        {/* Nút mũi tên trái */}
        <button className="arrow-btn">&#10094;</button>
        
        {/* Danh sách ảnh */}
        <div className="image-list">
          <img src={img48} alt="Sân cầu lông 1" className="gallery-img" />
          <img src={img49} alt="Sân cầu lông 2" className="gallery-img" />
          <img src={img51} alt="Sân cầu lông 3" className="gallery-img" />
          <img src={img50} alt="Sân cầu lông 4" className="gallery-img" />
        </div>

        {/* Nút mũi tên phải */}
        <button className="arrow-btn">&#10095;</button>
      </div>

      {/* --- PHẦN 2: THÔNG TIN CHI TIẾT --- */}
      <div className="info-section">
        
        {/* Box Mô tả chung */}
        <div className="info-box">
          Sân cầu lông đạt tiêu chuẩn thi đấu phong trào và bán chuyên, với mặt sân thảm cao cấp chống trơn trượt, hệ thống chiếu sáng LED hiện đại và không gian rộng rãi, thoáng mát.
        </div>

        {/* Box Loại mặt sân */}
        <div className="info-box short-box">
          <span className="info-label">Loại mặt sân:</span> Thảm cao su chuyên dùng
        </div>

        {/* Box Hệ thống chiếu sáng */}
        <div className="info-box short-box">
          <span className="info-label">Hệ thống chiếu sáng:</span> Đèn LED chống chói
        </div>

        {/* Box Giờ hoạt động */}
        <div className="info-box short-box">
          <span className="info-label">Giờ hoạt động:</span> 6:00 - 22:00
        </div>

      </div>
      
    </div>
  );
};

export default FieldInfoTab;