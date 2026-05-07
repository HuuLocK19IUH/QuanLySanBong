import FilterSportFieldbtn from "./FilterSportFieldbtn";
import CauLongicon from "../assets/playing_badminton_gold.png" 
import CalendartypeBtn from "./CalendartypeBtn";
import PriceFilter from "./PriceFilter";
import TimeFilter from "./TimeFilter";
import { useEffect, useState } from "react";
import { getKeywords } from "../api/sportfieldApi/sportfieldsApi";
import "../styles/Filter.css"

function Filter({ selectedType, setSelectedType, maxPrice, setMaxPrice, selectedTime, setSelectedTime }) {

    const [sportTypes, setSportTypes] = useState([]);

    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const keywords = await getKeywords();
                if (keywords && keywords.length > 0) {
                    const types = keywords.map(kw => ({
                        id: kw,
                        name: kw,
                    }));
                    setSportTypes(types);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách loại sân:", error);
            }
        };

        fetchKeywords();
    }, []);

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
                            <FilterSportFieldbtn text={type.name} />
                        </div>
                    ))}
                </div>

            </div>

            <div className="filter-right">
                <div className="price-filter">
                    <h4>Lọc theo giá</h4>
                    <PriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                </div>
            </div>
        </div>
    )
}
export default Filter;