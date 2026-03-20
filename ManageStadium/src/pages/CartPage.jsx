import Taskbar from "../components/Taskbar"
import CourtCard from "../components/CourtCard"

function CartPage() {

  return (
    <div>

      <Taskbar />

      <div className="container">

        <h2>Giỏ hàng</h2>

        <CourtCard status="đang chờ thanh toán" />

        <CourtCard status="hết hạn thanh toán" />

      </div>

    </div>
  )
}

export default CartPage