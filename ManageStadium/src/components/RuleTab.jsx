import React from 'react';
import '../styles/RuleTab.css'; // Import CSS để ăn style

function RuleTab() {
  return (
    <div className="rule-tab-container">
      <div className="rule-box">
        <h3 className="rule-title">Điều khoản sử dụng sân</h3>
        <ul className="rule-list">
          <li>Không mang giày đinh cao</li>
          <li>Không hút thuốc trong khu vực sân</li>
          <li>Không gây ồn sau 22h</li>
          <li>Thanh toán đầy đủ trước khi chơi</li>
          <li>Bồi thường 100% nếu làm hư hỏng mặt sân hoặc thiết bị</li>
        </ul>
      </div>
    </div>
  );
}

export default RuleTab;