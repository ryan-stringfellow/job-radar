import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "../contexts/FormContext";

const useJobsData = () => {
  const { formData } = useForm();
  const { pastXDays, token, searchQueryInJobTitle, techQuery } = formData;

  const [jobsData, setJobsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const goToPage = (page) => {
    setPage(page);
  };

  const url = "https://api.theirstack.com/v1/jobs/search";
  const queryParams = {
    source: "app",
    session_id: "01920b58-269c-7e64-8f18-dcae6269e538",
  };
  const payload = {
    blur_company_data: true,
    include_total_results: true,
    job_country_code_or: ["US"],
    job_technology_slug_or: techQuery,
    job_title_or: searchQueryInJobTitle,
    limit,
    order_by: [
      {
        desc: true,
        field: "discovered_at",
      },
    ],
    page: 0,
    posted_at_max_age_days: pastXDays,
    remote: true,
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { ...queryParams, limit, page },
      });

      setJobsData(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(0);
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  return {
    jobsData,
    loading,
    error,
    refetch: fetchData,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    page,
    limit,
  };
};

export default useJobsData;
