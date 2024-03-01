import { useContext, useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import "./userFeedback.css";
import { appContext } from "../../context/AppContext";

function UserFeedback(props) {
  const { updateUserFeedback, userName } = useContext(appContext);
  const [acceptClick, setAcceptClick] = useState(false);
  const [rejectClick, setRejectClick] = useState(false);
  const { feedback } = props;
  const postObject = feedback;

  useEffect(() => {
    if (feedback.User_Feedback === "0") {
      setRejectClick(true);
    } else if (feedback.User_Feedback === "1") {
      setAcceptClick(true);
    } else {
      setRejectClick(false);
      setAcceptClick(false);
    }
  }, []);

  const buildObject = (userInput) => {
    return {
      ...postObject,
      User_Name: userName,
      User_Feedback: userInput,
    };
  };
  const toggleReject = () => {
    setRejectClick(!rejectClick);
    setAcceptClick(rejectClick);
    const userResponse = !rejectClick ? 0 : 1;
    const updateValue = buildObject(userResponse);
    updateUserFeedback(updateValue, feedback.CES_Identifier)
    console.log(updateValue);
  };

  const toggleAccept = () => {
    setAcceptClick(!acceptClick);
    setRejectClick(acceptClick);
    const userResponse = !acceptClick ? 1 : 0;
    const updateValue = buildObject(userResponse);
    updateUserFeedback(updateValue, feedback.CES_Identifier)
    console.log(updateValue);
  };
  return (
    <div className="feedback-container">
      <span
        className={acceptClick ? "check" : "check-disabled"}
        onClick={toggleAccept}
      >
        <FaCheck />
      </span>
      <span
        className={rejectClick ? "cross" : "cross-disabled"}
        onClick={toggleReject}
      >
        <FaTimes />
      </span>
    </div>
  );
}

export default UserFeedback;
