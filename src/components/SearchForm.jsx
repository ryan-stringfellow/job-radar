import React, { useContext } from "react";
import { FormContext } from "../contexts/FormContext";

const SearchForm = ({ setIsSearchForm }) => {
  const {
    formData,
    updatePastXDays,
    updateToken,
    updateSearchQueryInJobTitle,
    addSearchQueryInJobTitle,
    updateTechQuery,
    addTechQuery,
  } = useContext(FormContext);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearchForm(true);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Past X Days:</label>
        <input
          type="number"
          value={formData.pastXDays}
          onChange={(e) => updatePastXDays(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Token:</label>
        <input
          type="text"
          value={formData.token}
          onChange={(e) => updateToken(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Search Query In Job Title:</label>
        {formData.searchQueryInJobTitle.map((query, index) => (
          <div key={index} style={styles.arrayInput}>
            <input
              type="text"
              value={query}
              onChange={(e) =>
                updateSearchQueryInJobTitle(index, e.target.value)
              }
              style={styles.input}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSearchQueryInJobTitle}
          style={styles.addButton}
        >
          Add Job Title Query
        </button>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Tech Query:</label>
        {formData.techQuery.map((query, index) => (
          <div key={index} style={styles.arrayInput}>
            <input
              type="text"
              value={query}
              onChange={(e) => updateTechQuery(index, e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
        <button type="button" onClick={addTechQuery} style={styles.addButton}>
          Add Tech Query
        </button>
      </div>

      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

// Inline CSS Styles (same as before)
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "100%",
    boxSizing: "border-box",
  },
  arrayInput: {
    marginBottom: "10px",
  },
  addButton: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    width: "150px",
    alignSelf: "flex-start",
  },
  submitButton: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default SearchForm;
