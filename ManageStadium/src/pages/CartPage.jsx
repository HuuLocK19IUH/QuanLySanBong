import Taskbar from "../components/HomePageTaskbar"
import CourtCard from "../components/CourtCard"
import Footer from "../components/Footer"
import "../styles/cartHistoryPages.css"

function CartPage() {

  return (
    <div className="mh-page">

      <Taskbar />

      <div className="mh-main">
        <div className="mh-panel">
          <h2 className="mh-page-title">Giỏ hàng</h2>

          <div className="mh-secondary-search">
            <div className="mh-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo loại sân"
            />
          </div>

          <div className="mh-list">
            <CourtCard
              title="Sân cầu lông 4 người"
              tag="Cầu lông"
              img="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
              status="đang chờ thanh toán"
              onPay={() => { }}
            />
            <CourtCard
              title="Sân cầu lông 4 người"
              tag="Cầu lông"
              img="https://images.unsplash.com/photo-1599058917212-d750089bc07e"
              status="hết hạn thanh toán"
              onPay={() => { }}
            />
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default CartPage