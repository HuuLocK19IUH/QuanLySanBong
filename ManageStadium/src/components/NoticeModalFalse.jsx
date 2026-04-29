import "../styles/Payment.css"

function NoticeModalFalse({ handleCloseModal, text }) {
    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Dấu "×" trên cùng bên trái để tắt */}
                <button className="close-x" onClick={handleCloseModal}>×</button>

                {/* Biểu tượng tích xanh giống Figma */}
                <div className="checkmark-container">
                    <span className="checkmark-icon">X</span>
                </div>

                {/* Văn bản thông báo chính xác như Figma */}
                <p className="success-text">{text}</p>
            </div>
        </div>
    )
}

export default NoticeModalFalse;