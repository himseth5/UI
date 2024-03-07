import React, { useContext, useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import "./userFeedback.css";
import { appContext } from "../../context/AppContext";
import { Tooltip } from "@mui/material";

function UserFeedback(props) {
  //const { userCredentials } = useContext(appContext);
  const [acceptClick, setAcceptClick] = useState(false);
  const [rejectClick, setRejectClick] = useState(false);
  const { feedback, updateUserFeedback, type } = props;
  const postObject = feedback;
  const keyName = 'userCredentials';
  const value = window.localStorage.getItem(keyName);
  const userCredentials = JSON.parse(value);
  useEffect(() => {
    
    switch (type) {
      case "CDS":
        if (feedback.All_Evidence_Feedback === "0") {
          setRejectClick(true);
        } else if (feedback.All_Evidence_Feedback === "1") {
          setAcceptClick(true);
        } else {
          setRejectClick(false);
          setAcceptClick(false);
        }
        break;
      case "CES":
        if (feedback.User_Feedback === "0") {
          setRejectClick(true);
        } else if (feedback.User_Feedback === "1") {
          setAcceptClick(true);
        } else {
          setRejectClick(false);
          setAcceptClick(false);
        }
        break;

      default:
        break;
    }
    /*  if (feedback.User_Feedback === "0") {
      setRejectClick(true);
    } else if (feedback.User_Feedback === "1") {
      setAcceptClick(true);
    } else {
      setRejectClick(false);
      setAcceptClick(false);
    } */
  }, []);

  const buildObjectCES = (userInput) => {
    return {
      ...postObject,
      User_Name: userCredentials.email.split("@")[0],
      User_Feedback: userInput,
    };
  };

  const buildObjectCDS = (userInput) => {
    console.log(userCredentials,'userCredentials')
    return {
      ...postObject,
      User_Name: userCredentials.email.split("@")[0],
      All_Evidence_Feedback: userInput,
    };
  };
  const toggleReject = () => {
    setRejectClick(!rejectClick);
    setAcceptClick(rejectClick);
    const userResponse = !rejectClick ? 0 : 1;
    let updateValue;
    if (type === "CDS") {
      updateValue = buildObjectCDS(userResponse);
      updateUserFeedback(updateValue, feedback.CDS_Identifier);
    } else {
      updateValue = buildObjectCES(userResponse);
      updateUserFeedback(updateValue, feedback.CES_Identifier);
    }
  };

  const toggleAccept = () => {
    setAcceptClick(!acceptClick);
    setRejectClick(acceptClick);
    const userResponse = !acceptClick ? 1 : 0;

    let updateValue;
    if (type === "CDS") {
      updateValue = buildObjectCDS(userResponse);
      updateUserFeedback(updateValue, feedback.CDS_Identifier);
    } else {
      updateValue = buildObjectCES(userResponse);
      updateUserFeedback(updateValue, feedback.CES_Identifier);
    }
  };
  return (
    <div className="feedback-container">
      <Tooltip title="Accept Evidence" placement="top-start">
        <span
          className={acceptClick ? "check" : "check-disable"}
          onClick={toggleAccept}
        >
          <FaCheck />
        </span>
      </Tooltip>
      <Tooltip title="Reject Evidence" placement="top-start">
        <span
          className={rejectClick ? "cross" : "cross-disable"}
          onClick={toggleReject}
        >
          <FaTimes />
        </span>
      </Tooltip>
    </div>
  );
}

export default React.memo(UserFeedback);
