import React from "react";

function Results({ results }) {
  if (!results) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {results.word}
      </h3>

      {results.phonetic && (
        <p className="text-gray-600 mb-4 text-lg">
          <span className="font-medium">Pronunciation:</span> {results.phonetic}
        </p>
      )}

      {results.meanings &&
        results.meanings.map((meaning, idx) => {
          const firstDef = meaning.definitions.definition[0];

          if (!firstDef) return null;

          return (
            <div key={idx} className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                {meaning.partOfSpeech}
              </h4>

              <p className="text-gray-700 mb-2">
                <span className="font-medium">Definition:</span>{" "}
                {firstDef.definition}
              </p>

              {firstDef.example && (
                <p className="text-gray-600 italic text-sm">
                  Example: "{firstDef.example}"
                </p>
              )}

              {firstDef.synonyms && firstDef.synonyms.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Synonyms:</span>{" "}
                  {firstDef.synonyms.join(", ")}
                </p>
              )}

              {firstDef.antonyms && firstDef.antonyms.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Antonyms:</span>{" "}
                  {firstDef.antonyms.join(", ")}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Results;
