import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { useNavigate } from "react-router-dom"
import img1 from "../assets/imgCarousel1.png"
import "../styles/CarouselBoard.css"
function CarouselBoard() {
    const navigate = useNavigate()
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
                        <img src={img1} alt="" />
                        <div className="slide-content">
                            <h2>Đặt sân ngay hôm nay</h2>
                            <button onClick={() => navigate("/courts")}>
                                Đặt sân
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slide">
                        <img src={img1} alt="" />
                        <div className="slide-content">
                            <h2>Ưu đãi 20%</h2>
                            <button onClick={() => navigate("/promotion")}>
                                Xem ngay
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slide">
                        <img src={img1} alt="" />
                        <div className="slide-content">
                            <h2>Sân mới khai trương</h2>
                            <button onClick={() => navigate("/courts")}>
                                Khám phá
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default CarouselBoard;