import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Booking() {

  const navigate = useNavigate()

  const [step, setStep] = useState(1)

  const [selectedTime, setSelectedTime] = useState({
    start: "17:00",
    end: "18:30"
  })

  const [services, setServices] = useState([
    { name: "Cầu lông", price: 200000, qty: 1 },
    { name: "Suối danasi nhỏ", price: 10000, qty: 3 }
  ])

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [note,setNote] = useState("")

  const totalService = services.reduce((t,s)=>t+s.price*s.qty,0)
  const totalOrder = totalService + 60000

  const timeSlots = [
    "5:00","5:30","6:00","6:30","7:00","7:30",
    "8:00","8:30","9:00","9:30","10:00","10:30",
    "11:00","11:30","12:00","12:30","13:00",
    "13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30","18:00",
    "18:30","19:00","19:30","20:00","20:30","21:00"
  ]

  return (
    <div className="booking-page">

      <div className="booking-header">
        <h1>Đặt lịch ngày trực quan</h1>
        <button className="calendar-btn">06/03/2026</button>
      </div>

      {step === 1 && (

        <>
          <div className="time-axis">

            {timeSlots.map((t,i)=>(
              <div
                key={i}
                className="time-slot"
                onClick={()=>setSelectedTime({start:t,end:timeSlots[i+3]})}
              >
                {t}
              </div>
            ))}

          </div>

          <div className="order-footer">

            <div>
              <b>Thời gian: {selectedTime.start} - {selectedTime.end}</b>
              <p>Tổng giờ: 1h30</p>
            </div>

            <div>
              <p className="price">Tổng tiền: 160.000đ</p>

              <button
                className="order-btn"
                onClick={()=>setStep(2)}
              >
                TIẾP THEO
              </button>
            </div>

          </div>
        </>
      )}

      {step === 2 && (

        <div className="booking-info">

          <div className="card">

            <h3>Thông tin lịch đặt</h3>

            <p>Ngày: 06/03/2026</p>

            <p>Sân cầu lông 4 người: {selectedTime.start} - {selectedTime.end}</p>

            <p>Tổng giờ: 1h30</p>

            <p>Tổng tiền: 160.000đ</p>

          </div>

          <div className="card">

            <h3>Thông tin dịch vụ</h3>

            {services.map((s,i)=>(
              <div key={i} className="service-row">

                <span>x{s.qty}</span>

                <span>{s.name}</span>

                <span>{s.price.toLocaleString()}đ</span>

                <button
                  onClick={()=>{
                    const newS = [...services]
                    newS.splice(i,1)
                    setServices(newS)
                  }}
                >
                  🗑
                </button>

              </div>
            ))}

            <p className="total">Tổng tiền: {totalService.toLocaleString()}đ</p>

          </div>

          <input
            placeholder="Tên người đặt sân"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            placeholder="SĐT"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          <textarea
            placeholder="Ghi chú"
            value={note}
            onChange={(e)=>setNote(e.target.value)}
          />

          <button
            className="order-btn"
            onClick={()=>navigate("/payment",{
              state:{selectedTime,services,name,phone,note,totalOrder}
            })}
          >
            XÁC NHẬN & THANH TOÁN
          </button>

        </div>

      )}

    </div>
  )
}