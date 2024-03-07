import "./detailsCard.css";

function DetailsCard(props) {
  const { cardHeader, cardData, type, documentStatus } = props;
  const renderComponent = (type) => {
    const pageData = cardData[0];

    switch (type) {
      case "Provider":
        return (
          <div className="text-subtitle-container">
            <p>
              <span className="data-label">Name: </span>
              {pageData.Provider_Name}
            </p>
            <p>
              <span className="data-label">Address: </span>
              {pageData.Provider_Address_line}
            </p>
            <p>
              <span className="data-label">State: </span>
              {pageData.Provider_State}
            </p>
            <p>
              <span className="data-label">Contact: </span>
              {pageData.Provider_Contact}
            </p>
          </div>
        );
      case "Patient":
        return (
          <div className="text-subtitle-container">
            <p>
              <span className="data-label">Name: </span> {pageData.Patient_Name}
            </p>
            <p>
              <span className="data-label">Address: </span>
              {pageData.Patient_Address_line}
            </p>
            <p>
              <span className="data-label">State: </span>
              {pageData.Patient_State}
            </p>

            <p>
              <span className="data-label">Gender: </span>
              {pageData.Patient_Gender}
            </p>
            <p>
              <span className="data-label">DOB: </span>
              {pageData.Patient_DoB}
            </p>
            <p>
              <span className="data-label">Contact: </span>
              {pageData.Patient_Contact}
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
            {/* <div className="data-and-label-container"> */}
            <p>
              <span className="data-label">Received: </span>
              {new Date(pageData.Document_Receive_dts).toLocaleDateString()}
            </p>

            <p>
              <span className="data-label">Last Update: </span>
              {new Date(pageData.Last_Updated_dts).toLocaleDateString()}
            </p>
          </div>
        );
      case "status":
        return (
          <div className="card-progress-status">
            <div>
              {documentStatus === ""
                ? pageData.Document_Review_Status
                : documentStatus}
            </div>
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
      {type !== "status" ? <div className="card-line"></div> : null}
    </div>
  );
}

export default DetailsCard;
