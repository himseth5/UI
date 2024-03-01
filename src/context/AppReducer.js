import { act } from "react-dom/test-utils";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload.email.split("@")[0],
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
    default:
      return state;
  }
};
