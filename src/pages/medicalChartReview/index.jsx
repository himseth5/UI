import { useContext, useEffect, useState } from "react";
import "./medicalChartReview.css";
import DetailsCard from "../../components/DetailsCard";
import PdfViewer from "../../components/PdfViewer";
import pdfFile from "../../assets/sample_file.pdf";
import DropDownBox from "../../components/DropDownBox";
import Checkbox from "../../components/Checkbox";
import { status } from "../../utils/sampleData";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CgProfile } from "react-icons/cg";
import { FaPaste } from "react-icons/fa";
import { appContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import Evidence from "../../components/Evidence/evidence";
import FilterButton from "../../components/FilterButton";

function MedicalChartReview() {
  const {
    identifierDetails,
    getDocumentDataPerIdentifier,
    getConceptEvidence,
    evidenceResult,
    loading,
    userName,
    updateClinicalDocumentSummary,
    updateDocumentStatus,
    dispatch,
  } = useContext(appContext);

  const [referenceText, setReferenceText] = useState(["lorem"]);
  const [notStarted, setNotStarted] = useState(
    "Not-started".toLocaleLowerCase()
  );
  const [inProgress, setInProgress] = useState(
    "In-Progress".toLocaleLowerCase()
  );
  const [complete, setCompleted] = useState("Complete".toLocaleLowerCase());
  const statusArray = [notStarted, inProgress, complete];
  const [selectedConcept, setSelectedConcept] = useState("");
  const [selectedCDSStatus, setSelectedCDSStatus] = useState("");

  const [masterDDArray, setmasterDDArray] = useState([]);
  const [pastedText, setpastedText] = useState("");
  const [patient, setPatient] = useState([]);
  const [provider, setProvider] = useState([]);
  const [clinicalDocument, setClinicalDocument] = useState([]);
  const [clinicalDocumentSummary, setclinicalDocumentSummary] = useState([]);

  const location = useLocation();
  const documentIdentifier = location.state.identifier;

  useEffect(() => {
    getDocumentDataPerIdentifier(documentIdentifier);
  }, []);

  useEffect(() => {
    setPatient(identifierDetails.patient);
    setProvider(identifierDetails.provider);
    setClinicalDocument(identifierDetails.clinical_document);

    const cds = identifierDetails.clinical_document_summary;
    if (identifierDetails?.clinical_document_summary !== undefined) {
      const cdsid =
        identifierDetails?.clinical_document_summary[0].CDS_Identifier;
      // setSelectedConcept(cdsid);
    }

    const filterdDropdown = cds?.filter((item) =>
      statusArray.includes(item.Concept_Review_Status.toLowerCase())
    );
    setclinicalDocumentSummary(filterdDropdown);
    setmasterDDArray(filterdDropdown);
  }, [identifierDetails]);

  useEffect(() => {
    const filterdDropdown = masterDDArray?.filter((item) =>
      statusArray.includes(item.Concept_Review_Status.toLowerCase())
    );
    setclinicalDocumentSummary(filterdDropdown);

    if (filterdDropdown.length > 0) {
      initConceptEvidence(selectedConcept);
    } else {
      dispatch({ type: "CLEAR_IDENTFIER_DOCUMENTS", payload: [] });
      setSelectedConcept("");
    }
  }, [notStarted, inProgress, complete]);

  const initConceptEvidence = (cds_identifier) => {
    getConceptEvidence(cds_identifier, statusArray);
  };

  const handleChange = (e) => {
    setpastedText(e.target.value);
  };
  function handleDropDownSelection(value, field) {
    console.log("value", value, field, statusArray);
    if (field === "concept") {
      setSelectedConcept(value);
      getConceptEvidence(value, statusArray);
      console.log(selectedConcept, notStarted, inProgress, complete);
    }

    if (field === "notes") {
      setSelectedCDSStatus(value);
    }
  }
  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setpastedText(text);
    } catch (error) {
      console.log(error);
    }
  };

  const buildCDSPostObject = (data) => {
    return {
      ...data,
      User_Name: userName,
      User_Notes: pastedText,
      Concept_Review_Status: selectedCDSStatus,
    };
  };

  const buildDocumentPostObject = (data, docStatus) => {
    return {
      ...data,
      User_Name: userName,

      Document_Review_Status: docStatus,
    };
  };

  const checkDocumentStatus = (status) => {
    return masterDDArray.filter(
      (item) =>
        item.Concept_Review_Status.toLowerCase() ===
        status.toLowerCase() && selectedConcept !== item.CDS_Identifier
    );
  };
  const updateStates = () => {
    const cdsRecord = clinicalDocumentSummary.filter((item)=> item.CDS_Identifier === selectedConcept)[0];
    const documentRecord = clinicalDocument.filter((item)=> item.CDS_Identifier === clinicalDocument.Identifier)[0];
    let docStatus = "";
    const statusArray =checkDocumentStatus('In-Progress');
    console.log(statusArray, "statusArray", masterDDArray.length-1);
    if (statusArray.length > 0 || selectedCDSStatus.toLowerCase()==='In-Progress'.toLowerCase()) {
      docStatus = "In-Progress";
    } else {
      const NotStartedArray = checkDocumentStatus('Not-Started');
      const completdArray = checkDocumentStatus('Completed')
      if(NotStartedArray.length === masterDDArray.length-1 && selectedCDSStatus.toLowerCase()==='Not-Started'.toLowerCase()){
        docStatus = "Not-Started";
      }else if(completdArray.length === masterDDArray.length-1 && selectedCDSStatus.toLowerCase()==='Complete'.toLowerCase){
        docStatus = "Complete";
      }else{
        docStatus = "Complete";
      }
      console.log(completdArray, '----completdArray-----',selectedCDSStatus)
console.log(NotStartedArray, '----NotStartedArray-----')
    }
console.log(docStatus, 'docstatus')

   // console.log(buildCDSPostObject(cdsRecord), 'CDS')
    const doc = buildDocumentPostObject(documentRecord, docStatus);
   //console.log(doc, 'Document')
      updateClinicalDocumentSummary(
      buildCDSPostObject(cdsRecord),
      selectedConcept
    )
      .then((response) => {
        const doc = buildDocumentPostObject(documentRecord, docStatus);

        console.log(documentRecord,'CD')
        updateDocumentStatus(doc, documentRecord.Identifier)
      })
      .catch((error) => {
        console.log(error);
      });  
  };

  return (
    <div className="page-main-container">
      <div className="card-container">
        {clinicalDocument && (
          <DetailsCard
            cardHeader={"Prior Auth Request Details"}
            cardData={clinicalDocument}
            type={"Auth"}
          />
        )}
        {patient && (
          <DetailsCard
            cardHeader={"Patient Details"}
            cardData={patient}
            type={"Patient"}
          />
        )}
        {provider && (
          <DetailsCard
            cardHeader={"Provider  Details"}
            cardData={provider}
            type={"Provider"}
          />
        )}
        {clinicalDocument && (
          <DetailsCard
            cardHeader={"Document Details"}
            cardData={clinicalDocument}
            type={"document"}
          />
        )}
        {clinicalDocument && (
          <DetailsCard
            cardHeader={"Status"}
            cardData={clinicalDocument}
            type={"status"}
          />
        )}
      </div>
      <div className="pdfViewer-and-operations-container">
        <PdfViewer
          className={"pdfViewer-container"}
          pdfurl={
            //   "https://cenblob001.blob.core.windows.net/samplepdfstorage/Blank%20diagram%20(1).pdf?sp=r&st=2024-02-28T11:05:48Z&se=2024-02-29T00:05:48Z&sv=2022-11-02&sr=b&sig=CvhHK5U8u%2Fgzh6OGSg4eIyjoSi7LibZbobFNUPGEN9k%3D"
            pdfFile
          }
          referenceTextInput={referenceText}
        />

        <div className="operation-container">
          <div className="filter-container">
            <h4>Filter by :</h4>
            <FilterButton
              label={"Not-Started"}
              setLabel={(lbl) => {
                setNotStarted(lbl);
              }}
            />
            <FilterButton
              label={"In-Progress"}
              setLabel={(lbl) => {
                setInProgress(lbl);
              }}
            />
            <FilterButton
              label={"Complete"}
              setLabel={(lbl) => {
                setCompleted(lbl);
              }}
            />
            <h5 className="clear-filter-button">Clear Filter</h5>
          </div>
          <div className="select-concept-container">
            {clinicalDocumentSummary && (
              <DropDownBox
                label={""}
                cssName={"select-box-container-concept"}
                dropDownBoxData={clinicalDocumentSummary}
                type={"concept"}
                onSelect={(value) => handleDropDownSelection(value, "concept")}
              />
            )}
          </div>

          <Evidence data={evidenceResult} />
          {selectedConcept !== "" && (
            <div className="llm-box-container">
              <div className="user-box-container">
                <div className="person-icon">
                  <CgProfile className="profile-icon" />
                </div>
                <div className="username"> {userName}</div>
                <div className="time">5 min ago</div>
              </div>
              <div className="text-field-container">
                <div>
                  <TextField
                    variant="standard"
                    disableUnderline={false}
                    sx={{ width: "100%", padding: "10px 5px" }}
                    multiline
                    maxRows={4}
                    onChange={handleChange}
                    value={pastedText}
                    placeholder="Type anything…"
                    InputProps={{
                      disableUnderline: false, // <== added this
                    }}
                  ></TextField>
                </div>
                <div className="btn-container">
                  <div className="paste-icon" onClick={() => pasteText()}>
                    <FaPaste />
                  </div>
                  <div className="select-notes-dd">
                    <DropDownBox
                      label={""}
                      dropDownBoxData={status}
                      onSelect={(value) =>
                        handleDropDownSelection(value, "notes")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedConcept !== "" && (
            <div>
              <div className="save-btn-container">
                <Button
                  type="button"
                  disabled={pastedText === ""}
                  style={{
                    backgroundColor: "rgb(233, 79, 28)",
                    borderRadius: "20px",
                    fontWeight: "700",
                    width: "20%",
                  }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={updateStates}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicalChartReview;
