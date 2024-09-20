import { createContext, useContext, useState, useEffect } from "react";
import useJobsData from "../hooks/useJobsData";

// Create the JobsContext
const JobsContext = createContext();

// Create a provider component
export const JobsProvider = ({ children }) => {
  const { jobsData, loading, error } = useJobsData();
  const [jobs, setJobs] = useState(null);

  // Set the jobs data whenever the hook fetches new data
  useEffect(() => {
    setJobs(jobsData);
  }, [jobsData]);

  return (
    <JobsContext.Provider value={{ jobs, loading, error }}>
      {children}
    </JobsContext.Provider>
  );
};

// Custom hook to use the JobsContext
export const useJobs = () => {
  return useContext(JobsContext);
};
