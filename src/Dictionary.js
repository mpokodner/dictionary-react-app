import React, { useState, useCallback } from "react";
import Results from "./Results";
import "./Dictionary.css"; // Assuming this holds global styles or specific component styles

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
      // FIX: Correctly use encodeURIComponent for the keyword and remove the accidental newline
      const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${encodeURIComponent(
        trimmedKeyword
      )}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          // If the HTTP status is not 2xx, parse the response body for more details
          // and throw an error to be caught by the catch block.
          // Some APIs return JSON error messages, others might just have a status.
          const errorBody = await response.json().catch(() => ({})); // Attempt to parse JSON, gracefully handle if it fails
          throw new Error(
            errorBody.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        handleResponse({ data }); // Pass the fetched data to handleResponse
      } catch (err) {
        // Construct a simplified error object for handleError, mimicking axios's structure for consistency
        const simplifiedError = {
          response: err.message.includes("HTTP error! status:")
            ? { status: parseInt(err.message.split(": ")[1]) }
            : null,
          request: err.message.includes("Failed to fetch") || !navigator.onLine, // Basic check for network/fetch issues
          message: err.message,
          name: err.name,
        };
        handleError(simplifiedError);
      }
    },
    [keyword, handleResponse, handleError] // Dependencies for useCallback
  );

  // handleKeywordChange: Updates the keyword state and clears errors when user types.
  // Memoized with useCallback, depending on the current error state.
  const handleKeywordChange = useCallback(
    (event) => {
      setKeyword(event.target.value);
      if (error) {
        // Clear the error message as the user starts typing, assuming they are correcting.
        setError(null);
      }
    },
    [error] // Dependency on 'error' state
  );

  // clearSearch: Resets all states, effectively clearing the search interface.
  // Memoized with useCallback as it doesn't depend on external state.
  const clearSearch = useCallback(() => {
    setKeyword("");
    setResults(null);
    setError(null);
  }, []); // Empty dependency array

  // handleKeyPress: Triggers search when 'Enter' key is pressed in the input field.
  // Memoized with useCallback, depending on the 'search' function.
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        search(event);
      }
    },
    [search] // Dependency on 'search' function
  );

  return (
    <div className="dictionary-app max-w-6xl mx-auto p-5 font-sans bg-white shadow-lg rounded-xl my-10">
      <div className="dictionary-header text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Dictionary</h1>
        <p className="text-gray-600 text-lg m-0">
          Discover comprehensive word definitions, examples, and more
        </p>
      </div>

      <div className="search-section mb-8">
        <form
          onSubmit={search}
          className="search-container flex flex-col gap-4"
        >
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
            disabled={loading} // Disable input while loading
            className={`search-input w-full p-4 text-lg border-2 rounded-lg outline-none transition-all duration-300 ${
              error
                ? "border-red-500 bg-red-50" // Red border/background on error
                : loading
                ? "border-blue-300 bg-blue-50" // Blue border/background while loading
                : "border-gray-300 focus:border-blue-500 hover:border-gray-400" // Default/focus states
            }`}
          />
          <div className="button-group flex gap-3 justify-center flex-wrap">
            <button
              type="submit" // This button submits the form
              disabled={loading || !keyword.trim()} // Disable if loading or keyword is empty
              className="search-button px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>🔍 Search</>
              )}
            </button>
            {/* Show clear button only if there's something to clear */}
            {(keyword || results || error) && (
              <button
                type="button" // Important: Prevents this button from submitting the form
                onClick={clearSearch}
                className="clear-button px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 disabled:bg-gray-400 transition-all duration-300 hover:shadow-lg"
                disabled={loading} // Disable while loading
              >
                🗑️ Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="content-area min-h-[200px] flex flex-col items-center justify-center">
        {loading && (
          <div className="loading-container text-center py-12">
            <div className="loading-spinner w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Searching for "
              <span className="font-semibold text-blue-600">{keyword}</span>"...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This may take a few seconds
            </p>
          </div>
        )}

        {error && (
          <div className="error-container text-center py-8 px-6 bg-red-50 border-2 border-red-200 rounded-lg mt-5 w-full max-w-md">
            <div className="error-icon text-5xl mb-4">❌</div>
            <h3 className="text-red-800 font-semibold text-lg mb-2">
              Oops! Something went wrong
            </h3>
            <p className="error-message text-red-700 m-0 text-base leading-relaxed">
              {error}
            </p>
            <button
              onClick={clearSearch}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {results && <Results results={results} />}
      </div>
    </div>
  );
}
