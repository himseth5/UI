import { act } from "react-dom/test-utils";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      console.log(action);
      return {
        ...state,
        isLoggedIn: true,
      };

    case "GET_DOCUMENTS":
      return {
        ...state,
        loading: false,
        docs: action.payload,
      };

    case "GET_IDENTFIER_DOCUMENTS":
      console.log(action.payload)
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

    default:
      return state;
  }
};
