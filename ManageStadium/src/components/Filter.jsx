import FilterSportFieldbtn from "./FilterSportFieldbtn";
import CauLongicon from "../assets/playing_badminton_gold.png" 
import CalendartypeBtn from "./CalendartypeBtn";
import PriceFilter from "./PriceFilter";
import TimeFilter from "./TimeFilter";
import "../styles/Filter.css"

function Filter({ selectedType, setSelectedType, maxPrice, setMaxPrice, selectedTime, setSelectedTime }) {

    const sportTypes = [
        { id: "Cầu Lông", name: "Cầu Lông", icon: CauLongicon },
        { id: "Tennis", name: "Tennis", icon: CauLongicon },
        { id: "Bóng Đá", name: "Bóng Đá", icon: CauLongicon },
        { id: "Bóng Bàn", name: "Bóng Bàn", icon: CauLongicon },
        { id: "Pickleball", name: "Pickleball", icon: CauLongicon }
    ];

    return (
        <div className="filter">
            <div className="filter-left">
                <div className="sportfilter-title">
                    <h4>Loại sân</h4>
                    <button 
                        className={selectedType === "all" ? "active-btn" : ""}
                        onClick={() => setSelectedType("all")}
                    >
                        Tất cả
                    </button>
                </div>
                <div className="sportfieldtype-filter">
                    {sportTypes.map((type) => (
                        <div 
                            key={type.id} 
                            onClick={() => setSelectedType(type.id)}
                            className={selectedType === type.id ? "active-sport-btn" : ""} 
                        >
                            <FilterSportFieldbtn text={type.name} icon={type.icon} />
                        </div>
                    ))}
                </div>

                <h4>Loại lịch</h4>
                <div className="calendartype-filter">
                    <div className="active-calendar-btn">
                        <CalendartypeBtn text={"Sân trống"} />
                    </div>
                    <CalendartypeBtn text={"Ghép đội"} />
                </div>
            </div>

            <div className="filter-right">
                <div className="price-filter">
                    <h4>Lọc theo giá</h4>
                    <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                </div>
                <div className="time-filter">
                    <h4>Lọc theo thời gian</h4>
                    <TimeFilter selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                </div>
            </div>
        </div>
    )
}
export default Filter;