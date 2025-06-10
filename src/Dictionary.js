import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

function Dictionary({ defaultKeyword = "" }) {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleDictionaryResponse(response) {
    console.log(response.data);
    if (response.data && response.data.word) {
      setResults(response.data);
    } else {
      setResults(null);
      setError("No definition found for this word.");
    }
  }

  function handleError(error) {
    console.error("API Error:", error);
    setError("Sorry, something went wrong. Please try again.");
    setResults(null);
  }

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

  function handleSubmit(event) {
    event.preventDefault();
    search(keyword);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
    setError(null);
  }

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
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input
              type="search"
              value={keyword}
              onChange={handleKeywordChange}
              placeholder="Enter a word..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !keyword.trim()}
              className="btn btn-bold-green text-white"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
            {error}
          </div>
        )}
      </section>

      <Results results={results} />
    </div>
  );
}

export default Dictionary;
