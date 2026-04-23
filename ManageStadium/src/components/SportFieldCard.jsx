
import { useNavigate } from "react-router-dom";
import starFill from "../assets/Star_fill.png"
import starUnFill from "../assets/Star_unfill.png"
import "../styles/SportFieldCard.css"


function SportFieldCard({ img_url, title, pricing, state, avg_rating, total_rating }) {
    const navigate = useNavigate();

    const FormatPrice = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const displayPrice = pricing?.[0]?.price || 0;

    return (
        <div className="sportfieldcard" onClick={() => navigate("/field-detail")}>
            <img src={img_url} alt="hinhanh" />

            <div className="card-info">
                <p className="card-name">{title}</p>

                <p className="card-price">
                    {FormatPrice(displayPrice)}đ / 1 tiếng
                </p>

                <div className="card-footer">
                    <p className="card-state">
                        Trạng thái: {state ? "Còn sân" : "Hết sân"}
                    </p>

                    <div className="card-evaluate">
                        <div style={{ display: "flex" }}>
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={index < avg_rating ? starFill : starUnFill}
                                    alt="star"
                                    className="star-img"
                                />
                            ))}
                        </div>

                        <p>{total_rating}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SportFieldCard;