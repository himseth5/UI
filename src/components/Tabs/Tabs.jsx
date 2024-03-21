import React, { useState } from "react";
import "./Tabs.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

import MedicalChartReview from "../../pages/medicalChartReview";
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Review Medical Chart" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Find Clinical Policy" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Decision Support" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
         <MedicalChartReview />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <p>Find Clinical Policy!</p>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <p> Decision Support</p>
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;