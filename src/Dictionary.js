import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

function Dictionary(props) {
  const { defaultKeyword = "" } = props;
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle API response
  function handleDictionaryResponse(response) {
    console.log(response.data);
    if (response.data && response.data.length > 0) {
      setResults(response.data[0]);
    } else {
      setResults(null);
      setError("No definition found for this word.");
    }
  }

  // Handle API errors
  function handleError(error) {
    console.error("API Error:", error);
    setError("Sorry, something went wrong. Please try again.");
    setResults(null);
  }

  // Search function
  const search = React.useCallback(async (searchKeyword) => {
    if (!searchKeyword.trim()) {
      setError("Please enter a word to search.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const apiKey = "207446fe5b843td6o246060ad31759ff";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${searchKeyword}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      handleDictionaryResponse(response);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    search(keyword);
  }

  // Handle input change
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
    setError(null); // Clear error when user starts typing
  }

  // Search default keyword on mount
  useEffect(() => {
    if (defaultKeyword) {
      search(defaultKeyword);
    }
  }, [defaultKeyword, search]);

  return (
    <div className="max-w-2xl mx-auto">
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What word do you want to look up?
        </h2>
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="search"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="Enter a word..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !keyword.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}
      </section>

      <Results results={results} />
    </div>
  );
}

export default Dictionary;
