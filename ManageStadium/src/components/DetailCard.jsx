import React from 'react';
import '../styles/DetailCard.css';

import avatarImg from '../assets/ProductDetailAVT.png';
import badmintonIcon from '../assets/playing_badminton.png';
import starIcon from '../assets/Star_fill.png';
import { useNavigate } from 'react-router-dom';

const DetailCard = ({ sportfield }) => {
  const navigate = useNavigate();
  const ratingDisplay = sportfield?.avg_rating ? `${sportfield.avg_rating}/5` : "Chưa có đánh giá";
  const totalRating = sportfield?.total_rating ? sportfield.total_rating : 0;
  const type = sportfield?.sportfield_type || "Sân thể thao";
  
  // Đảm bảo đường dẫn ảnh đầu đủ
  const imgUrl = sportfield?.img_url
    ? (sportfield.img_url.startsWith('/') ? sportfield.img_url : `/${sportfield.img_url}`)
    : avatarImg;

  return (
    <div className="detail-card">
      <div className="detail-card-left">
        <img
          src={imgUrl}
          alt="Avatar Sân"
          className="avatar"
        />

        <div className="info">
          <h2 className="title">{sportfield?.title || 'Sân thể thao'}</h2>

          <div className="badge">
            <img
              src={badmintonIcon}
              alt="Icon Cầu lông"
              className="badge-icon"
            />
            <span className="badge-text">{type}</span>
          </div>
        </div>
      </div>

      <div className="detail-card-right">
        <button className="OrderBtn" onClick={() => navigate("/calendar-booking", {
          state: { id: "SF002" }
        })}>
          Đặt lịch
        </button>

        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < Math.round(sportfield?.avg_rating || 0) ? starIcon : starIcon}
                alt="Star"
                className="star-icon"
              />
            ))}
          </div>
          <span className="rating-text">{ratingDisplay} ({totalRating})</span>
        </div>
      </div>

    </div >
  );
};

export default DetailCard;