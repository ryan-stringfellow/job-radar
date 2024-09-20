import axios from "axios";
import { useEffect, useState } from "react";
import villaToken from "../data/token.json";
import { useForm } from "../contexts/FormContext";

const useJobsData = () => {
  const [jobsData, setJobsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { formData } = useForm();
  const { limit, pastXDays, token, searchQueryInJobTitle, techQuery } =
    formData;

  const url = "https://api.theirstack.com/v1/jobs/search";
  const queryParams = {
    source: "app",
    session_id: "01920b58-269c-7e64-8f18-dcae6269e538",
  };
  const payload = {
    blur_company_data: true,
    include_total_results: false,
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
        params: queryParams,
      });

      setJobsData(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { jobsData, loading, error, refetch: fetchData };
};

export default useJobsData;
