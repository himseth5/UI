import React, { useState } from "react";
import "./Tabs.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

import MedicalChartReview from "../../pages/medicalChartReview";
import { FindClinicalPolicy } from "../../pages/findClinicalPolicy";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem
          title="Step1: Review Medical Chart"
          id="tab1"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Step2: Find Clinical Policy"
          id="tab2"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Step3: Decision Support"
          id="tab3"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>

      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <MedicalChartReview />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <FindClinicalPolicy />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <p> Decision Support</p>
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
