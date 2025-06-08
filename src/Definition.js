// Definition Component - handles individual definition display
import React from "react";

function Definition({ meaning, index }) {
  // Destructure for cleaner access
  const { partOfSpeech, definition, example, synonyms } = meaning;

  return (
    <div className="definition-item bg-white p-4 rounded-lg border-l-4 border-blue-500 mb-3 shadow-sm">
      <div className="definition-header flex items-center gap-3 mb-2">
        <span className="definition-number bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
          {index + 1}
        </span>
        <span className="part-of-speech bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
          {partOfSpeech}
        </span>
      </div>

      <p className="definition-text text-gray-800 leading-relaxed mb-2 font-medium">
        {definition}
      </p>

      {example && (
        <p className="example-text text-gray-600 italic text-sm pl-4 border-l-2 border-gray-200 ml-2">
          <strong>Example:</strong> "{example}"
        </p>
      )}

      {/* Only render synonyms section if synonyms exist and there's at least one */}
      {synonyms && synonyms.length > 0 && (
        <div className="synonyms-section mt-3">
          <span className="label text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Synonyms:
          </span>
          <div className="synonyms-list flex flex-wrap gap-1 mt-1">
            {synonyms.map((synonym) => (
              <span
                key={synonym} // Use synonym itself as key if unique, otherwise use a combination
                className="synonym-tag bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs border border-blue-200"
              >
                {synonym}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Antonyms section removed as per request to only show synonyms */}
    </div>
  );
}

export default Definition;
