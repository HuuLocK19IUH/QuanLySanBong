import React, { useState } from 'react';
import '../styles/FieldInfoTab.css';

const FieldInfoTab = ({ sportfield }) => {
  const defaultImages = ['/images/badminton.png', '/images/football.png'];
  const images = [sportfield?.img_url, ...(sportfield?.img_descrip || [])].filter(Boolean);
  
  // Đảm bảo các đường dẫn đầu đủ
  const galleryImages = (images.length ? images : defaultImages).map(img => {
    if (!img) return '/images/badminton.png';
    // Nếu img không có dấu /, thêm /
    return img.startsWith('/') ? img : `/${img}`;
  });

  const [zoomedImg, setZoomedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  const nextSlide = () => {
    if (currentIndex + itemsToShow < galleryImages.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, galleryImages.length - itemsToShow));
    }
  };

  const description = sportfield?.description || {};

  return (
    <div className="field-info-container">
      {zoomedImg && (
        <div className="image-modal-overlay" onClick={() => setZoomedImg(null)}>
          <span className="close-modal-btn">&times;</span>
          <img src={zoomedImg} alt="Zoomed" className="zoomed-image" />
        </div>
      )}

      <div className="gallery-section">
        <button className="arrow-btn" onClick={prevSlide}>&#10094;</button>
        <div className="image-list-wrapper">
          <div className="image-list-track" style={{ transform: `translateX(-${currentIndex * 316}px)` }}>
            {galleryImages.map((img, index) => (
              <div className="img-hover-wrapper" key={index}>
                <img
                  src={img}
                  alt={`Sân ${index + 1}`}
                  className="gallery-img"
                  onClick={() => setZoomedImg(img)}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="arrow-btn" onClick={nextSlide}>&#10095;</button>
      </div>

      <div className="info-section">
        <div className="info-box">
          {description?.short_description || 'Chi tiết sân sẽ hiển thị khi có dữ liệu từ hệ thống.'}
        </div>
        <div className="info-box short-box">
          <span className="info-label">Loại mặt sân:</span> {description?.loaimatsan || 'Chưa có dữ liệu'}
        </div>
        <div className="info-box short-box">
          <span className="info-label">Hệ thống chiếu sáng:</span> {description?.hethongchieusang || 'Chưa có dữ liệu'}
        </div>
        <div className="info-box short-box">
          <span className="info-label">Giờ hoạt động:</span> {description?.giothuhoatdong || 'Chưa có dữ liệu'}
        </div>
      </div>
    </div>
  );
};

export default FieldInfoTab;