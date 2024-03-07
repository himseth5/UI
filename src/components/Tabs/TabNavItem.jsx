import React from "react";
const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
    <div className="tab-title">
     <div>{ title.split(":")[0] }:</div>
     
     <div>{ title.split(":")[1] }</div>
     </div>
   </li>
 );
};
export default TabNavItem;