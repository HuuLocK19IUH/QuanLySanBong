import HomePageTaskbar from "../components/HomePageTaskbar";
import CarouselBoard from "../components/CarouselBoard";
import Filter from "../components/Filter";
import SportFieldCard from "../components/SportFieldCard";
import SportFieldCardImg from "../assets/sportfieldcardimg1.png"
import { useState } from "react";
import "../styles/HomePage.css";
import pagenavleft from "../assets/Expand_left.png";
import pagenavright from "../assets/Expand_right.png";
import mycourtxinchaoavt from "../assets/mycourtxinchaoavt.png"
import IntroImgCard from "../components/IntroImgCard";
import introimg from "../assets/introimg.png"
function HomePage() {
    const [showFilter, setShowFilter] = useState(false);
    const sportFields = [
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 4, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },
        { img: SportFieldCardImg, name: "Sân cầu lông indoor", price: 150000, state: "Trống", starCount: 5, evaluate: "12400" },

        // 👉 thêm nhiều item để test phân trang
        { img: SportFieldCardImg, name: "Sân VIP", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000" },
        { img: SportFieldCardImg, name: "Sân mini", price: 100000, state: "Trống", starCount: 3, evaluate: "8000" },
        { img: SportFieldCardImg, name: "Sân VIP", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000" },
        { img: SportFieldCardImg, name: "Sân mini", price: 100000, state: "Trống", starCount: 3, evaluate: "8000" },
        { img: SportFieldCardImg, name: "Sân VIP", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000" },
        { img: SportFieldCardImg, name: "Sân mini", price: 100000, state: "Trống", starCount: 3, evaluate: "8000" },
        { img: SportFieldCardImg, name: "Sân VIP", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000" },
        { img: SportFieldCardImg, name: "Sân mini", price: 100000, state: "Trống", starCount: 3, evaluate: "8000" },
        { img: SportFieldCardImg, name: "Sân VIP", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000" },
        { img: SportFieldCardImg, name: "Sân mini", price: 100000, state: "Trống", starCount: 3, evaluate: "8000" },
    ];

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(sportFields.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sportFields.slice(startIndex, startIndex + itemsPerPage);

    const inTroImgCards = [
        { nameimg: "CLB", img: introimg },
        { nameimg: "Sự kiện", img: introimg },
        { nameimg: "Toàn cảnh", img: introimg },
    ]
    return (
        <div className="homepage">
            <div className="carousel-wrapper">
                <div className="carousel-container">
                    <CarouselBoard />
                </div>

                <HomePageTaskbar
                    className="homepage-taskbar"
                    toggleFilter={() => setShowFilter(!showFilter)}
                />
            </div>

            {showFilter && (
                <div className="filter-con">
                    <Filter />
                </div>
            )}


            <div className="sportfieldgrid">
                {currentItems.map((item, index) => (
                    <SportFieldCard key={index} {...item} />
                ))}
            </div>
            <div className="sportfieldcard-pagenagivation">
                <img
                    src={pagenavleft}
                    alt=""
                    onClick={() => {
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    style={{ cursor: "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
                />

                <img
                    src={pagenavright}
                    alt=""
                    onClick={() => {
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    style={{ cursor: "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
                />
            </div>

            <div className="aboutus-container">
                <div className="helo-con">
                    <img src={mycourtxinchaoavt} alt="" />
                    <p>My court xin chào</p>
                </div>
                <div className="introimg-con">
                    {inTroImgCards.map((item, index) => (
                        <IntroImgCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage;