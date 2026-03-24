import React, { useState } from 'react';

import TaskBar from '../components/Taskbar';
import ProductDetailImage from '../components/ProductDetailPage';
import DetailCard from '../components/DetailCard';
import TabMenu from '../components/TabMenu';
import FieldInfoTab from '../components/FieldInfoTab';
import FieldServiceTab from '../components/FieldServiceTab';
import RuleTab from "../components/RuleTab";
import ReviewTab from "../components/ReviewTab";
import Footer from '../components/Footer';

const FieldDetail = () => {

   const [activeTab, setActiveTab] = useState('info');

   return (
      <div>

         <TaskBar />
         <ProductDetailImage />
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