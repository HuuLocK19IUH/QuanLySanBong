import "../styles/cartHistoryPages.css"

function CourtCard({ title, tag, img, status, onPay, isExpired }) {

  return (
    <div className="mh-card">

      <img
        className="mh-court-img"
        src={img}
        alt=""
      />

      <div className="mh-card-info">

        <h3>{title}</h3>

        <span className="mh-tag">
          {tag}
        </span>

      </div>

      <div className="mh-card-right">

        <p className="mh-card-status">Trạng thái: {status}</p>

        <button 
          className="mh-btn" 
          onClick={onPay}
          disabled={isExpired}
          style={{ 
            backgroundColor: isExpired ? "#ccc" : undefined, 
            cursor: isExpired ? "not-allowed" : "pointer",
            border: isExpired ? "none" : undefined,
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {isExpired ? "Đã hết hạn" : "Thanh toán"}
        </button>

      </div>

    </div>
  )
}

export default CourtCard