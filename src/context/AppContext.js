import React, { useReducer } from "react";

import { AppReducer } from "./AppReducer";
import axios from "axios";

import {
  getCDSURL,
  getCESURL,
  getDocumentIdentifierURL,
  getDocumentsUrl,
  getEvidenceURL,
  getMainDocumentURL,
} from "../services/api";

import { getDocuments } from "../services/apiConsume";
import { useLocalStorage } from "../hooks/useLocalStorage";

const initialState = {
  loading: false,
  isLoggedIn: false,
  userCredentials: null,
  docs: [],
  identifierDetails: {},
  evidenceResult: [],
  error: false,
  pageNum: 0,
  toastMessage: "",
  messageType: "",
};
export const appContext = React.createContext(initialState);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  const getPdfDocuments = async () => {
    const url = getDocumentsUrl;
    dispatch({ type: "GET_DOCUMENTS_START", payload: true });
    try {
      const result = await getDocuments();
      let docs = [];
      docs = result?.map((item) => item);
      dispatch({ type: "GET_DOCUMENTS", payload: docs });
    } catch (error) {
      console.log(error);
    }
  };

  const setLoggedInState = (credentials) => {
    if (
      credentials.email === "exl@exlservice.com" &&
      credentials.password === "password@123"
    ) {
      //setUserCredentials(credentials);
      dispatch({
        type: "SET_LOGIN",
        payload: credentials,
      });
    } else {
      alert("Invalid username or password");
    }
  };

  const getDocumentDataPerIdentifier = async (identifier) => {
    const identifierURL = getDocumentIdentifierURL + `/${identifier}`;
    dispatch({ type: "GET_IDENTFIER_DOCUMENTS_START", payload: true });
    try {
      const res = await axios.get(identifierURL);
      const result = await res.data.res;

      let identifierDetails = result;
      // identifierDetails = result?.map((item) => item);
      dispatch({ type: "GET_IDENTFIER_DOCUMENTS", payload: identifierDetails });
    } catch (error) {
      console.log(error);
    }
  };

  const getConceptEvidence = async (cds_identifier, reviewStatus) => {
    const reviewArray = reviewStatus.filter((item) => item !== "");
    if (
      cds_identifier !== "" &&
      cds_identifier !== undefined &&
      reviewArray.length > 0
    ) {
      const evidencURL = getEvidenceURL + `${cds_identifier}`;
      dispatch({ type: "GET_EVIDENCE_START", payload: true });
      try {
        const res = await axios.get(evidencURL);
        const result = await res.data.res.clinical_evidence_summary;

        let evidenceDetails;
        evidenceDetails = result?.filter(
          (item) => item.CDS_Identifier === cds_identifier && reviewArray
        );

        dispatch({ type: "GET_EVIDENCE", payload: evidenceDetails });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateUserFeedback = async (data, ces_identifier) => {
    const URL = getCESURL + `${ces_identifier}`;
    try {
      const res = await axios.put(URL, data);
      const result = await res.data;
      
    } catch (error) {}
  };

  const updateDocumentFeedback = async (data, cds_identifier) => {
    const URL = getCDSURL + `${cds_identifier}`;
    try {
      const res = await axios.put(URL, data);
      const result = await res.data;
      
    } catch (error) {}
  };
  const updateClinicalDocumentSummary = async (data, cds_identifier) => {
    const payLoadObject = {
      loading: true,
      toastMessage: "",
      taostType: "",
    };
    dispatch({ type: "UPDATE_CLINICAL_DOCUMENT_START", payload: payLoadObject });
    const URL = getCDSURL + `${cds_identifier}`;
    const configObject = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    const fetchPromise = fetch(URL, configObject);

    return fetchPromise;
  };

  const updateDocumentStatus = async (data, identifier) => {
    const URL = getMainDocumentURL + `${identifier}`;

    
    try {
      const res = await axios.put(URL, data);
      const result = await res.data;
      
      const payLoadObject = {
        loading: false,
        toastMessage: "Record Updated SuccessFully",
        taostType: "Success",
      };
      dispatch({ type: "UPDATE_CLINICAL_DOCUMENT_SUCCESS", payload: payLoadObject });
    } catch (error) {}
  };

  return (
    <appContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        error: state.error,
        docs: state.docs,
        loading: state.loading,
        identifierDetails: state.identifierDetails,
        evidenceResult: state.evidenceResult,
        
        pageNum: state.pageNum,
        userCredentials: state.userCredentials,
        messageType:state.messageType,
        toastMessage:state.toastMessage,
        setLoggedInState,
        getPdfDocuments,
        getDocumentDataPerIdentifier,
        getConceptEvidence,
        updateUserFeedback,
        updateDocumentFeedback,
        updateClinicalDocumentSummary,
        updateDocumentStatus,
        dispatch,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
