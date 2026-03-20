import { useState } from "react"
import Taskbar from "../components/Taskbar"
import HistoryCard from "../components/HistoryCard"
import BookingDetailModal from "../components/BookingDetailModal"

function HistoryPage() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div>

      <Taskbar />

      <div className="container">

        <h2>Lịch sử đặt sân</h2>

        <HistoryCard openDetail={() => setOpenModal(true)} />
        <HistoryCard openDetail={() => setOpenModal(true)} />
        <HistoryCard openDetail={() => setOpenModal(true)} />

      </div>

      {openModal && (
        <BookingDetailModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  )
}

export default HistoryPage