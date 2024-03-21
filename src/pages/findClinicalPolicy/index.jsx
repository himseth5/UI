import "./findClinicalPolicy.css";

import { useContext, useState } from "react";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

import PdfViewer from "../../components/PdfViewer";
import { Requirements } from "../../components/Requirements";
import { findPolicyTableData, requirementsData } from "../../utils/sampleData";
import { appContext } from "../../context/AppContext";
import EvidenceCopy from "../../components/EvidenceCopy";

function FindClinicalPolicy() {
  const [pdfFile, setPdfFile] = useState();
  const [selected, setSelected] = useState();
  const [pdfContrCollapse, setPdfContnrCollapse] = useState(false);
  const [requirementsContrCollapse, setRequirementsContnrCollapse] =
    useState(false);
  const [evidenceContrCollapse, setEvidenceContnrCollapse] = useState(false);

  const { evidenceResult, getAllConceptEvidence } = useContext(appContext);

  function handleSelect(pdf_file) {
    setPdfFile(pdf_file);
    setSelected(true);
    getAllConceptEvidence("6d4fe8f3b75b4f72b5006c739057fca4");
  }

  function handleBack() {
    setSelected(false);
  }

  const handleCollapse = (container) => {
    if (container === "pdfContnr") {
      setPdfContnrCollapse(!pdfContrCollapse);
    } else if (container === "requirementsContnr") {
      setRequirementsContnrCollapse(!requirementsContrCollapse);
    } else if (container === "evidenceContnr") {
      setEvidenceContnrCollapse(!evidenceContrCollapse);
    }
  };

  const handleExpand = (container) => {
    if (container === "pdfContnr") {
      setPdfContnrCollapse(!pdfContrCollapse);
    } else if (container === "requirementsContnr") {
      setRequirementsContnrCollapse(!requirementsContrCollapse);
    } else if (container === "evidenceContnr") {
      setEvidenceContnrCollapse(!evidenceContrCollapse);
    }
  };

  return (
    <div className="findPolicy-main-contnr">
      {!selected && (
        <div className="findPolicy-first -screen">
          <div className="prior-auth">
            <h5>Prior Auth For : </h5>
            <h5 className="data-value">Actemera - 12ml</h5>
          </div>
          <div className="findPolicy-table-container">
            <table className="findPolicy-table">
              <tr className="findPolicy-row">
                <th className="findPolicy-head">Payer</th>
                <th className="findPolicy-head">Medical Policy Name</th>
                <th></th>
              </tr>
              {findPolicyTableData.map((item, index) => {
                return (
                  <tr className="findPolicy-row" key={index}>
                    <td className="findPolicy-data">{item.status}</td>
                    <td className="findPolicy-data">
                      {item.conference_number}
                    </td>

                    <td
                      className="select-button"
                      onClick={() => handleSelect(item.pdf_file)}
                    >
                      <p className="select-btn-txt">Select</p>
                      <MdKeyboardArrowRight className="select-btn-icon" />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
      {selected && (
        <div className="findPolicy-second-screen">
          <div className="back-button" onClick={handleBack}>
            <FaRegArrowAltCircleLeft className="back-icon" />
            <h5>Back</h5>
          </div>
          
          <div className="data-contnr">
            <div className="prior-auth">
              <h5>Prior Auth For : </h5>
              <h5 className="data-value">Actemera - 12ml</h5>
            </div>
            <div className="payer">
              <h5>Payer : </h5>
              <h5 className="data-value">Aetna</h5>
            </div>
          </div>
          <div className="findPolicy-card-contnr">
            {pdfContrCollapse && (
              <FaRegArrowAltCircleRight
                onClick={() => handleExpand("pdfContnr")}
              />
            )}
            {!pdfContrCollapse && (
              <div className="pdf-contnr">
                <div
                  className="collapse-contnr"
                  onClick={() => handleCollapse("pdfContnr")}
                >
                  <FaRegArrowAltCircleLeft className="collapse-button" />
                  <h5>Collapse</h5>
                </div>
                <PdfViewer pdfurl={pdfFile} />
              </div>
            )}
            {requirementsContrCollapse && (
              <FaRegArrowAltCircleRight
                onClick={() => handleExpand("requirementsContnr")}
              />
            )}
            {!requirementsContrCollapse && (
              <div className="requirements-contnr">
                <div
                  className="collapse-contnr"
                  onClick={() => handleCollapse("requirementsContnr")}
                >
                  <FaRegArrowAltCircleLeft className="collapse-button" />
                  <h5>Collapse</h5>
                </div>
                <Requirements requirementTable={requirementsData} />
              </div>
            )}
            {evidenceContrCollapse && (
              <FaRegArrowAltCircleRight
                onClick={() => handleExpand("evidenceContnr")}
              />
            )}
            {!evidenceContrCollapse && (
              <div className="evidence-contnr">
                <div
                  className="collapse-contnr"
                  onClick={() => handleCollapse("evidenceContnr")}
                >
                  <FaRegArrowAltCircleLeft className="collapse-button" />

                  <h5>Collapse</h5>
                </div>
                <EvidenceCopy data={evidenceResult} className="evidence-list" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { FindClinicalPolicy };
