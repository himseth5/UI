import "./detailsCard.css";

function DetailsCard(props) {
  const { cardHeader, cardData, type } = props;
  const renderComponent = (type) => {
    const pageData = cardData[0];
    console.log(pageData);
    switch (type) {
      case "Provider":
        return (
          <div className="text-subtitle-container">
            <p>
              <span>Provider Address: </span>
              {pageData.Provider_Address_line}
            </p>
            <p>
              <span>Provider Contact: </span>
              {pageData.Provider_Contact}
            </p>
            <p>
              <span>Provider Name: </span>
              {pageData.Provider_Name}
            </p>
            <p>
              <span>Provider State: </span>
              {pageData.Provider_State}
            </p>
          </div>
        );
      case "Patient":
        return (
          <div className="text-subtitle-container">
            <p>
              <span>Patient Address: </span>
              {pageData.Patient_Address_line}
            </p>
            <p>
              <span>Patient Contact: </span>
              {pageData.Patient_Contact}
            </p>
            <p>
              <span>Patient Name: </span>
              {pageData.Patient_Name}
            </p>
            <p>
              <span>Patient Gender: </span>
              {pageData.Patient_Gender}
            </p>
            <p>
              <span>Patient DOB: </span>
              {pageData.Patient_DoB}
            </p>
            <p>
              <span>Provider State: </span>
              {pageData.Patient_State}
            </p>
          </div>
        );
      case "Auth":
        return (
          <div className="text-subtitle-container">
            <div>{pageData.Prior_Auth_Description}</div>
          </div>
        );
      case "document":
        return (
          <div className="text-subtitle-container">
            <p>
              <span>Received: </span>
              {pageData.Document_Receive_dts}
            </p>
            <p>
              <span>Last Update: </span>
              {pageData.Last_Updated_dts}
            </p>
          </div>
        );
      case "status":
        return (
          <div className="card-progress-status">
            <div>{pageData.Document_Review_Status}</div>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div className="card">
      <div className="card-sub-container">
        <div className="card-header">
          <h4>{cardHeader}</h4>
        </div>
        {cardData.length > 0 ? renderComponent(type) : <div>No data Found</div>}
      </div>
      {type !== "status"  ? <div className="card-line"></div> : null}
     
    </div>
  );
}

export default DetailsCard;
