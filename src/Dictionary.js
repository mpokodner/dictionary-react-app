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
  // Memoized with useCallback as it doesn't depend on external state.
  const handleResponse = useCallback((response) => {
    // console.log("API Response:", response.data); // Keep for debugging if needed

    // Ensure the response has the expected structure (word and meanings array)
    if (
      response.data &&
      response.data.word &&
      Array.isArray(response.data.meanings)
    ) {
      setResults(response.data);
      setError(null); // Clear any previous errors
    } else {
      // If data is missing or malformed, inform the user
      setResults(null);
      setError("No definition found for this word. Please try another word.");
    }
    setLoading(false);
  }, []); // Empty dependency array means this function is created once

  // handleError: Manages displaying various API and network errors to the user.
  // Memoized with useCallback as it doesn't depend on external state.
  const handleError = useCallback((err) => {
    console.error("API Error:", err); // Log the full error for debugging
    setResults(null); // Clear previous results to only show the error message

    let errorMessage = "An unexpected error occurred. Please try again.";

    // Check if the error object has a 'response' property (typical for HTTP errors)
    if (err.response) {
      switch (err.response.status) {
        case 404: // Not Found
          errorMessage =
            "Word not found. Please check your spelling and try again.";
          break;
        case 429: // Too Many Requests
          errorMessage =
            "You've made too many requests. Please wait a moment and try again.";
          break;
        case 401: // Unauthorized (API key issue)
          errorMessage = "API key error. Please verify your API configuration.";
          break;
        default: // Other server-side errors
          errorMessage = `Server error (${err.response.status}). Please try again later.`;
      }
    } else if (err.request) {
      // The request was made but no response was received (e.g., network down, CORS issue)
      errorMessage =
        "No response from the server. Please check your internet connection.";
    } else if (err.name === "TypeError" && err.message === "Failed to fetch") {
      // This often indicates a network issue or CORS on fetch API
      errorMessage =
        "Network error. Please check your internet connection and try again.";
    } else {
      // Any other error during request setup or unexpected issues
      errorMessage = `An error occurred: ${err.message}. Please try again.`;
    }

    // Always check navigator.onLine as a final network verification
    if (!navigator.onLine) {
      errorMessage = "You are offline. Please check your internet connection.";
    }

    setError(errorMessage);
    setLoading(false);
  }, []); // Empty dependency array

  // search: Initiates the API call based on the keyword.
  // Memoized with useCallback, depending on keyword, handleResponse, and handleError.
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

      setLoading(true); // Show loading spinner
      setError(null); // Clear previous errors
      setResults(null); // Clear previous results

      // It's highly recommended to store API keys in environment variables
      // e.g., process.env.REACT_APP_SHECODES_API_KEY for Create React App
      const apiKey = "207446fe5b843td6o246060ad31759ff";
      const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${encodeURIComponent(
        trimmedKeyword
      )}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          // If the HTTP status is not 2xx, parse the response body for more details
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
    <div className="dictionary-app">
      <div className="dictionary-header">
        <h1>📚 Dictionary</h1>
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
            className={`search-input ${
              error ? "error" : loading ? "loading" : ""
            }`}
          />
          <div className="button-group">
            <button
              type="submit"
              disabled={loading || !keyword.trim()}
              className="search-button"
            >
              {loading ? (
                <>
                  <div className="loading-spinner-small"></div>
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
                className="clear-button"
                disabled={loading}
              >
                🗑️ Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="content-area">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>
              Searching for "
              <span className="keyword-highlight">{keyword}</span>"...
            </p>
            <p className="loading-subtext">This may take a few seconds</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">❌</div>
            <h3>Oops! Something went wrong</h3>
            <p className="error-message">{error}</p>
            <button onClick={clearSearch}>Try Again</button>
          </div>
        )}

        {results && <Results results={results} />}
      </div>
    </div>
  );
}
