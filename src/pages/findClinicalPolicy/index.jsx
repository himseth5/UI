import "./findClinicalPolicy.css";

import { useContext, useEffect, useState } from "react";

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
import DecisionSupport from "../../components/DecisionSupport/DecisionSupport";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

function FindClinicalPolicy() {
  const [pdfFile, setPdfFile] = useState();
  const [selected, setSelected] = useState(false);
  const [payer, setPayer] = useState("");
  const { prior_auth_desc } = useContext(appContext);

  const { dispatch, getAllConceptEvidence, Tab_Status } =
    useContext(appContext);

  function handleSelect(item) {
    setPdfFile(item.pdf_file);
    setPayer(item.payer);
    setSelected(true);
    // getAllConceptEvidence("6d4fe8f3b75b4f72b5006c739057fca4");
    dispatch({
      type: "SET_DECISION_SUPPORT_TAB",
      payload: {
        itemselected: true,
        payer: item.payer,
        prior_auth_desc: prior_auth_desc,
        pdfFile: item.pdf_file,
      },
    });
    //console.log(findPolicyTableData,"Find table")
  }

  function handleBack() {
    setSelected(false);
  }

  // const handleCollapse = (container) => {
  //   if (container === "pdfContnr") {
  //     setPdfContnrCollapse(!pdfContrCollapse);
  //   } else if (container === "requirementsContnr") {
  //     setRequirementsContnrCollapse(!requirementsContrCollapse);
  //   } else if (container === "evidenceContnr") {
  //     setEvidenceContnrCollapse(!evidenceContrCollapse);
  //   }
  // };

  // const handleExpand = (container) => {
  //   if (container === "pdfContnr") {
  //     setPdfContnrCollapse(!pdfContrCollapse);
  //   } else if (container === "requirementsContnr") {
  //     setRequirementsContnrCollapse(!requirementsContrCollapse);
  //   } else if (container === "evidenceContnr") {
  //     setEvidenceContnrCollapse(!evidenceContrCollapse);
  //   }
  // };

  // function handleResize() {
  //   console.log("handleresize called");
  //   const pdfContnr = document.querySelector(".pdf-contnr");
  //   const requirementsContnr = document.querySelector(".requirements-contnr");
  //   const evidenceContnr = document.querySelector(".evidence-contnr");
  //   console.log("pdfcontnrcollapse", pdfContrCollapse);
  //   if (
  //     pdfContrCollapse &&
  //     requirementsContrCollapse 
      
  //   ) {
  //     return;
  //   } else if (pdfContrCollapse && requirementsContrCollapse) {
  //     // evidenceContnr.style.width = "100%";
  //   } else if (pdfContrCollapse && evidenceContrCollapse) {
  //     requirementsContnr.style.width = "100%";
  //   } else if (evidenceContrCollapse && requirementsContrCollapse) {
  //     pdfContnr.style.width = "100%";
  //   } else if (pdfContrCollapse) {
  //     requirementsContnr.style.width = "50%";
  //     // evidenceContnr.style.width = "50%";
  //   } else if (requirementsContrCollapse) {
  //     pdfContnr.style.width = "50%";
  //     // evidenceContnr.style.width = "50%";
  //   // } else if (evidenceContrCollapse) {
  //   //   requirementsContnr.style.width = "50%";
  //   //   pdfContnr.style.width = "50%";
  //   // }
  //    else {
  //     if (pdfContnr && requirementsContnr) {
  //       pdfContnr.style.width = "40%";
  //       requirementsContnr.style.width = "30%";
  //       // evidenceContnr.style.width = "30%";
  //     }
  //   }
  // }

  return (
    <div className="findPolicy-main-contnr">
      {!selected && (
        <div className="findPolicy-first -screen">
          <div className="prior-auth">
            <h5>Prior Auth For : </h5>
            <h5 className="data-value">{prior_auth_desc}</h5>
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
                    <td className="findPolicy-data">{item.payer}</td>
                    <td className="findPolicy-data">
                      {item.conference_number}
                    </td>

                    <td
                      className="select-button"
                      onClick={() => handleSelect(item)}
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
      {/*  {selected && (
        <DecisionSupport
          pdfFile={pdfFile}
          requirementsData={requirementsData}
          payer={payer}
          prior_auth_desc={prior_auth_desc}
          handleBack={handleBack}
          selected={selected}
        />
      )} */}
    </div>
  );
}

export { FindClinicalPolicy };
