import React, { useEffect, useState } from 'react';
import HomePageTaskbar from '../components/HomePageTaskbar';
import ProductDetailImage from '../components/ProductDetailPage';
import DetailCard from '../components/DetailCard';
import TabMenu from '../components/TabMenu';
import FieldInfoTab from '../components/FieldInfoTab';
import FieldServiceTab from '../components/FieldServiceTab';
import RuleTab from "../components/RuleTab";
import ReviewTab from "../components/ReviewTab";
import Footer from '../components/Footer';
import Filter from '../components/Filter'; // Import thêm Filter
import { useUser } from "../hooks/context/UserContext";
const FieldDetail = () => {
   const [activeTab, setActiveTab] = useState('info');
   // Thêm state để quản lý việc ẩn/hiện bảng filter
   const [showFilter, setShowFilter] = useState(false);

   const { user } = useUser();


   return (
      <div>
         {/* Gom TaskBar, ProductDetailImage và Filter vào một div có position relative */}
         <div style={{ position: 'relative' }}>
            {/* Truyền hàm đổi state vào prop toggleFilter */}

            <HomePageTaskbar
               className="homepage-taskbar"
               toggleFilter={() => setShowFilter(!showFilter)}
               user={user}
            />

            <ProductDetailImage />

            {/* Hiển thị đè Filter lên trên Carousel/Image nếu showFilter = true */}
            {showFilter && (
               <div style={{
                  position: 'absolute',
                  top: '106px', /* Nằm ngay dưới Taskbar (vì height của Taskbar.css là 106px) */
                  left: 0,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center', /* Căn giữa bảng filter */
                  zIndex: 999 /* Z-index cao để đè lên mọi thứ bên dưới */
               }}>
                  <Filter />
               </div>
            )}
         </div>

         <DetailCard />

         <TabMenu
            activeTab={activeTab}
            setActiveTab={setActiveTab}
         />

         <div className="tab-content">
            {activeTab === 'info' && <FieldInfoTab />}
            {activeTab === 'service' && <FieldServiceTab />}
            {activeTab === 'rules' && <RuleTab />}
            {activeTab === 'reviews' && <ReviewTab />}
         </div>

         <Footer />
      </div>
   )
}

export default FieldDetail;