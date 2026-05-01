import HomePageTaskbar from "../components/HomePageTaskbar";
import CarouselBoard from "../components/CarouselBoard";
import Filter from "../components/Filter";
import SportFieldCard from "../components/SportFieldCard";
import { useState, useEffect, useMemo } from "react";
import "../styles/HomePage.css";
import pagenavleft from "../assets/Expand_left.png";
import pagenavright from "../assets/Expand_right.png";
import mycourtxinchaoavt from "../assets/mycourtxinchaoavt.png"
import IntroImgCard from "../components/IntroImgCard";
import introimg from "../assets/introimg.png"
import HomePageInfoFooter from "../components/HomePageInfoFooter";
import Footer from "../components/Footer";

// Các import API và Context mới của Ngọc Long
import Usericon from "../assets/User_cicrle_light.png";
import { getSportFields } from "../api/sportfieldApi/sportfieldsApi";
import { useUser } from "../hooks/context/UserContext";

function HomePage() {
    const [showFilter, setShowFilter] = useState(false);
    
    // 1. Quản lý user và state chứa dữ liệu thật (của Ngọc Long)
    const { user } = useUser();
    const [sportFields, setSportFields] = useState([]);

    // 2. Các State quản lý Bộ Lọc (của Thanh Long)
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedType, setSelectedType] = useState("all"); 
    const [maxPrice, setMaxPrice] = useState(1000000); 
    const [selectedTime, setSelectedTime] = useState(""); 

    useEffect(() => {
        getSportFields()
            .then(data => {
                console.log("SPORTFIELDS:", data); 
                setSportFields(data);
            })
            .catch(err => console.log(err));
    }, []);

    const filteredFields = useMemo(() => {
        return sportFields.filter(field => {
            if (searchTerm && !field.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (selectedType !== "all" && field.type !== selectedType) return false;
            // Lưu ý: Thêm điều kiện field.timeSlots tồn tại để tránh lỗi nếu API chưa trả về lịch trống
            if (selectedTime && field.timeSlots && !field.timeSlots.includes(selectedTime)) return false;
            if (field.price > maxPrice) return false;
            return true;
        });
    }, [searchTerm, selectedType, selectedTime, maxPrice, sportFields]);

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
                    user={user} // Đã truyền biến user của Ngọc Long!
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
                        <SportFieldCard key={item._id} {...item} />
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
                    {inTroImgCards.map((item) => (
                        <IntroImgCard key={item.nameimg} {...item} />
                    ))}
                </div>
            </div>
            <div><HomePageInfoFooter /></div>
            <div className="hp-footer"><Footer /></div>
        </div>
    )
}
export default HomePage;