import React, { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appContext } from "../../context/AppContext";

 function Toast() {
  const { toastMessage, messageType } = useContext(appContext);
  useEffect(() => {
    notify(messageType);
  }, [messageType, toastMessage]);

  console.log(messageType,'messageType')
  const notify = (type) => {
    switch (type) {
      case "Success":
        toast.success(toastMessage, {
          position: "top-right",
        });
        break;
      case "failure":
        toast.error(toastMessage, {
          position: "top-left",
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default React.memo(Toast)