import { useEffect } from "react";
import "./requirements.css";

import { useState } from "react";

function Requirements(props) {
  const { requirementTable } = props;
  const [requirementBooleanValue, setRequirementBooleanValue] = useState([]);
  const [clicked, setClicked] = useState([]);

  useEffect(
    () =>
      setRequirementBooleanValue(
        requirementTable.map((item) => item.requirementStatus)
      ),
    []
  );

  const handleRequirementBoolean = (requirementBoolean, index) => {
    if (requirementBoolean === "True") {
      setRequirementBooleanValue((prev) => {
        let requirementBooleanValueCopy = [...prev];
        requirementBooleanValueCopy[index] = "False";
        return requirementBooleanValueCopy;
      });
    } else if (requirementBoolean === "False") {
      setRequirementBooleanValue((prev) => {
        let requirementBooleanValueCopy = [...prev];
        requirementBooleanValueCopy[index] = "True";
        return requirementBooleanValueCopy;
      });
    }
  };

  return (
    <div className="requirements-main-container">
      <h4 className="req-head">Extracted Features from MPB</h4>
      <table className="req-table">
        {requirementTable.map((item, index) => {
          return (
            <tr className="req-row" key={index}>
              <td className="req-data" id="requirement-name">
                {item.requirementName}
              </td>
              <td
                className="req-data"
                id={requirementBooleanValue[index]}
                onClick={() =>
                  handleRequirementBoolean(
                    requirementBooleanValue[index],
                    index
                  )
                }
              >
                {requirementBooleanValue[index]}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export { Requirements };
