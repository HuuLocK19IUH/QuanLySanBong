import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSportFieldBySF_Id } from "../api/sportfieldApi/getSportFieldBySF_Id";
import { getBookedSlotsAPI } from "../api/ordersApi/getBookedTimeSlotsBySportFieldAndDate";
import "../styles/Booking.css";

function CalendarBooking({ id }) {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const timeSlots = [
        "5:00", "5:30", "6:00", "6:30", "7:00", "7:30",
        "8:00", "8:30", "9:00", "9:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
    ];
    const [clickStep, setClickStep] = useState(0);
    const [tempStart, setTempStart] = useState(null);
    const [sportfield, setSportfield] = useState(null);
    const [sportfieldcalendar, setSportfieldcalendar] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedTime, setSelectedTime] = useState({
        start: null,
        end: null
    });
    const [timeCount, setTimeCount] = useState("");
    const [paid, setPaid] = useState(0);


    const handlePaid = (startTime, endTime, pricing, date) => {
        const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const day = daysMap[new Date(date).getDay()];

        let total = 0;
        let currentStart = startTime;

        const validPricing = pricing
            .filter(p => p.days.includes(day))
            .sort((a, b) => a.startTime - b.startTime);

        for (let i = 0; i < validPricing.length; i++) {
            const p = validPricing[i];

            // nếu currentStart đã >= endTime thì dừng
            if (currentStart >= endTime) break;

            // nếu chưa tới khoảng này thì skip
            if (currentStart >= p.endTime) continue;

            // nếu start nằm trước khoảng này → nhảy tới đầu khoảng
            if (currentStart < p.startTime) {
                currentStart = p.startTime;
            }

            // tính đoạn nằm trong khoảng hiện tại
            const segmentEnd = Math.min(endTime, p.endTime);

            if (currentStart < segmentEnd) {
                const hours = segmentEnd - currentStart;
                total += hours * p.price;

                // cập nhật để tính tiếp đoạn sau
                currentStart = segmentEnd;
            }
        }

        return total;
    };

    const toHour = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h + m / 60;
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const sf = await getSportFieldBySF_Id("SF002");
                console.log("API result:", sf);
                setSportfield(sf);

                const data = await getBookedSlotsAPI(sf.sportfield_id, selectedDate);
                console.log(data);
                setSportfieldcalendar(data);

                console.log(selectedTime.start)
                console.log(selectedTime.end)
                const start = toHour(selectedTime.start)
                const end = toHour(selectedTime.end)
                setPaid(handlePaid(start, end, sportfield.pricing, selectedDate));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [selectedDate, selectedTime]);


    const getSlotStatus = (index) => {
        const time = timeSlots[index];

        return sportfieldcalendar.some(([start, end]) => {
            return time >= start && time < end;
        })
            ? "booked"
            : "empty";
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleNext = () => {
        if (!selectedTime.start) return;

        navigate("/info-booking", {
            state: { selectedDate, selectedTime }
        });
    };

    const formatMinutesToTime = (minutes) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const hh = String(h).padStart(2, "0");
        const mm = String(m).padStart(2, "0");

        return `${hh}h${mm}`;
    };


    return (
        <div className="booking-page">
            {/* HEADER */}
            <div className="booking-header">
                <div className="header-top">
                    <button className="back-btn" onClick={handleBack}>
                        <span className="chevron-left"></span>
                    </button>

                    <h1 className="main-title">Đặt lịch ngày trực quan</h1>

                    <div className="calendar-wrapper">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="calendar-input"
                        />
                    </div>

                </div>

                <div className="legend">
                    <div className="legend-item"><span className="box empty"></span> Trống</div>
                    <div className="legend-item"><span className="box booked"></span> Đã đặt</div>
                    <div className="legend-item"><span className="box locked"></span> Khóa</div>
                </div>
            </div>

            {/* TIME SLOT */}
            <div className="time-axis-container">
                <div className="time-axis">
                    {timeSlots.map((t, i) => {
                        const status = getSlotStatus(i);
                        return (
                            <div
                                key={i}
                                className={`time-slot ${status} ${selectedIndex === i ? "active" : ""}`}
                                onClick={() => {
                                    if (status !== "empty") return;

                                    if (clickStep === 0) {
                                        setSelectedIndex(i);
                                        setTempStart(t);
                                        setSelectedTime({
                                            start: t,
                                            end: null
                                        });

                                        setClickStep(1);
                                    }
                                    else if (clickStep === 1) {
                                        const startIndex = timeSlots.indexOf(tempStart);
                                        const endIndex = timeSlots.indexOf(t);

                                        if (startIndex === endIndex) {
                                            setSelectedTime({
                                                start: null,
                                                end: null
                                            });
                                            setTempStart(null);
                                            setSelectedIndex(null);
                                            setClickStep(0);
                                            setTimeCount("");
                                            return;
                                        }

                                        for (let i = startIndex; i <= endIndex; i++) {
                                            if (getSlotStatus(i) !== "empty") {
                                                alert("Khoảng thời gian đã có lịch đặt");
                                                return;
                                            }
                                        }

                                        if (endIndex < startIndex || (endIndex - startIndex) * 30 <= 30) {
                                            alert("Giờ kết thúc phải sau giờ bắt đầu và tối thiểu 30 phút");
                                            return;
                                        }
                                        setSelectedTime({
                                            start: tempStart,
                                            end: t
                                        });
                                        setSelectedIndex(i);
                                        setClickStep(0);
                                        setTimeCount(formatMinutesToTime((endIndex - startIndex) * 30));
                                    }
                                }}
                            >
                                <span className="time-label">{t}</span>
                                <div className="status-bar"></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="white-content-area"></div>

            {/* FOOTER */}
            <div className="order-footer">
                <div className="footer-info">
                    <b className="footer-time">
                        Thời gian: {selectedTime.start || "--"} - {selectedTime.end || "--"}
                    </b>
                    <p className="footer-duration">Tổng giờ: {timeCount}</p>
                </div>

                <div className="footer-action">
                    <p className="footer-price">Tổng tiền: {paid}đ</p>
                    <button className="order-btn" onClick={handleNext}>
                        TIẾP THEO
                    </button>
                </div>
            </div>
        </div >
    );
}

export default CalendarBooking;