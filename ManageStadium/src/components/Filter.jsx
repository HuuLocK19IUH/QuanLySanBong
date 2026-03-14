import FilterSportFieldbtn from "./FilterSportFieldbtn";
import CauLongicon from "../assets/playing_badminton.png"
import CalendartypeBtn from "./CalendartypeBtn";
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
                <h4>Loại lịch</h4>
                <div className="calendartype-filter">
                    <CalendartypeBtn text={"Sân trống"} />
                    <CalendartypeBtn text={"Ghép đội"} />
                </div>
            </div>
        </div>
    )
}

export default Filter;