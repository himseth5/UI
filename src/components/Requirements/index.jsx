import React, { useState } from "react";
import Modal from "react-modal";
import EvidenceFeedback from "../EvidenceFeedback";
import "./requirements.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { evidenceValidationData } from "../../utils/sampleData";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // This will give a semi-transparent dark background
  },
  content: {
    position: "absolute",
    top: "10%",
    left: "15%",
    right: "15%",
    bottom: "22%",
    overflow: "none",
    padding: "0",
    outline: "none",
    borderRadius: "0.5rem",
  },
};

Modal.setAppElement("body");

function Requirements(props) {
  const [dropdownValues, setDropdownValues] = useState({});
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const handleDropdownChange = (event, item) => {
    setDropdownValues({ ...dropdownValues, [item]: event.target.value });
  };

  // Function to handle button click
  const handleButtonClick = () => {
    // Perform actions when the button is clicked
    // setEvidenceStatusClicked(true);
    openModal();
    console.log("button clicked ");
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <div className="evidence-status-feedback-container">
            <div className="evidence-status-heading-contnr">
              <h4 className="evidence-status-heading">Evidence</h4>
              <IoIosCloseCircleOutline
                className="evidence-close-button"
                title="close"
                onClick={closeModal}
              />
            </div>
            <hr></hr>
            <EvidenceFeedback closeModalFunc={closeModal} />
          </div>
        </Modal>
      }
      <div className="prntheader">
        <h3>
          <span>Prior Authorization Evidence Validation</span>
        </h3>
      </div>

      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <th className="custom-cell">Item</th>
              <th className="custom-cell" >
                AND/OR
              </th>
              <th className="custom-cell">Description</th>
              <th className="custom-cell">Evidence Status</th>
          
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="custom-cell" rowSpan={2}>
                1
              </td>
              <td className="custom-cell"></td>
             
              <td className="custom-cell">
                Diagnosis of moderately to severely active rheumatoid arthritis
              </td>
              <td className="custom-cell">
                <button className="custom-button true-color" onClick={handleButtonClick}>
                  True
                </button>
              </td>
            </tr>
            <tr>
            <td className="custom-cell" colSpan={3}>AND</td>
           
            </tr>
            <tr>
              <td className="custom-cell" rowSpan={4}>
                2
              </td>

              <td className="custom-cell"></td>
              

              <td className="custom-cell" >History of failure to a 3 month trial of one non-biologic disease modifying anti-rheumatic drug (DMARD) [e.g., methotrexate, leflunomide, sulfasalazine, hydroxychloroquine] at maximally indicated doses, unless contraindicated or clinically significant adverse effects are experienced (document drug, date, and duration of trial).
             
              </td>
              
              <td className="custom-cell" rowSpan={3}>
                <button className="custom-button true-color" onClick={handleButtonClick}>
                  True
                </button>
              </td>
            </tr>
            <tr>
            <td className="custom-cell" colSpan={3}>OR</td>

            </tr>
            <tr>
              <td className="custom-cell"></td>
              
              <td className="custom-cell">
              Patient has been previously treated with a targeted immunomodulator FDAapproved for the treatment of rheumatoid arthritis as documented by claims history or submission of medical records (Document drug, date, and duration of therapy) [e.g., Enbrel (etanercept), Cimzia (certolizumab), Simponi (golimumab), Orencia (abatacept), adalimumab, Xeljanz (tofacitinib), Olumiant (baricitinib), Rinvoq (upadacitinib)]
              </td>
            </tr>
            <tr>  <td className="custom-cell" colSpan={3}>AND</td></tr>


            <tr>
              <td className="custom-cell" rowSpan={6}>3</td>
              <td className="custom-cell"></td>

              <td className="custom-cell">
              (a) History of failure, contraindication, or intolerance to two of the following preferred products (Document drug, date, and duration of trial)
                  i. Cimzia (certolizumab) ii. One of the preferred adalimumab products iii. Simponi (golimumab) iv. Olumiant (baricitinib) v. Rinvoq (upadacitinib) vi. Xeljanz/Xeljanz XR (tofacitinib)vii. Enbrel (etanercept)
               
              </td> 
              
              <td className="custom-cell" rowspan={5}>
                <button className="custom-button partial-color" onClick={handleButtonClick}>
                  Partial
                </button>
              </td>
            </tr>
            <tr>  <td className="custom-cell" colSpan={3}>OR</td></tr>

            <tr>
           
            <td className="custom-cell"></td>
            <td className="custom-cell" >
            i. Patient is currently on Actemra therapy as documented by claims history OR submission of medical records (Document date and duration of therapy)
              </td> 
            </tr>
            <tr>  <td className="custom-cell" colSpan={3}>AND</td></tr>
         
            <tr>
           
            <td className="custom-cell"></td>
            <td className="custom-cell" >
            ii. Patient has not received a manufacturer supplied sample at no cost in the prescriber’s office, or any form of assistance from the Genentech sponsored Actemra Access Solutions program (e.g., sample card which can be redeemed at a pharmacy for a free supply of medication) as a means to establish as a current user of Actemra*
              </td> 
            </tr>
            <tr>  <td className="custom-cell" colSpan={3}>AND</td></tr> 

            <tr>
              <td className="custom-cell" rowSpan={2}>4</td>
              <td className="custom-cell"></td>
              <td className="custom-cell" >Patient is not receiving Actemra in combination with another targeted immunomodulator [e.g., Enbrel (etanercept), Cimzia (certolizumab), Simponi (golimumab), Orencia (abatacept), adalimumab, Xeljanz (tofacitinib), Olumiant (baricitinib), Rinvoq (upadacitinib)]</td>
              <td className="custom-cell" >
                <button className="custom-button true-color" onClick={handleButtonClick}>
                  True
                </button>
              </td>
              </tr> 
              <tr>  <td className="custom-cell" colSpan={3}>AND</td></tr> 
              <tr>
              <td className="custom-cell" >5</td>
              <td className="custom-cell"></td>
              <td className="custom-cell" >Prescribed by or in consultation with a rheumatologist * Patients requesting initial authorization who were established on therapy via the receipt of a manufacturer supplied sample at no cost in the prescriber’s office or any form of assistance from the Genentech sponsored Actemra Access Solutions program shall be required to meet initial authorization criteria as if patient were new to therapy. Authorization will be issued for 12 months</td>
              <td className="custom-cell" >
                <button className="custom-button false-color" onClick={handleButtonClick}>
                  False
                </button>
              </td>
              </tr> 
            

            
          </tbody>
        </table>
      </div>
    </>
  );
}

export { Requirements };
