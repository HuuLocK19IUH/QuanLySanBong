import React, { useState } from 'react';
import '../styles/FieldInfoTab.css';

import img48 from '../assets/image 48.png';
import img49 from '../assets/image 49.png';
import img50 from '../assets/image 50.png';
import img51 from '../assets/image 51.png';
import img52 from '../assets/52.png';
import img53 from '../assets/53.png';

const FieldInfoTab = () => {
  // 1. Tạo mảng dữ liệu nhiều hình để test chức năng chuyển hình
  const images = [img48, img49, img51, img50, img52, img53, img48, img49];

  // 2. State quản lý hình đang được phóng to (Zoom)
  const [zoomedImg, setZoomedImg] = useState(null);

  // 3. State quản lý vị trí của Carousel (Chuyển hình)
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4; // Số hình hiển thị cùng lúc

  const nextSlide = () => {
    if (currentIndex + itemsToShow < images.length) {
      // Nếu chưa đến cuối, cứ tiến tới 1 bước
      setCurrentIndex(currentIndex + 1);
    } else {
      // Nếu đã kịch đường ở cuối, quay lại vị trí số 0 (vòng lặp)
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      // Nếu chưa ở đầu, cứ lùi lại 1 bước
      setCurrentIndex(currentIndex - 1);
    } else {
      // Nếu đang ở vị trí đầu tiên mà bấm lùi, nhảy thẳng đến cuối (vòng lặp)
      setCurrentIndex(images.length - itemsToShow);
    }
  };

  return (
    <div className="field-info-container">
      
      {/* --- MODAL PHÓNG TO ẢNH --- */}
      {zoomedImg && (
        <div className="image-modal-overlay" onClick={() => setZoomedImg(null)}>
          <span className="close-modal-btn">&times;</span>
          <img src={zoomedImg} alt="Zoomed" className="zoomed-image" />
        </div>
      )}

      {/* --- PHẦN 1: THƯ VIỆN ẢNH (GALLERY) --- */}
      <div className="gallery-section">
        {/* Nút mũi tên trái */}
        <button className="arrow-btn" onClick={prevSlide}>&#10094;</button>
        
        {/* Danh sách ảnh */}
        <div className="image-list-wrapper">
          <div 
            className="image-list-track" 
            style={{ transform: `translateX(-${currentIndex * (300 + 16)}px)` }} 
            /* Sửa lại: 300px là width của ảnh, 16px là gap */
          >
            {images.map((img, index) => (
              <div className="img-hover-wrapper" key={index}>
                <img 
                  src={img} 
                  alt={`Sân cầu lông ${index + 1}`} 
                  className="gallery-img" 
                  onClick={() => setZoomedImg(img)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nút mũi tên phải */}
        <button className="arrow-btn" onClick={nextSlide}>&#10095;</button>
      </div>

      {/* --- PHẦN 2: THÔNG TIN CHI TIẾT --- */}
      <div className="info-section">
        <div className="info-box">
          Sân cầu lông đạt tiêu chuẩn thi đấu phong trào và bán chuyên, với mặt sân thảm cao cấp chống trơn trượt, hệ thống chiếu sáng LED hiện đại và không gian rộng rãi, thoáng mát.
        </div>
        <div className="info-box short-box">
          <span className="info-label">Loại mặt sân:</span> Thảm cao su chuyên dùng
        </div>
        <div className="info-box short-box">
          <span className="info-label">Hệ thống chiếu sáng:</span> Đèn LED chống chói
        </div>
        <div className="info-box short-box">
          <span className="info-label">Giờ hoạt động:</span> 6:00 - 22:00
        </div>
      </div>
      
    </div>
  );
};

export default FieldInfoTab;