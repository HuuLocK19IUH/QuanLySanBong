import "../styles/PriceFilter.css";
function PriceFilter({ maxPrice, setMaxPrice }) {

    const formatNumber = (num) => {
        return Number(num).toLocaleString("vi-VN");
    };

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại số
        // Cập nhật giá trị vào "bộ não" chung, ép kiểu về Number
        setMaxPrice(input ? Number(input) : 0);
    };

    return (
        <div className="price-filter">

            <input
                type="range"
                min="0"
                max="1000000"
                // 2. Gắn maxPrice vào thanh trượt
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="slider"
            />

            <div className="boxprice-res">
                <input
                    type="text"
                    value={formatNumber(maxPrice)}
                    id="price-result"
                    onChange={handleChange}
                />
                <p>/1 tiếng</p>
            </div>

        </div>
    );
}

export default PriceFilter;