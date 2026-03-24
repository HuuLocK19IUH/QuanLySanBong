import "../styles/cartHistoryPages.css"

function HistoryCard({ booking, openDetail }) {

  return (
    <div className="mh-card">

      <img
        className="mh-court-img"
        src={booking?.img}
        alt=""
      />

      <div className="mh-card-info">

        <h3>{booking?.title}</h3>

        <span className="mh-tag">
          {booking?.tag}
        </span>

        <p className="mh-date">Ngày sử dụng: {booking?.date}</p>

      </div>

      <div className="mh-card-right">

        <p className="mh-card-status">Trạng thái: {booking?.status}</p>

        <div className="mh-btn-group">

          <button className="mh-btn mh-btn--small" onClick={openDetail}>
            Chi tiết
          </button>

          <button className="mh-btn mh-btn--small">
            Đánh giá
          </button>

        </div>

      </div>

    </div>
  )
}

export default HistoryCard