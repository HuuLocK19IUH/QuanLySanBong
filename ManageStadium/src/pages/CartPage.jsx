import { useMemo, useState } from "react";
import Taskbar from "../components/HomePageTaskbar";
import CourtCard from "../components/CourtCard";
import Footer from "../components/Footer";
import { mockCartItems } from "../api/mockData";
import "../styles/cartHistoryPages.css";

function CartPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sử dụng mock data thay vì hardcoded
  const cartItems = mockCartItems;

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return cartItems;
    const lower = searchTerm.toLowerCase();
    return cartItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.tag.toLowerCase().includes(lower)
    );
  }, [searchTerm, cartItems]);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo loại sân trong giỏ hàng"
            />
          </div>

          <div className="mh-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <CourtCard
                  key={item.id}
                  title={item.title}
                  tag={item.tag}
                  img={item.img}
                  status={item.status}
                  onPay={() => {}}
                />
              ))
            ) : (
              <div style={{ padding: 24, textAlign: "center" }}>
                Không tìm thấy sản phẩm nào trong giỏ hàng.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;