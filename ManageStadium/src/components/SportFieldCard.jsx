
import { useNavigate } from "react-router-dom";
import starFill from "../assets/Star_fill.png"
import starUnFill from "../assets/Star_unfill.png"
import "../styles/SportFieldCard.css"
function SportFieldCard({ img, name, price, state, evaluate, starCount}) {
    const navigate = useNavigate()
    const FormatPrice = (price) => {
        return price.toLocaleString("vi-VN");
    };

    const FormatRating = (rating) => {
        return (Number(rating) / 1000).toFixed(1);
    };
    return (
        <div className="sportfieldcard" onClick={() => navigate("/field-detail")}>
            <img src={img} alt="" />
            <div className="card-info">
                <p className="card-name">{name}</p>
                <p className="card-price">{FormatPrice(price)}đ/ 1 tiếng</p>
                <div className="card-footer">
                    <p className="card-state">Trạng thái: {state}</p>
                    <div className="card-evaluate">
                        <div style={{ display: "flex" }}>
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={index < starCount ? starFill : starUnFill}
                                    alt="star"
                                    className="star-img"
                                />
                            ))}
                        </div>
                        <p>{FormatRating(evaluate)}K</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SportFieldCard;