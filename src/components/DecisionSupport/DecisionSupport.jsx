import React, { useContext } from "react";
import { Requirements } from "../Requirements";
import PdfViewer from "../PdfViewer";
import { findPolicyTableData, requirementsData } from "../../utils/sampleData";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { appContext } from "../../context/AppContext";

const DecisionSupport = () => {

  const { currentTabSelected } = useContext(appContext);
  
  return (
    <div>
      {
        <div className="findPolicy-second-screen">
          {/*  <div className="back-button" onClick={handleBack}>
            <FaRegArrowAltCircleLeft className="back-icon" />
            <h5>Back</h5>
          </div> */}
          <div className="data-contnr">
            <div className="prior-auth">
              <h5>Prior Auth For : </h5>
              <h5 className="data-value">{currentTabSelected.prior_auth_desc}</h5>
            </div>
            <div className="payer">
              <h5>Payer : </h5>
              <h5 className="data-value">{currentTabSelected.payer}</h5>
            </div>
          </div>
          <div className="findPolicy-card-contnr">
            <div className="pdf-contnr">
              <div className="collapse-contnr">
                <FaRegArrowAltCircleLeft className="collapse-button" />
                <h5>Collapse</h5>
              </div>
              <PdfViewer pdfurl={currentTabSelected.pdfFile} />
            </div>
            <div className="requirements-contnr">
              <Requirements requirementTable={requirementsData} />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default DecisionSupport;
