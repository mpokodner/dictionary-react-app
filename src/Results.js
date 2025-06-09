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
        {results.word || keyword}
      </h3>

      {results.phonetic && (
        <p className="text-gray-600 mb-4 text-lg">
          <span className="font-medium">Pronunciation:</span> {results.phonetic}
        </p>
      )}

      {results.meanings && results.meanings.length > 0 && (
        <div className="space-y-4">
          {results.meanings.map((meaning, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2 capitalize">
                {meaning.partOfSpeech}
              </h4>

              {meaning.definitions && meaning.definitions.length > 0 && (
                <div className="space-y-2">
                  {meaning.definitions.slice(0, 3).map((def, defIndex) => (
                    <div key={defIndex}>
                      <p className="text-gray-700 mb-1">
                        <span className="font-medium">{defIndex + 1}.</span>{" "}
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="text-gray-600 italic text-sm ml-4">
                          Example: "{def.example}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium text-gray-700">Synonyms: </span>
                  <span className="text-gray-600">
                    {meaning.synonyms.slice(0, 5).join(", ")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {results.definition && !results.meanings && (
        <div className="border-l-4 border-blue-500 pl-4">
          <p className="text-gray-700">{results.definition}</p>
        </div>
      )}
    </div>
  );
}
export default Results;
