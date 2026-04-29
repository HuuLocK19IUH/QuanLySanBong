import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getSportFields } from "../api/sportfieldApi/sportfieldsApi";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "../styles/CarouselBoard.css"

function CarouselBoard() {
    const navigate = useNavigate()
    const [discountFieldId, setDiscountFieldId] = useState(null);

    useEffect(() => {
        getSportFields()
            .then((fields) => {
                const match = fields.find((field) => {
                    const type = field?.sportfield_type?.toLowerCase() || "";
                    return type.includes("banh") || type.includes("5");
                });
                setDiscountFieldId(match?._id || fields?.[0]?._id || null);
            })
            .catch(() => {
                setDiscountFieldId(null);
            });
    }, []);

    const handleDiscountClick = () => {
        if (discountFieldId) {
            navigate(`/field-detail/${discountFieldId}`);
        } else {
            navigate("/");
        }
    };

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="carousel-div"
            >
                <SwiperSlide>
                    <div className="slide">
                        <img src="/images/badminton.png" alt="" />
                        <div className="slide-content">
                            <h2>Đặt sân ngay hôm nay</h2>
                            <button onClick={() => navigate("/")}>Đặt sân</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slide">
                        <img src="/images/football.png" alt="" />
                        <div className="slide-content">
                            <h2>Ưu đãi sân banh 5</h2>
                            <button onClick={handleDiscountClick}>Xem ngay</button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slide">
                        <img src="/images/badminton.png" alt="" />
                        <div className="slide-content">
                            <h2>Sân mới khai trương</h2>
                            <button onClick={handleDiscountClick}>Khám phá</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default CarouselBoard;