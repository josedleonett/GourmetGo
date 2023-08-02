import { createContext, useMemo, useReducer } from "react";

export const initialState = {
  apiResponse: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_API_RESPONSE":
      return { ...state, apiResponse: action.payload };

    default:
      return state;
  }
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  );
};
