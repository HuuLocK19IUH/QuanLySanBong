import "../styles/cartHistoryPages.css"

function CourtCard({ title, tag, img, status, onPay }) {

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

        <button className="mh-btn" onClick={onPay}>
          Thanh toán
        </button>

      </div>

    </div>
  )
}

export default CourtCard