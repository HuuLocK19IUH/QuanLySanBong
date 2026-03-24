import FilterSportFieldbtn from "./FilterSportFieldbtn";
import CauLongicon from "../assets/playing_badminton_gold.png"
import CalendartypeBtn from "./CalendartypeBtn";
import PriceFilter from "./PriceFilter";
import TimeFilter from "./TimeFilter";
import "../styles/Filter.css"
function Filter() {
    return (
        <div className="filter">
            <div classnName="filter-left">
                <div className="sportfilter-title">
                    <h4>Loại sân</h4>
                    <button>Tất cả</button>
                </div>
                <div className="sportfieldtype-filter">
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                    <FilterSportFieldbtn text={"Cầu Lông"} icon={CauLongicon} />
                </div>
                <h4>Loại lịch</h4>
                <div className="calendartype-filter">
                    <CalendartypeBtn text={"Sân trống"} />
                    <CalendartypeBtn text={"Ghép đội"} />
                </div>
            </div>
            <div className="filter-right">
                <div className="price-filter">
                    <h4>Lọc theo giá</h4>
                    <PriceFilter></PriceFilter>
                </div>
                    <div className="time-filter">
                    <h4>Lọc theo thời gian</h4>
                    <TimeFilter></TimeFilter>
                </div>
            </div>
        </div>
    )
}

export default Filter;