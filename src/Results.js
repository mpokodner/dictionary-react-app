import React from "react";

function Results({ results }) {
  if (!results) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {results.word}
      </h3>

      {results.meanings &&
        results.meanings.map((meaning, idx) => (
          <div key={idx} className="mb-4">
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Definition:</span>{" "}
              {meaning.definitions[0]?.definition}
            </p>

            {meaning.definitions[0]?.example && (
              <p className="text-gray-600 italic text-sm">
                Example: "{meaning.definitions[0].example}"
              </p>
            )}

            {meaning.definitions[0]?.synonyms &&
              meaning.definitions[0].synonyms.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Synonyms:</span>{" "}
                  {meaning.definitions[0].synonyms.join(", ")}
                </p>
              )}

            {meaning.definitions[0]?.antonyms &&
              meaning.definitions[0].antonyms.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Antonyms:</span>{" "}
                  {meaning.definitions[0].antonyms.join(", ")}
                </p>
              )}
          </div>
        ))}
    </div>
  );
}

export default Results;
