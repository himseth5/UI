import "./evidenceFeedback.css";

function EvidenceFeedback(props) {
  const { closeModalFunc } = props;
  function handleCancel() {
    closeModalFunc();
  }

  return (
    <div className="evidence-status-modal">

      <div className="evidence-status-data-container">
        <div className="summary-contnr">
          <h5 className="evidenece-status-label">Summary</h5>
          <p className="summary">
            This is the list of all ICD Codes present in patient's Medical
            History
          </p>
        </div>
        <div className="description-contnr">
          <h5 className="evidenece-status-label">Description</h5>
          <p className="description">
            Patient has been previously treated with a targeted immunomodulator
            FDAapproved for the treatment of rheumatoid arthritis .
            
          </p>
        </div>
        <div className="notes-contnr">
          <h5 className="evidenece-status-label">User-Notes</h5>
          <textarea className="user-notes" placeholder="Please enter your feedback"></textarea>
        </div>

        <div className="feedback-action-btn-contnr">
          <button
            className="feedback-action-btn"
            id="approve"
            onClick={handleCancel}
          >
            Approve
          </button>
          <button
            className="feedback-action-btn"
            id="reject"
            onClick={handleCancel}
          >
            Reject
          </button>
          <button
            className="feedback-action-btn"
            id="partial"
            onClick={handleCancel}
          >
            Partial
          </button>
        </div>
      </div>
    </div>
  );
}

export default EvidenceFeedback;
