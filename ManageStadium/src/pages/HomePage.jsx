import HomePageTaskbar from "../components/HomePageTaskbar";
import CarouselBoard from "../components/CarouselBoard";
import Filter from "../components/Filter";
import { useState } from "react";
import "../styles/HomePage.css";

function HomePage() {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <div className="homepage">
            <div className="carousel-container">
                <CarouselBoard />
            </div>
            <HomePageTaskbar toggleFilter={() => setShowFilter(!showFilter)} />
            {showFilter && (
                <div className="filter-con">
                    <Filter />
                </div>
            )}
        </div>
    )
}

export default HomePage;