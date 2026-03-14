import HomePageTaskbar from "../components/HomePageTaskbar";
import CarouselBoard from "../components/CarouselBoard";
import Filter from "../components/Filter";
import "../styles/HomePage.css";

function HomePage() {
    return (
        <div className="homepage">
            <div className="carousel-container">
                {/* <CarouselBoard /> */}
            </div>
{/* 
            <HomePageTaskbar /> */}
            <Filter />
        </div>
    )
}

export default HomePage;