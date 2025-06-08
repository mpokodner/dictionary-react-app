// Dictionary Component - main application logic
import React, { useState, useCallback } from "react";
import Results from "./Results";
import "./Dictionary.css"; // CSS styles that match the wireframe design

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handleResponse: Processes the successful API response.
  const handleResponse = useCallback((response) => {
    if (
      response.data &&
      response.data.word &&
      Array.isArray(response.data.meanings)
    ) {
      setResults(response.data);
      setError(null);
    } else {
      setResults(null);
      setError("No definition found for this word. Please try another word.");
    }
    setLoading(false);
  }, []);

  // handleError: Manages displaying various API and network errors to the user.
  const handleError = useCallback((err) => {
    console.error("API Error:", err);
    setResults(null);

    let errorMessage = "An unexpected error occurred. Please try again.";

    if (err.response) {
      switch (err.response.status) {
        case 404:
          errorMessage =
            "Word not found. Please check your spelling and try again.";
          break;
        case 429:
          errorMessage =
            "You've made too many requests. Please wait a moment and try again.";
          break;
        case 401:
          errorMessage = "API key error. Please verify your API configuration.";
          break;
        default:
          errorMessage = `Server error (${err.response.status}). Please try again later.`;
      }
    } else if (err.request) {
      errorMessage =
        "No response from the server. Please check your internet connection.";
    } else if (err.name === "TypeError" && err.message === "Failed to fetch") {
      errorMessage =
        "Network error. Please check your internet connection and try again.";
    } else {
      errorMessage = `An error occurred: ${err.message}. Please try again.`;
    }

    if (!navigator.onLine) {
      errorMessage = "You are offline. Please check your internet connection.";
    }

    setError(errorMessage);
    setLoading(false);
  }, []);

  // search: Initiates the API call based on the keyword.
  const search = useCallback(
    async (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      const trimmedKeyword = keyword.trim().toLowerCase();

      // Input validation checks
      if (!trimmedKeyword) {
        setError("Please enter a word to search.");
        setResults(null);
        return;
      }
      if (trimmedKeyword.length > 50) {
        setError("Please enter a shorter word (maximum 50 characters).");
        return;
      }
      if (!/^[a-zA-Z\s-']+$/.test(trimmedKeyword)) {
        setError(
          "Please enter only letters, spaces, hyphens, and apostrophes."
        );
        return;
      }

      setLoading(true);
      setError(null);
      setResults(null);

      const apiKey = "207446fe5b843td6o246060ad31759ff";
      const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${encodeURIComponent(
        trimmedKeyword
      )}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(
            errorBody.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        handleResponse({ data });
      } catch (err) {
        const simplifiedError = {
          response: err.message.includes("HTTP error! status:")
            ? { status: parseInt(err.message.split(": ")[1]) }
            : null,
          request: err.message.includes("Failed to fetch") || !navigator.onLine,
          message: err.message,
          name: err.name,
        };
        handleError(simplifiedError);
      }
    },
    [keyword, handleResponse, handleError]
  );

  // handleKeywordChange: Updates the keyword state and clears errors when user types.
  const handleKeywordChange = useCallback(
    (event) => {
      setKeyword(event.target.value);
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  // clearSearch: Resets all states, effectively clearing the search interface.
  const clearSearch = useCallback(() => {
    setKeyword("");
    setResults(null);
    setError(null);
  }, []);

  // handleKeyPress: Triggers search when 'Enter' key is pressed in the input field.
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        search(event);
      }
    },
    [search]
  );

  return (
    // Replaced Tailwind classes with custom CSS class "dictionary-app"
    <div className="dictionary-app">
      <div className="dictionary-header">
        <h1 className="dictionary-header-title">📚 Dictionary</h1>{" "}
        {/* Added a class for h1 */}
        <p>Discover comprehensive word definitions, examples, and more</p>
      </div>

      <div className="search-section">
        <form onSubmit={search} className="search-container">
          <label htmlFor="dictionary-search" className="sr-only">
            Search for a word
          </label>
          <input
            id="dictionary-search"
            type="search"
            placeholder="Enter a word to define... (e.g., book, run, beautiful)"
            autoFocus={true}
            value={keyword}
            onChange={handleKeywordChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
            // Replaced Tailwind classes with custom CSS classes "search-input", "error", "loading"
            className={`search-input ${
              error ? "error" : loading ? "loading" : ""
            }`}
          />
          <div className="button-group">
            <button
              type="submit"
              disabled={loading || !keyword.trim()}
              className="search-button" // Used custom CSS class "search-button"
            >
              {loading ? (
                <>
                  <div className="loading-spinner-small"></div>{" "}
                  {/* Used custom CSS class for spinner */}
                  Searching...
                </>
              ) : (
                <>🔍 Search</>
              )}
            </button>
            {(keyword || results || error) && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-button" // Used custom CSS class "clear-button"
                disabled={loading}
              >
                🗑️ Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="content-area">
        {" "}
        {/* Used custom CSS class "content-area" */}
        {loading && (
          <div className="loading-container">
            {" "}
            {/* Used custom CSS class "loading-container" */}
            <div className="loading-spinner"></div>{" "}
            {/* Used custom CSS class "loading-spinner" */}
            <p>
              Searching for "
              <span className="keyword-highlight">{keyword}</span>"...{" "}
              {/* Used custom CSS class "keyword-highlight" */}
            </p>
            <p className="loading-subtext">This may take a few seconds</p>{" "}
            {/* Used custom CSS class "loading-subtext" */}
          </div>
        )}
        {error && (
          <div className="error-container">
            {" "}
            {/* Used custom CSS class "error-container" */}
            <div className="error-icon">❌</div>{" "}
            {/* Used custom CSS class "error-icon" */}
            <h3>Oops! Something went wrong</h3>
            <p className="error-message">{error}</p>{" "}
            {/* Used custom CSS class "error-message" */}
            <button onClick={clearSearch}>Try Again</button>
          </div>
        )}
        {results && <Results results={results} />}
      </div>
    </div>
  );
}
