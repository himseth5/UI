import { appContext } from "../../context/AppContext";
import UserFeedback from "../UserFeedback/userFeedback";
import "./accordion.css";
import { useContext, useState } from "react";

function Accordion(props) {
  const { updateDocumentFeedback } = useContext(appContext);
  const [isExpandable, setIsExpandable] = useState(false);
  const { accordionTitle, accordionContent } = props;

  const handleOnClick = () => {
    setIsExpandable(!isExpandable);
  };

  const updateFeedback = (value, identifier) => {
    updateDocumentFeedback(value, identifier);
  };
  return (
    <div className="accordion-container">
      <div className="accordion-title-container" onClick={handleOnClick}>
        <p className="accordion-title">{accordionTitle}</p>
        <div className="accordion-collapse">{isExpandable ? "-" : "+"}</div>
      </div>
      {isExpandable && accordionContent && (
        <div className="accordion-content-container">
          <p className="accordion-content">
            {accordionContent.All_Evidence_Summary}
          </p>
          <div className="document-feedback-container">
            <UserFeedback
              feedback={accordionContent}
              updateUserFeedback={updateFeedback}
              type={"CDS"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Accordion;
