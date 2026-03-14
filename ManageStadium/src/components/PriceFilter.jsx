import { useState } from "react";
import "../styles/PriceFilter.css";

function PriceFilter() {

    const [price, setPrice] = useState(0);

    const formatNumber = (num) => {
        return Number(num).toLocaleString("vi-VN");
    };

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // chỉ giữ số
        setPrice(input);
    };

    return (
        <div className="price-filter">

            <input
                type="range"
                min="0"
                max="1000000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="slider"
            />

            <div className="boxprice-res">
                <input
                    type="text"
                    value={formatNumber(price)}
                    id="price-result"
                    onChange={handleChange}
                />
                <p>/1 tiếng</p>
            </div>

        </div>
    );
}

export default PriceFilter;