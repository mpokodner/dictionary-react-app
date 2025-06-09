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

  if (!results || !results.meanings || results.meanings.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {results.word || keyword}
      </h3>

      {results.phonetic && (
        <p className="text-gray-600 mb-4 text-lg">
          <span className="font-medium">Pronunciation:</span> {results.phonetic}
        </p>
      )}

      <div className="space-y-4">
        {results.meanings.slice(0, 5).map((meaning, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2 capitalize">
              {meaning.partOfSpeech}
            </h4>

            <p className="text-gray-700 mb-1">
              <span className="font-medium">{index + 1}.</span>{" "}
              {meaning.definition}
            </p>

            {meaning.example && (
              <p className="text-gray-600 italic text-sm ml-4">
                Example: "{meaning.example}"
              </p>
            )}

            {meaning.synonyms && meaning.synonyms.length > 0 && (
              <p className="text-gray-600 mt-2 text-sm">
                <span className="font-medium">Synonyms:</span>{" "}
                {meaning.synonyms.slice(0, 5).join(", ")}
              </p>
            )}

            {meaning.antonyms && meaning.antonyms.length > 0 && (
              <p className="text-gray-600 mt-1 text-sm">
                <span className="font-medium">Antonyms:</span>{" "}
                {meaning.antonyms.slice(0, 5).join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
