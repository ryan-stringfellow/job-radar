import React from "react";
import useJobsData from "../hooks/useJobsData";
import "./JobTable.css";

const JobTable = ({ setIsSearchForm }) => {
  const { jobsData, loading, error, refetch } = useJobsData();

  if (error) {
    console.log("🚀 ~ App ~ error:", error);
    return <div>Error occured. Please check network tab</div>;
  }

  return (
    <div className="job-table-container">
      <button className="refresh button" onClick={refetch}>
        ⎋ Refresh
      </button>
      <button className="back button" onClick={() => setIsSearchForm(false)}>
        ⬅ Back
      </button>
      {!loading ? (
        <table id="data-table">
          <thead>
            <tr>
              <th className="column">Company</th>
              <th className="column">Job Title</th>
              <th className="column">Final URL</th>
              <th>Date</th>
              <th>Discovered At</th>
            </tr>
          </thead>
          <tbody>
            {jobsData?.data
              .filter(({ company }) => company.toLowerCase() !== "cybercoders")
              .map(
                ({
                  job_title,
                  company,
                  date_posted,
                  final_url,
                  discovered_at,
                }) => {
                  return (
                    <tr>
                      <td className="column">{company}</td>
                      <td className="column">
                        <a href={final_url}>{job_title}</a>
                      </td>{" "}
                      <td className="column">
                        <a href={final_url}>{final_url}</a>
                      </td>
                      <td>{date_posted}</td>
                      <td>{new Date(discovered_at).toLocaleString()}</td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobTable;
