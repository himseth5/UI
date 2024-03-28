import React, { useContext, useEffect, useState } from "react";
import "./Tabs.css";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";

import MedicalChartReview from "../../pages/medicalChartReview";
import { FindClinicalPolicy } from "../../pages/findClinicalPolicy";
import { appContext } from "../../context/AppContext";
import DecisionSupport from "../DecisionSupport/DecisionSupport";

const Tabs = () => {
  const { Tab_Status, currentTabSelected } = useContext(appContext);
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    if (
      (activeTab === "tab1" || activeTab === "tab2") &&
      !currentTabSelected.itemselected
    ) {
      //  dispatch({ type: "SET_DECISION_SUPPORT_TAB", payload: false })
    } else {
      setActiveTab("tab3");
    }
  }, [currentTabSelected]);

 

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
         
          disabled={!Tab_Status}
          className={!Tab_Status ? "disabled" : ""}
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
          <DecisionSupport />
        </TabContent>
      </div>
    </div>
  );
};

export default Tabs;
