import "./filterButton.css";

import { useEffect, useState } from "react";

function FilterButton(props) {
  const [clicked, setClicked] = useState(true);
  const { label, setLabel,cleared,setCleared } = props;
    

  const handleClick = () => {
    if(cleared){
      setClicked(false);
      setCleared(false);
    }
    
    setClicked(!clicked);


    if (!clicked) {
      setLabel(label.toLowerCase());
    } else {
      setLabel("");
    }
  };

  return (
    <button
      className={!clicked || cleared?"filter-button" : "filter-button-clicked"} 
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default FilterButton;
