import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import "./medicalChartReview.css";
import DetailsCard from "../../components/DetailsCard";
import PdfViewer from "../../components/PdfViewer";
import pdfFile from "../../assets/sample_file.pdf";
import DropDownBox from "../../components/DropDownBox";
import { status } from "../../utils/sampleData";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CgProfile } from "react-icons/cg";
import { FaPaste } from "react-icons/fa";
import { appContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import Evidence from "../../components/Evidence/evidence";
import FilterButton from "../../components/FilterButton";
import Tooltip from "@mui/material/Tooltip";
import { converUTCtoLoacle } from "../../utils/dateUtils";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Accordion from "../../components/Accordion";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // This will give a semi-transparent dark background
  },
  content: {
    position: "absolute",
    top: "10%",
    left: "15%",
    right: "15%",
    bottom: "5%",
    overflow: "none",
    paddingTop: "0",
    outline: "none",
  },
};

Modal.setAppElement("body");

function MedicalChartReview() {
  const {
    identifierDetails,
    getDocumentDataPerIdentifier,
    getConceptEvidence,
    evidenceResult,

    updateClinicalDocumentSummary,
    updateDocumentStatus,
    dispatch,
  } = useContext(appContext);
  const keyName = "userCredentials";
  let finalText = "";

  const [referenceText, setReferenceText] = useState(["Column 2", "Column 3"]);

  const value = window.localStorage.getItem(keyName);
  const userCredentials = JSON.parse(value);

  const [selectedCDS, setSelectedCDS] = useState(undefined);
  const [documentStatus, setDocStatus] = useState("");
  const [notStarted, setNotStarted] = useState(
    "Not-started".toLocaleLowerCase()
  );
  const [inProgress, setInProgress] = useState(
    "In-Progress".toLocaleLowerCase()
  );
  const [complete, setCompleted] = useState("Complete".toLocaleLowerCase());
  const statusArray = [notStarted, inProgress, complete];

  const [clear, setClear] = useState();

  const [selectedConcept, setSelectedConcept] = useState("");
  const [selectedCDSStatus, setSelectedCDSStatus] = useState("");

  const [masterDDArray, setmasterDDArray] = useState([]);
  const [pastedText, setpastedText] = useState("");
  const [patient, setPatient] = useState([]);
  const [provider, setProvider] = useState([]);
  const [clinicalDocument, setClinicalDocument] = useState([]);
  const [clinicalDocumentSummary, setclinicalDocumentSummary] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [maxHeight, setMaxHeight] = useState(600);

  const child1Ref = useRef(null);
  const child2Ref = useRef(null);

  const resizeCallback = useCallback(() => {
    if (!child1Ref.current || !child2Ref.current) {
      return;
    }
    const newMaxHeight = Math.max(
      child1Ref.current.scrollHeight,
      child2Ref.current.scrollHeight
    );
    setMaxHeight(newMaxHeight);
  }, [child1Ref.current, child2Ref.current]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(resizeCallback);
    if (child1Ref.current) {
      resizeObserver.observe(child1Ref.current);
    }
    if (child2Ref.current) {
      resizeObserver.observe(child2Ref.current);
    }

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [resizeCallback, child1Ref.current, child2Ref.current]);

  useEffect(() => {
    if (child1Ref.current) {
      child1Ref.current.style.height = `${maxHeight}px`;
    }
    if (child2Ref.current) {
      child2Ref.current.style.height = `${maxHeight}px`;
    }
  }, [maxHeight, child1Ref.current, child2Ref.current]);

  const location = useLocation();
  const documentIdentifier = location.state.identifier;
  const pdfPath = location.state.documentPath;
  const pdfName = location.state.documentName;

  //modal functions
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handlePdfDoubleClick() {
    openModal();
  }

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
        identifierDetails?.clinical_document_summary[0]?.CDS_Identifier;
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

  //handle clear
  const handleClearFilter = () => {
    setClear(true);
    setNotStarted(null);
    setInProgress(null);
    setCompleted(null);
  };

  const handleChange = (e) => {
    setpastedText(e.target.value);
  };

  const getSelectedCDSObject = (id) => {
    const obj = clinicalDocumentSummary.filter(
      (item) => item.CDS_Identifier === id
    )[0];
    setpastedText(obj.User_Notes);
    setSelectedCDS(obj);
  };
  function handleDropDownSelection(value, field) {
    if (field === "concept") {
      setSelectedConcept(value);
      getConceptEvidence(value, statusArray);
      getSelectedCDSObject(value);
    }

    if (field === "notes") {
      setSelectedCDSStatus(value);
    }
  }
  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const existingNotes = selectedCDS.User_Notes;
      let holdText =
        pastedText === "" ? text + "\n"+ existingNotes : pastedText + "\n"+ text;
      finalText = holdText;

      setpastedText(finalText);
    } catch (error) {
      console.log(error);
    }
  };

  function storeReferenceTextInArray(reference) {
    setReferenceText(...referenceText, reference);
  }
  const buildCDSPostObject = (data) => {
    return {
      ...data,
      // User_Name: userCredentials?.name,
      User_Name:userCredentials.email.split("@")[0],
      User_Notes: pastedText,
      Concept_Review_Status: selectedCDSStatus,
    };
  };

  const buildDocumentPostObject = (data, docStatus) => {
    return {
      ...data,
      User_Name: userCredentials?.name,

      Document_Review_Status: docStatus,
    };
  };

  const checkDocumentStatus = (status) => {
    return masterDDArray.filter(
      (item) =>
        item.Concept_Review_Status.toLowerCase() === status.toLowerCase() &&
        selectedConcept !== item.CDS_Identifier
    );
  };
  const updateStates = () => {
    const cdsRecord = clinicalDocumentSummary.filter(
      (item) => item.CDS_Identifier === selectedConcept
    )[0];
    const documentRecord = clinicalDocument.filter(
      (item) => item.CDS_Identifier === clinicalDocument.Identifier
    )[0];
    let docStatus = "";
    const statusArray = checkDocumentStatus("In-Progress");

    if (
      statusArray.length > 0 ||
      selectedCDSStatus.toLowerCase() === "In-Progress".toLowerCase()
    ) {
      docStatus = "In-Progress";
    } else {
      const NotStartedArray = checkDocumentStatus("Not-Started");
      const completdArray = checkDocumentStatus("Completed");
      if (
        NotStartedArray.length === masterDDArray.length - 1 &&
        selectedCDSStatus.toLowerCase() === "Not-Started".toLowerCase()
      ) {
        docStatus = "Not-Started";
      } else if (
        completdArray.length === masterDDArray.length - 1 &&
        selectedCDSStatus.toLowerCase() === "Complete".toLowerCase
      ) {
        docStatus = "Complete";
      } else {
        docStatus = "Complete";
      }
    }

    setDocStatus(docStatus);

    updateClinicalDocumentSummary(
      buildCDSPostObject(cdsRecord),
      selectedConcept
    )
      .then((response) => {
        const doc = buildDocumentPostObject(documentRecord, docStatus);

        updateDocumentStatus(doc, documentRecord.Identifier);
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
            documentStatus={documentStatus}
            type={"status"}
          />
        )}
      </div>
      <div className="pdfViewer-and-operations-container">
        <div
          className="medicalchart-pdf-container"
          onDoubleClick={handlePdfDoubleClick}
          ref={child1Ref}
        >
          <PdfViewer
            className={"pdfViewer-container"}
            pdfurl={
              //   "https://cenblob001.blob.core.windows.net/ccpcont-incoming-pdf/ActemraPrior_Auth_Request_synthetic%201.pdf?sp=r&st=2024-03-04T10:13:34Z&se=2024-03-04T18:13:34Z&spr=https&sv=2022-11-02&sr=b&sig=%2B648YMXvSWIOYscqGseJ8U26qMKoepcLQ08bYI1ELXQ%3D"
              pdfFile
              //  pdfPath
            }
            pdfname={pdfName}
            referenceTextInput={referenceText}
          />
        </div>
        <div className="operation-container" ref={child2Ref}>
          <div className="filter-container">
            <h4>Filter by :</h4>
            <FilterButton
              label={"Not-Started"}
              setLabel={(lbl) => {
                setNotStarted(lbl);
              }}
              cleared={clear}
              setCleared={setClear}
            />
            <FilterButton
              label={"In-Progress"}
              setLabel={(lbl) => {
                setInProgress(lbl);
              }}
              cleared={clear}
              setCleared={setClear}
            />
            <FilterButton
              label={"Complete"}
              setLabel={(lbl) => {
                setCompleted(lbl);
              }}
              cleared={clear}
              setCleared={setClear}
            />
            <h5 className="clear-filter-button" onClick={handleClearFilter}>
              Clear Filter
            </h5>
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
          <div>
            {selectedCDS && (
              <Accordion
                accordionTitle={"Summary for All Evidences"}
                accordionContent={selectedCDS}
              />
            )}
          </div>
          {evidenceResult && selectedCDS && (
            <Evidence
              data={evidenceResult}
              storeReferenceTextInArray={storeReferenceTextInArray}
            />
          )}
          {selectedConcept !== "" && (
            <div className="llm-box-container">
              <div className="user-box-container">
                <div className="person-icon">
                  <CgProfile className="profile-icon" />
                </div>
                <div className="username">
                {" "}
                  {userCredentials.email.split("@")[0]}
                  {/* {userCredentials?.name} */}
                </div>
                <div className="time">
                  {converUTCtoLoacle(selectedCDS.Last_Updated_Dts)} ago
                </div>
              </div>
              <div className="text-field-container">
                <div>
                  <TextField
                    variant="standard"
                    disableUnderline={false}
                    sx={{ width: "100%", padding: "10px 5px" }}
                    multiline
                    maxRows={8}
                    onChange={handleChange}
                    value={pastedText}
                    placeholder="Type anything…"
                    InputProps={{
                      disableUnderline: false, // <== added this
                    }}
                  ></TextField>
                </div>
                <div className="btn-container">
                  <Tooltip title="Paste" placement="top-start">
                    <div className="paste-icon" onClick={() => pasteText()}>
                      <FaPaste />
                    </div>
                  </Tooltip>
                  <div className="select-notes-dd">
                    <DropDownBox
                      label={""}
                      dropDownBoxData={status}
                      type="notes"
                      selectedValue={selectedCDS}
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
                  disabled={selectedConcept === ""}
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Pdf File"
      >
        <div className="modal-pdf-viewer-container">
          <IoIosCloseCircleOutline
            className="close-button"
            title="close"
            onClick={closeModal}
          />
          <PdfViewer
            className="modal-pdf-viewer"
            pdfurl={pdfFile}
            pdfname={pdfName}
          />
        </div>
      </Modal>
    </div>
  );
}

export default MedicalChartReview;
