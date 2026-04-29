import "../styles/TimeFilter.css";
import CalendarFilter from "./CalendarFilter";
function TimeFilter({ selectedTime, setSelectedTime }) {
    const hour = selectedTime ? parseInt(selectedTime.split(":")[0], 10) : 0;

    const formatTime = (h) => {
        return `${String(h).padStart(2, "0")}:00`;
    };

    const handleSliderChange = (e) => {
        const newHour = e.target.value;
        if (newHour === "0") {
            setSelectedTime(""); 
        } else {
            setSelectedTime(formatTime(newHour));
        }
    };

    const handleInputChange = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        if (input === "0" || input === "") {
            setSelectedTime("");
        } else {
            setSelectedTime(formatTime(input));
        }
    };

    return (
        <div className="price-filter">
            <input
                type="range"
                min="0"
                max="24"
                value={hour}
                onChange={handleSliderChange}
                className="slider"
            />

            <div className="boxtime-res">
                <CalendarFilter></CalendarFilter>
                <input
                    type="text"
                    // Hiển thị giờ ra màn hình
                    value={formatTime(hour)}
                    id="time-result"
                    onChange={handleInputChange}
                />
                <p>Giờ</p>
            </div>
        </div>
    );
}

export default TimeFilter;