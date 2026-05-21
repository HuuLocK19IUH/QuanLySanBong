import React, { useMemo, useState } from 'react';
import '../styles/ReviewTab.css';

function ReviewTab({ reviews = [], avgRating = 0, totalRating = 0, onSubmitReview, user }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredReviews = useMemo(() => {
    if (activeFilter === 'all') return reviews;
    return reviews.filter((review) => review.star_rating === activeFilter);
  }, [reviews, activeFilter]);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setSubmitError('Bạn cần đăng nhập để gửi đánh giá.');
      return;
    }
    if (!reviewText.trim()) {
      setSubmitError('Vui lòng nhập nội dung đánh giá.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);
    try {
      await onSubmitReview(starRating, reviewText.trim());
      setReviewText('');
      setStarRating(5);
    } catch (error) {
      setSubmitError(error?.message || 'Không thể gửi đánh giá.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-tab-container">
      <div className="rating-bar">
        <div className="rating-summary">
          <h2 className="rating-score">{avgRating ? avgRating.toFixed(1) : '0'}/5</h2>
          <p className="rating-count">{totalRating ? `${totalRating} đánh giá` : 'Chưa có đánh giá'}</p>
        </div>
        <div className="rating-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Tất cả
          </button>
          {[5, 4, 3, 2, 1].map((value) => (
            <button
              key={value}
              className={`filter-btn ${activeFilter === value ? 'active' : ''}`}
              onClick={() => setActiveFilter(value)}
            >
              {value} sao
            </button>
          ))}
        </div>
      </div>

      <div className="review-input-card">
        <div className="reviewer-avatar" style={{ padding: user?.avatar ? 0 : undefined, overflow: 'hidden' }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          )}
        </div>
        <div className="review-info">
          <h4 className="reviewer-name">{user?.name || user?.user_name || 'Martus'}</h4>

          <div className="star-input-selector">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star-icon ${starRating >= value ? 'selected' : ''}`}
                onClick={() => setStarRating(value)}
              >
                ★
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="input-form" style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="review-input-field"
              style={{ flex: 1 }}
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="Hãy để lại bình luận và đánh giá của bạn"
              disabled={!user || isSubmitting}
            />
            <button
              type="submit"
              className="submit-review-btn"
              style={{
                padding: '0 20px',
                backgroundColor: '#75b06f',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: (!user || isSubmitting) ? 'not-allowed' : 'pointer',
                opacity: (!user || isSubmitting) ? 0.6 : 1,
                fontWeight: 'bold',
                fontFamily: 'kanit',
              }}
              disabled={!user || isSubmitting}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </form>
          {submitError && <p className="review-error-text">{submitError}</p>}
        </div>
      </div>

      <div className="review-list">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review._id || review.rating_id} className="review-card">
              <div className="reviewer-avatar" style={{ padding: review.user_avatar ? 0 : undefined, overflow: 'hidden' }}>
                {review.user_avatar ? (
                  <img src={review.user_avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              <div className="review-info">
                <div className="review-header">
                  <h4 className="reviewer-name">{review.user_name || review.user_name || 'Người dùng'}</h4>
                  <span className="review-stars">{renderStars(review.star_rating)}</span>
                </div>
                <p className="review-content">{review.content || 'Không có nội dung.'}</p>
                <p className="review-date">{formatDate(review.date_created)}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#36656B', fontSize: '20px', textAlign: 'center', marginTop: '40px' }}>
            Chưa có đánh giá cho mức sao này.
          </p>
        )}
      </div>
    </div>
  );
}

export default ReviewTab;