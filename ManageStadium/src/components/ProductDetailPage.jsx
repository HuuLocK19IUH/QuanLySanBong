import React from 'react';
import DetailImg from '../assets/ProductDetailImage.png';

const ProductDetailImage = ({ imageUrl }) => {
  const ensureValidPath = (url) => {
    if (!url) return DetailImg;
    // Đảm bảo URL có dấu / ở đầu nếu là đường dẫn tương đối
    if (url.startsWith('/') || url.startsWith('http')) return url;
    return `/${url}`;
  };
  
  const imageSource = ensureValidPath(imageUrl);
  
  return (
    <div style={{ width: '100%' }}>
      <img 
        src={imageSource}
        alt="Product Detail" 
        style={{ 
          width: '100%', 
          height: 'auto',
          maxHeight: '450px',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        onError={(e) => {
          e.target.src = DetailImg;
        }}
      />
    </div>
  );
};

export default ProductDetailImage;