import React from 'react';
import '../styles/TabMenu.css'; // Import file CSS tương ứng

const TabMenu = ({ activeTab, setActiveTab }) => {
  // Tạo một mảng chứa dữ liệu các tab để code ngắn gọn và dễ thêm bớt sau này
  const tabs = [
    { id: 'info', label: 'Thông tin & hình ảnh' },
    { id: 'service', label: 'Dịch vụ' },
    { id: 'rules', label: 'Điều khoản & quy định' },
    { id: 'reviews', label: 'Đánh giá' }
  ];

  return (
    <div className="tab-menu-container">
      <ul className="tab-menu-list">
        {tabs.map((tab) => (
          <li 
            key={tab.id}
            // Nếu id của tab trùng với activeTab hiện tại thì thêm class 'active'
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabMenu;