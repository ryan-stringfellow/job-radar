import React, { createContext, useState, useContext } from "react";
import villaToken from "../data/token.json";

// Create the context
export const FormContext = createContext();

// Create the provider component
export const FormProvider = ({ children }) => {
  // Define state for each form input
  const [limit, setLimit] = useState(20);
  const [pastXDays, setPastXDays] = useState(3);
  const [token, setToken] = useState(villaToken.value);
  const [searchQueryInJobTitle, setSearchQueryInJobTitle] = useState([
    "engineer",
    "developer",
  ]);
  const [techQuery, setTechQuery] = useState(["react"]);

  // Form data object
  const formData = {
    limit,
    pastXDays,
    token,
    searchQueryInJobTitle,
    techQuery,
  };

  // Functions to update the state
  const updateLimit = (value) => setLimit(value);
  const updatePastXDays = (value) => setPastXDays(value);
  const updateToken = (value) => setToken(value);
  const updateSearchQueryInJobTitle = (index, value) => {
    const newArray = [...searchQueryInJobTitle];
    newArray[index] = value;
    setSearchQueryInJobTitle(newArray);
  };
  const addSearchQueryInJobTitle = () =>
    setSearchQueryInJobTitle([...searchQueryInJobTitle, ""]);

  const updateTechQuery = (index, value) => {
    const newArray = [...techQuery];
    newArray[index] = value;
    setTechQuery(newArray);
  };
  const addTechQuery = () => setTechQuery([...techQuery, ""]);

  // Providing the form data and updating functions to the children
  return (
    <FormContext.Provider
      value={{
        formData,
        updateLimit,
        updatePastXDays,
        updateToken,
        updateSearchQueryInJobTitle,
        addSearchQueryInJobTitle,
        updateTechQuery,
        addTechQuery,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};
