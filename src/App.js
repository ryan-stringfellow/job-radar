import "./App.css";
import React, { useState } from "react";
import JobTable from "./components/JobTable";
import SearchForm from "./components/SearchForm";
import { FormProvider } from "./contexts/FormContext";
// import { JobsProvider } from "./contexts/JobsContext";

function App() {
  const [isSearchForm, setIsSearchForm] = useState(false);

  return (
    <FormProvider>
      {/* <JobsProvider> */}
      <div className="App">
        {!isSearchForm ? (
          <SearchForm setIsSearchForm={setIsSearchForm} />
        ) : (
          <JobTable setIsSearchForm={setIsSearchForm} />
        )}
      </div>
      {/* </JobsProvider> */}
    </FormProvider>
  );
}

export default App;
