function HistoryCard({ openDetail }) {

  return (
    <div className="card">

      <img
        className="court-img"
        src="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
      />

      <div className="card-info">

        <h3>Sân cầu lông 4 người</h3>

        <span className="tag">
          Cầu lông
        </span>

        <p>Ngày sử dụng: 06/03/2026</p>

      </div>

      <div className="card-right">

        <p>Trạng thái: hoàn thành</p>

        <div className="btn-group">

          <button onClick={openDetail}>
            Chi tiết
          </button>

          <button>
            Đánh giá
          </button>

        </div>

      </div>

    </div>
  )
}

export default HistoryCard