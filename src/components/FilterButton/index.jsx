import "./filterButton.css";

import { useState } from "react";

function FilterButton(props) {
  const [clicked, setClicked] = useState(true);
  const { label, setLabel } = props;

  const handleClick = () => {
    setClicked(!clicked);

    if (!clicked) {
      setLabel(label.toLowerCase());
    } else {
      setLabel("");
    }
  };

  return (
    <button
      className={clicked ? "filter-button-clicked" : "filter-button"}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default FilterButton;
