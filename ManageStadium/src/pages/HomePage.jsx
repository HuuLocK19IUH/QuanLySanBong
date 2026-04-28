import HomePageTaskbar from "../components/HomePageTaskbar";
import CarouselBoard from "../components/CarouselBoard";
import Filter from "../components/Filter";
import SportFieldCard from "../components/SportFieldCard";
import SportFieldCardImg from "../assets/sportfieldcardimg1.png"
import { useState, useMemo } from "react";
import "../styles/HomePage.css";
import pagenavleft from "../assets/Expand_left.png";
import pagenavright from "../assets/Expand_right.png";
import mycourtxinchaoavt from "../assets/mycourtxinchaoavt.png"
import IntroImgCard from "../components/IntroImgCard";
import introimg from "../assets/introimg.png"
import HomePageInfoFooter from "../components/HomePageInfoFooter";
import Footer from "../components/Footer";

function HomePage() {
    const [showFilter, setShowFilter] = useState(false);

    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedType, setSelectedType] = useState("all"); 
    const [maxPrice, setMaxPrice] = useState(1000000); 
    const [selectedTime, setSelectedTime] = useState(""); 

    const sportFields = [
        { id: 1, img: SportFieldCardImg, name: "Sân cầu lông indoor 1", type: "Cầu Lông", price: 150000, state: "Trống", starCount: 4, evaluate: "12400", timeSlots: ["17:00", "18:00"] },
        { id: 2, img: SportFieldCardImg, name: "Sân cầu lông indoor 2", type: "Cầu Lông", price: 150000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["18:00"] },
        { id: 3, img: SportFieldCardImg, name: "Sân Tennis Pro", type: "Tennis", price: 300000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["17:00", "19:00"] },
        { id: 4, img: SportFieldCardImg, name: "Sân bóng đá Mini", type: "Bóng Đá", price: 250000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["18:00", "20:00"] },
        { id: 5, img: SportFieldCardImg, name: "Sân cầu lông indoor 3", type: "Cầu Lông", price: 150000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["06:00"] },
        { id: 6, img: SportFieldCardImg, name: "Sân bóng bàn ghép", type: "Bóng Bàn", price: 50000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["17:00"] },
        { id: 7, img: SportFieldCardImg, name: "Sân cầu lông indoor 4", type: "Cầu Lông", price: 150000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["19:00"] },
        { id: 8, img: SportFieldCardImg, name: "Sân Pickleball", type: "Pickleball", price: 120000, state: "Trống", starCount: 5, evaluate: "12400", timeSlots: ["17:00", "18:00"] },
        { id: 9, img: SportFieldCardImg, name: "Sân VIP 1", type: "Cầu Lông", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000", timeSlots: [] },
        { id: 10, img: SportFieldCardImg, name: "Sân mini 1", type: "Bóng Đá", price: 100000, state: "Trống", starCount: 3, evaluate: "8000", timeSlots: ["17:00"] },
        { id: 11, img: SportFieldCardImg, name: "Sân VIP 2", type: "Tennis", price: 200000, state: "Đã đặt", starCount: 5, evaluate: "22000", timeSlots: [] },
        { id: 12, img: SportFieldCardImg, name: "Sân mini 2", type: "Cầu Lông", price: 100000, state: "Trống", starCount: 3, evaluate: "8000", timeSlots: ["18:00"] },
    ];

    // LOGIC LỌC DỮ LIỆU
    const filteredFields = useMemo(() => {
        return sportFields.filter(field => {
            if (searchTerm && !field.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (selectedType !== "all" && field.type !== selectedType) return false;
            if (selectedTime && !field.timeSlots.includes(selectedTime)) return false;
            if (field.price > maxPrice) return false;
            return true;
        });
    }, [searchTerm, selectedType, selectedTime, maxPrice]);

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredFields.length / itemsPerPage) || 1; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredFields.slice(startIndex, startIndex + itemsPerPage);

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
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            {showFilter && (
                <div className="filter-con">
                    <Filter 
                        selectedType={selectedType}
                        setSelectedType={setSelectedType}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    />
                </div>
            )}

            <div className="sportfieldgrid">
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                        <SportFieldCard key={item.id} {...item} />
                    ))
                ) : (
                    <h2 style={{ gridColumn: "span 4", textAlign: "center", marginTop: "40px", color: "#36656B" }}>
                        Không tìm thấy sân phù hợp.
                    </h2>
                )}
            </div>
            
            <div className="sportfieldcard-pagenagivation">
                <img
                    src={pagenavleft}
                    alt=""
                    onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1); }}
                    style={{ cursor: "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
                />
                <img
                    src={pagenavright}
                    alt=""
                    onClick={() => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); }}
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
            <div><HomePageInfoFooter /></div>
            <div className="hp-footer"><Footer /></div>
        </div>
    )
}
export default HomePage;