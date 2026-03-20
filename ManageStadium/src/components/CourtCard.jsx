function CourtCard({ status }) {

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

      </div>

      <div className="card-right">

        <p>Trạng thái: {status}</p>

        <button className="pay-btn">
          Thanh toán
        </button>

      </div>

    </div>
  )
}

export default CourtCard