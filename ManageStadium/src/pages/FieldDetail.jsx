import React, { useState } from 'react';

import TaskBar from '../components/Taskbar';
import ProductDetailImage from '../components/ProductDetailPage';
import DetailCard from '../components/DetailCard';
import TabMenu from '../components/TabMenu';
import FieldInfoTab from '../components/FieldInfoTab';
import FieldServiceTab from '../components/FieldServiceTab';
import Footer from '../components/Footer';

const FieldDetail = () => {
  const [activeTab, setActiveTab] = useState('info'); // 'info' là tab mặc định

  return (
    <div>
       <TaskBar />
       <ProductDetailImage />
       <DetailCard />
       <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
       
       {/* Render nội dung bên dưới dựa trên tab đang chọn */}
       <div className="tab-content">
          {activeTab === 'info' && <FieldInfoTab />}
          {activeTab === 'service' && <FieldServiceTab />}
       </div>
       <Footer />
    </div>
  )
}
export default FieldDetail;