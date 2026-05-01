import { useNavigate } from "react-router-dom";
import starFill from "../assets/Star_fill.png"
import starUnFill from "../assets/Star_unfill.png"
import "../styles/SportFieldCard.css"


function SportFieldCard({ _id, img_url, title, pricing, state, avg_rating, total_rating }) {
    const navigate = useNavigate();

    const FormatPrice = (price) => {
        return price?.toLocaleString("vi-VN") || "0";
    };

    // pricing có thể là object hoặc array
    const pricingItem = Array.isArray(pricing) ? pricing[0] : pricing;
    const displayPrice = Number(pricingItem?.price) || 0;
    
    // Đảm bảo đường dẫn ảnh đầu đủ
    const ensureValidPath = (url) => {
        if (!url) return "/images/badminton.png";
        if (url.startsWith('/') || url.startsWith('http')) return url;
        return `/${url}`;
    };
    
    const imageSrc = ensureValidPath(img_url);
    
    return (
        <div className="sportfieldcard" onClick={() => navigate(`/field-detail/${_id}`)}>

            <img 
              src={imageSrc} 
              alt="hinhanh"
              onError={(e) => {
                e.target.src = "/images/badminton.png";
              }}
            />

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
                                    key={`star-${_id}-${index}`}
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