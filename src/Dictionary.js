// App.js
import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearch(event) {
    event.preventDefault();

    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);

    const apiKey = "207446fe5b843td6o246060ad31759ff";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.word) {
          setResults(response.data);
        } else {
          setResults(null);
          setError("No definitions found.");
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
        setResults(null);
      })
      .finally(() => setLoading(false));
  }

  function handleClear() {
    setKeyword("");
    setResults(null);
    setError(null);
  }

  return (
    <div className="dictionary-app">
      <div className="dictionary-header">
        <h1>Dictionary</h1>
        <p>Search for a word to see its definition</p>
      </div>

      <div className="search-section">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className={`search-input ${error ? "error" : ""}`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Type a word..."
          />
          <div className="button-group">
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? <div className="loading-spinner-small" /> : "Search"}
            </button>
            {results && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="content-area">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p className="loading-subtext">
              Searching for:{" "}
              <span className="keyword-highlight">{keyword}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Oops!</h3>
            <p className="error-message">{error}</p>
            <button onClick={handleClear}>Try Again</button>
          </div>
        )}

        {results && <Results results={results} />}
      </div>
    </div>
  );
}
