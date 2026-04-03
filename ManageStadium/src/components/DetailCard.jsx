import React from 'react';
import '../styles/DetailCard.css';

import avatarImg from '../assets/ProductDetailAVT.png';
import badmintonIcon from '../assets/playing_badminton.png';
import starIcon from '../assets/Star_fill.png';
import { useNavigate } from 'react-router-dom';

const DetailCard = () => {

  const navigate = useNavigate();
  return (
    <div className="detail-card">

      {/* --- Phần bên trái: Avatar & Tên sân --- */}
      <div className="detail-card-left">
        <img
          src={avatarImg}
          alt="Avatar Sân"
          className="avatar"
        />

        <div className="info">
          <h2 className="title">
            Sân cầu lông 4 người
          </h2>

          <div className="badge">
            <img
              src={badmintonIcon}
              alt="Icon Cầu lông"
              className="badge-icon"
            />
            <span className="badge-text">
              Cầu lông
            </span>
          </div>
        </div>
      </div>

      {/* --- Phần bên phải: Nút đặt lịch & Đánh giá --- */}
      <div className="detail-card-right">
        <button className="OrderBtn" onClick={() => navigate("/booking")}>
          Đặt lịch
        </button>

        <div className="rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={starIcon}
                alt="Star"
                className="star-icon"
              />
            ))}
          </div>
          <span className="rating-text">
            12,4k
          </span>
        </div>
      </div>

    </div>
  );
};

export default DetailCard;