import React from "react";
function ReviewCard({ avatar, name, content, date }) {
  return (
    <div style={{
      background: "#36656B", 
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "15px",
      display: "flex",
      gap: "15px"
    }}>
      {/* Avatar mặc định nếu không có */}
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#ccc", flexShrink: 0 }}></div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{name}</h4>
        <p style={{ margin: "0 0 8px 0", color: "#F0F8A4" }}>⭐⭐⭐⭐⭐</p>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", lineHeight: "1.4" }}>
          {content}
        </p>
        <div style={{ textAlign: "right", fontSize: "12px", color: "#e0e0e0" }}>
          {date}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;