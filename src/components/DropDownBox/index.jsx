import Select from "react-select";
import "./dropDownBox.css";
import { useState } from "react";
import { useEffect } from "react";

//import Multiselect from "multiselect-react-dropdown";

function DropDownBox(props) {
  const { label, cssName, dropDownBoxData, onSelect, type, selectedValue } =
    props;
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  });
  const options = dropDownBoxData.map((item, index) => {
    return {
      label: item[index],
      value: item[index],
    };
  });

  const handleChange = (selectedOption) => {
    setSelectedOption({
      label: selectedOption.label,
      value: selectedOption.value,
    });
    onSelect(selectedOption.label);
  };

  useEffect(() => {
    if (type === "notes") {
      setSelectedOption({
        label: selectedValue.Concept_Review_Status,
        value: selectedValue.Concept_Review_Status,
      });
    }
  }, [selectedValue?.Concept_Review_Status]);

  const renderComponent = (type) => {
    switch (type) {
      case "concept":
        return (
          <label>
            {label}
            <select className="select-options" onChange={handleSelectionChange}>
              <option value="">Select Concept</option>
              {dropDownBoxData?.map((item, index) => (
                <option key={`select${index}`} value={item.CDS_Identifier}>
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
            <select
              className="select-options-status"
              onChange={handleSelectionChange}
              multiple
            >
              {dropDownBoxData?.map((item, index) => (
                <option key={`select${index}`} value={item[index]}>
                  {item[index]}
                </option>
              ))}
            </select>
          </label>
        );
      case "notes":
        return (
          /*  <label>
              {label}
              <select
                className="select-options-status"
                onChange={handleSelectionChange}
                multiple
              >
                {dropDownBoxData?.map((item, index) => (
                  <option key={`select${index}`} value={item[index]}>
                    {item[index]}
                  </option>
                ))}
              </select>
            </label> */
          <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder="Select Review Status"
            /*  isDisabled={selectedOption === null} */
          />
        );
      default:
        return (
          <label>
            {label}
            <select
              className="select-options-normal"
              onChange={handleSelectionChange}
            >
              {dropDownBoxData?.map((item, index) => (
                <option key={`select${index}`} value={item[index]}>
                  {item[index]}
                </option>
              ))}
            </select>
          </label>
        );
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
