import React from 'react';
import '../styles/FieldServiceTab.css';

const FieldServiceTab = ({ pricing, services }) => {
  // pricing là array, lấy giá từ item đầu tiên hoặc tất cả
  const pricingList = Array.isArray(pricing) ? pricing : (pricing ? [pricing] : []);

  return (
    <div className="service-tab-container">
      <h3 className="service-title">Bảng giá sân</h3>
      <div className="table-scroll-wrapper">
        <table className="custom-table time-table">
          <thead>
            <tr>
              <th>Khung giờ</th>
              <th>Giá tiền</th>
              <th>Áp dụng</th>
            </tr>
          </thead>
          <tbody>
            {pricingList.length > 0 ? (
              pricingList.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.startTime}h - {item.endTime}h
                  </td>
                  <td className="price-cell">
                    {item.price?.toLocaleString('vi-VN')}đ
                  </td>
                  <td>{(item.days || []).join(', ') || 'Cả tuần'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: '#36656B' }}>
                  Chưa có giá tiền.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="service-title" style={{ marginTop: '40px' }}>Danh sách dịch vụ</h3>
      <div className="table-scroll-wrapper">
        <table className="custom-table service-table">
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Giá tiền</th>
            </tr>
          </thead>
          <tbody>
            {services?.length > 0 ? (
              services.map((service) => (
                <tr key={service._id || service.service_id}>
                  <td>{service.name}</td>
                  <td className="price-cell">{service.price?.toLocaleString('vi-VN')}đ</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', color: '#36656B' }}>
                  Chưa có dịch vụ nào được cập nhật.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldServiceTab;