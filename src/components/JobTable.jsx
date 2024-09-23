import React, { useEffect, useState } from "react";
import useJobsData from "../hooks/useJobsData";
import "./JobTable.css";

const JobTable = ({ setIsSearchForm }) => {
  const {
    jobsData,
    loading,
    error,
    refetch,
    page,
    limit,
    nextPage,
    prevPage,
    setLimit,
  } = useJobsData();

  const [applied, setApplied] = useState(new Set());

  useEffect(() => {
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setApplied(new Set(appliedJobs));
  }, []);

  if (error) {
    console.log("🚀 ~ App ~ error:", error);
    return <div>Error occured. Please check network tab</div>;
  }

  const renderPagination = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <span>
          Page {page + 1} of{" "}
          {jobsData?.metadata
            ? Math.ceil(jobsData.metadata.total_results / limit)
            : 1}
        </span>
        <button
          className="button input"
          onClick={prevPage}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className="button input"
          onClick={nextPage}
          disabled={
            jobsData?.metadata &&
            page === Math.ceil(jobsData.metadata.total_results / limit) - 1
          }
        >
          Next
        </button>
        <select
          className="input"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    );
  };

  const onClickRow = (id) => () => {
    setApplied((prev) => {
      if (!prev.has(id)) {
        const newSet = new Set(prev);
        newSet.add(id);
        localStorage.setItem("appliedJobs", JSON.stringify(Array.from(newSet)));
        return newSet;
      }
      return prev;
    });
  };

  return (
    <div className="job-table-container">
      <button className="refresh button input" onClick={refetch}>
        ⎋ Refresh
      </button>
      <button
        className="back button input"
        onClick={() => setIsSearchForm(false)}
      >
        ⬅ Back
      </button>
      {renderPagination()}
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
                  id,
                  job_title,
                  company,
                  date_posted,
                  final_url,
                  discovered_at,
                }) => {
                  return (
                    <tr className={applied.has(id) ? "applied" : ""} key={id}>
                      <td className="column">{company}</td>
                      <td className="column">
                        <a
                          href={final_url}
                          target="_blank"
                          onClick={onClickRow(id)}
                          rel="noreferrer"
                        >
                          {job_title}
                        </a>
                      </td>{" "}
                      <td className="column">
                        <a
                          href={final_url}
                          target="_blank"
                          onClick={onClickRow(id)}
                          rel="noreferrer"
                        >
                          {final_url}
                        </a>
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
      {renderPagination()}
    </div>
  );
};

export default JobTable;
