import "./dropDownBox.css";
function DropDownBox(props) {
  const { label, cssName, dropDownBoxData, onSelect, type } = props;
  const renderComponent = (type) => {
    switch (type) {
      case "concept":
        return (
          <label>
            {label}
            <select className="select-options" onChange={handleSelectionChange}>
              {dropDownBoxData?.map((item, index) => ( 
                <option key={`select${index}`} value={item.Concept_Name}>
                  {item.Concept_Name}
                </option>
              ))}
            </select>
          </label>
        );
        
      case "status":
        return (
          <label>
            {label}
            <select className="select-options-status" onChange={handleSelectionChange}>
              {dropDownBoxData?.map((item, index) => (
                <option key={`select${index}`} value={item[index]}>
                  {item[index]}
                </option>
              ))}
            </select>
          </label>
        );
        
      default:
        break;
    }
  };
  const handleSelectionChange = (e) => {
    const value = e.target.value;
    onSelect(value);
  };

  return <div className={cssName}>{renderComponent(type)} </div>;
}

export default DropDownBox;
