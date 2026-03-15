import "../styles/bookingDetail.css"

function BookingDetailModal({ onClose }) {

  return (
    <div className="modal-overlay">

      <div className="booking-modal">

        <img
          className="modal-avatar"
          src="https://i.pravatar.cc/60"
        />

        <h3>Mã đơn #232</h3>

        <p><b>Tên người đặt:</b> Quách Ngọc Long</p>
        <p><b>Số điện thoại:</b> 0933544446</p>
        <p><b>Thời gian đặt:</b> 17h - 18h30 - 06/03/2026</p>

        <h4>Thông tin hóa đơn</h4>

        <div className="bill-row">
          <span>Tổng giờ:</span>
          <span>17h - 18h30 (1h30)</span>
        </div>

        <div className="bill-row">
          <span>Tổng dịch vụ:</span>
          <span>1</span>
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
            <tr>
              <td>x1</td>
              <td>Cầu lông</td>
              <td>200.000</td>
            </tr>

            <tr>
              <td>x3</td>
              <td>Suối Dasani nhỏ</td>
              <td>10.000</td>
            </tr>
          </tbody>
        </table>

        <div className="total">
          Tổng tiền dịch vụ: 230.000đ
        </div>

        <div className="total">
          <b>Tổng đơn: 290.000đ</b>
        </div>

        <div className="modal-buttons">

          <button
            className="exit-btn"
            onClick={onClose}
          >
            Thoát
          </button>

          <button className="review-btn">
            Đánh giá
          </button>

        </div>

      </div>

    </div>
  )
}

export default BookingDetailModal