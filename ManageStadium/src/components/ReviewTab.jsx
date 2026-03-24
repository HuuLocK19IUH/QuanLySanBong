import React, { useState } from 'react';
import '../styles/ReviewTab.css';

function ReviewTab() {
  const mockReviews = [
    {
      id: 1,
      name: "Martus",
      rating: 5,
      content: "Sân khá rộng và thoáng, đủ chỗ cho 4 người chơi thoải mái. Mặt sân tốt, ánh sáng ổn. Chỉ có điều giờ cao điểm hơi đông nên hơi ồn một chút.",
      date: "20-10-2025 10:34"
    },
    {
      id: 2,
      name: "Trần Anh Tú",
      rating: 4,
      content: "Trải nghiệm chơi khá tốt, sân không bị trơn và đèn chiếu sáng đầy đủ. Không gian đủ cho 4 người di chuyển thoải mái. Đôi lúc phải chờ sân vào buổi tối.",
      date: "21-10-2025 14:20"
    },
    {
      id: 3,
      name: "Lê Hải",
      rating: 3,
      content: "Sân tạm ổn trong tầm giá. Đèn ở góc sân số 2 hơi chói mắt xíu, hy vọng chủ sân sớm khắc phục.",
      date: "22-10-2025 09:15"
    },
    {
      id: 4,
      name: "Minh Quân",
      rating: 5,
      content: "Tuyệt vời! Sân sạch sẽ, anh chủ sân siêu nhiệt tình. Sẽ rủ hội bạn quay lại dài dài.",
      date: "23-10-2025 18:45"
    },
    {
      id: 5,
      name: "Khách vãng lai",
      rating: 2,
      content: "Hôm qua mình đi mưa vào, thảm sân có vài chỗ bị đọng nước rất dễ trượt ngã. Cần lau dọn kỹ hơn.",
      date: "24-10-2025 20:00"
    },
    {
      id: 6,
      name: "Tuấn Cường",
      rating: 1,
      content: "Mình đặt sân lúc 19h nhưng đến nơi lại bảo hết sân do trùng lịch ai đó? Hệ thống quản lý cần xem lại.",
      date: "25-10-2025 11:10"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredReviews = mockReviews.filter(review => {
    if (activeFilter === 'all') return true;
    return review.rating === activeFilter;
  });

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <div className="review-tab-container">
      
      {/* ================= THANH ĐIỂM SỐ TỔNG ================= */}
      <div className="rating-bar">
        <h2 className="rating-score">4/5</h2>
        <div className="rating-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} 
            onClick={() => setActiveFilter('all')}
          >
            Tất cả
          </button>
          <button 
            className={`filter-btn ${activeFilter === 5 ? 'active' : ''}`} 
            onClick={() => setActiveFilter(5)}
          >
            5 sao
          </button>
          <button 
            className={`filter-btn ${activeFilter === 4 ? 'active' : ''}`} 
            onClick={() => setActiveFilter(4)}
          >
            4 sao
          </button>
          <button 
            className={`filter-btn ${activeFilter === 3 ? 'active' : ''}`} 
            onClick={() => setActiveFilter(3)}
          >
            3 sao
          </button>
          <button 
            className={`filter-btn ${activeFilter === 2 ? 'active' : ''}`} 
            onClick={() => setActiveFilter(2)}
          >
            2 sao
          </button>
          <button 
            className={`filter-btn ${activeFilter === 1 ? 'active' : ''}`} 
            onClick={() => setActiveFilter(1)}
          >
            1 sao
          </button>
        </div>
      </div>

      {/* ================= DANH SÁCH BÌNH LUẬN ================= */}
      <div className="review-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="reviewer-avatar"></div>
              <div className="review-info">
                <h4 className="reviewer-name">{review.name}</h4>
                <p className="review-stars">{renderStars(review.rating)}</p>
                <p className="review-content">{review.content}</p>
                <p className="review-date">{review.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#36656B', fontSize: '20px', textAlign: 'center', marginTop: '40px' }}>
            Chưa có đánh giá nào cho mức sao này.
          </p>
        )}
      </div>

    </div>
  );
}

export default ReviewTab;