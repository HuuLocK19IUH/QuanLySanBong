import React from 'react';
import DetailImg from '../assets/ProductDetailImage.png';

const ProductDetailImage = () => {
  return (
    <div style={{ width: '100%' }}>
      <img 
        src={DetailImg}
        alt="Product Detail" 
        style={{ 
          width: '100%', 
          height: 'auto',        /* Tự động tính toán chiều cao để không bóp méo ảnh */
          maxHeight: '450px',    /* Giới hạn độ cao tối đa (bạn có thể tăng/giảm số này) */
          objectFit: 'cover',    /* Nếu ảnh chạm maxHeight, nó sẽ cắt gọn gàng thay vì kéo giãn */
          objectPosition: 'center' /* Ưu tiên hiển thị chính giữa bức ảnh */
        }}
      />
    </div>
  );
};

export default ProductDetailImage;