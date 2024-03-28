import { act } from "react-dom/test-utils";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userCredentials: action.payload,
      };

    case "GET_DOCUMENTS_START":
      return {
        ...state,
        loading: true,
      };
    case "GET_DOCUMENTS":
      return {
        ...state,
        loading: false,
        docs: action.payload,
      };

    case "GET_IDENTFIER_DOCUMENTS":
      return {
        ...state,
        loading: false,
        identifierDetails: action.payload,
      };

    case "GET_IDENTFIER_DOCUMENTS_START":
      return {
        ...state,
        loading: action.payload,
      };
    case "UPDATE_CLINICAL_DOCUMENT_START":
      return {
        ...state,
        loading: action.payload.loading,
        toastMessage: action.payload.toastMessage,
        messageType: action.payload.taostType,
      };
    case "UPDATE_CLINICAL_DOCUMENT_SUCCESS":
      return {
        ...state,
        loading: action.payload.loading,
        toastMessage: action.payload.toastMessage,
        messageType: action.payload.taostType,
      };

    case "GET_EVIDENCE_START":
      return {
        ...state,
        loading: action.payload,
      };
    case "GET_EVIDENCE":
      return {
        ...state,
        loading: false,
        evidenceResult: action.payload,
      };
    case "CLEAR_IDENTFIER_DOCUMENTS":
      return {
        ...state,
        evidenceResult: action.payload,
      };
    case "SET_PAGENUMBER":
      return {
        ...state,
        pageNum: action.payload,
      };
    case "SET_PRIOR_AUTH_DESC":
      return {
        ...state,
        prior_auth_desc: action.payload,
      };
    case "SET_TAB_STATUS":
      console.log("yehhhhh");
      return {
        ...state,
        Tab_Status: action.payload,
      };
    case "SET_DECISION_SUPPORT_TAB":
      return {
        ...state,
        currentTabSelected: action.payload,
      };
    default:
      return state;
  }
};
