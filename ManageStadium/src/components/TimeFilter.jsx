import { useState } from "react";
import "../styles/TimeFilter.css";
import CalendarFilter from "./CalendarFilter";
function TimeFilter() {
    const [hour, setHour] = useState(0);

    const formatTime = (h) => {
        return `${String(h).padStart(2, "0")}:00`;
    };

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        setHour(input);
    };

    return (
        <div className="price-filter">

            <input
                type="range"
                min="0"
                max="24"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="slider"
            />

            <div className="boxtime-res">
                <CalendarFilter></CalendarFilter>
                <input
                    type="text"
                    value={formatTime(hour)}
                    id="time-result"
                    onChange={handleChange}
                />
                <p>Giờ</p>
            </div>

        </div>
    );
}

export default TimeFilter;