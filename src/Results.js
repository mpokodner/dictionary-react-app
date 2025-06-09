import React from "react";

function Results({ results, loading, keyword }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="text-gray-600 mt-4">Loading definition...</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {keyword}
      </h3>

      <div className="border-l-4 border-blue-500 pl-4 space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Definition:</span>{" "}
          {results.definition}
        </p>

        {results.example && (
          <p className="text-gray-600 italic text-sm">
            Example: "{results.example}"
          </p>
        )}

        {results.partOfSpeech && (
          <p className="text-sm text-gray-500">
            <span className="font-medium">Part of Speech:</span>{" "}
            {results.partOfSpeech}
          </p>
        )}

        {results.synonyms && results.synonyms.length > 0 && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Synonyms:</span>{" "}
            {results.synonyms.join(", ")}
          </p>
        )}

        {results.antonyms && results.antonyms.length > 0 && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Antonyms:</span>{" "}
            {results.antonyms.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default Results;
