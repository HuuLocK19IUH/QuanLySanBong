import React from 'react';
import '../styles/FieldServiceTab.css';

const FieldServiceTab = () => {
  return (
    <div className="service-tab-container">
      {/* --- PHẦN 1: BẢNG GIÁ SÂN --- */}
      <h3 className="service-title">Bảng giá sân</h3>
      <table className="custom-table time-table">
        <thead>
          <tr>
            <th>Thứ</th>
            <th>Khung giờ</th>
            <th>Giá tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3" className="bold-cell">T2 – T6</td>
            <td>5h – 15h</td>
            <td className="price-cell">40.000đ</td>
          </tr>
          <tr>
            <td>15h – 18h</td>
            <td className="price-cell">100.000đ</td>
          </tr>
          <tr>
            <td>18h – 23h</td>
            <td className="price-cell">120.000đ</td>
          </tr>
          <tr>
            <td className="bold-cell">T7</td>
            <td>5h – 23h</td>
            <td className="price-cell">130.000đ</td>
          </tr>
          <tr>
            <td className="bold-cell">CN</td>
            <td>5h – 23h</td>
            <td className="price-cell">140.000đ</td>
          </tr>
        </tbody>
      </table>

      {/* --- PHẦN 2: DANH SÁCH DỊCH VỤ --- */}
      <h3 className="service-title" style={{ marginTop: '40px' }}>Danh sách dịch vụ</h3>
      
      {/* BỌC BẢNG NÀY VÀO DIV SCROLL */}
      <div className="table-scroll-wrapper">
        <table className="custom-table service-table">
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Giá tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Cầu trái</td><td className="price-cell">20.000đ</td></tr>
            <tr><td>Cầu ống</td><td className="price-cell">200.000đ</td></tr>
            <tr><td>Suối danasi nhỏ</td><td className="price-cell">10.000đ</td></tr>
            <tr><td>Suối danasi lớn</td><td className="price-cell">17.000đ</td></tr>
            <tr><td>Sting</td><td className="price-cell">12.000đ</td></tr>
            <tr><td>Vớ ngắn</td><td className="price-cell">20.000đ</td></tr>
            <tr><td>Vớ dài</td><td className="price-cell">30.000đ</td></tr>
            <tr><td>Vớ chống trượt</td><td className="price-cell">35.000đ</td></tr>
            {/* Bạn có thể copy paste thêm nhiều <tr> ở đây để test thanh cuộn nhé */}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default FieldServiceTab;