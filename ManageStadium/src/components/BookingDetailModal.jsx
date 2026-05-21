import "../styles/bookingDetail.css"

function BookingDetailModal({ onClose, booking, onReview, hideReview }) {
  const avatar = booking?.avatar || "https://i.pravatar.cc/60"
  const code = booking?.code || "#232"
  const userName = booking?.userName || "Quách Ngọc Long"
  const phone = booking?.phone || "0933544446"
  const timeText =
    booking?.timeText || "17h - 18h30 - 06/03/2026"

  const bill = booking?.bill || {}
  const totalHoursText = bill?.totalHoursText || "17h - 18h30 (1h30)"
  const totalServicesQty = bill?.totalServicesQty ?? 1
  const items =
    bill?.items || [
      { qty: 1, name: "Cầu lông", price: 200000 },
      { qty: 3, name: "Suối Dasani nhỏ", price: 10000 }
    ]
  const totalService = bill?.totalService || 230000
  const totalHourlyCost = bill?.totalHourlyCost || 60000
  const totalOrder = bill?.totalOrder || 290000

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        <img
          className="modal-avatar"
          src={avatar}
          alt=""
        />

        <h3>Mã đơn {code}</h3>

        <p><b>Tên người đặt:</b> {userName}</p>
        <p><b>Số điện thoại:</b> {phone}</p>
        <p><b>Thời gian đặt:</b> {timeText}</p>

        <h4>Thông tin hóa đơn</h4>

        <div className="bill-row">
          <span>Tổng giờ:</span>
          <span>{totalHoursText}</span>
        </div>

        <div className="bill-row">
          <span>Tổng dịch vụ:</span>
          <span>{totalServicesQty}</span>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>Số lượng</th>
              <th>Dịch vụ</th>
              <th>Giá</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it, idx) => (
              <tr key={idx}>
                <td>x{it.qty}</td>
                <td>{it.name}</td>
                <td>{Number(it.price).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Tổng tiền dịch vụ: {Number(totalService).toLocaleString()}đ
        </div>

        <div className="total">
          Tổng tiền giờ chơi: {Number(totalHourlyCost).toLocaleString()}đ
        </div>

        <div className="total">
          <b>Tổng đơn: {Number(totalOrder).toLocaleString()}đ</b>
        </div>

        <div className="modal-buttons">

          <button
            className="exit-btn"
            onClick={onClose}
          >
            Thoát
          </button>

          {!hideReview && (
            <button
              className="review-btn"
              onClick={() => onReview?.(booking)}
            >
              Đánh giá
            </button>
          )}

        </div>

      </div>

    </div>
  )
}

export default BookingDetailModal