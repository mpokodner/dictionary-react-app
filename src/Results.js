// Results Component - displays the search results
import React from "react";
import Definition from "./Definition";

function Results({ results }) {
  if (!results) return null;

  const { word, phonetic, meanings } = results;

  // Group meanings by part of speech for better organization
  const groupedMeanings = meanings.reduce((acc, meaning, index) => {
    const pos = meaning.partOfSpeech;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    // Store original index for consistent numbering in Definition component
    acc[pos].push({ ...meaning, originalIndex: index });
    return acc;
  }, {});

  // Define a consistent order for parts of speech
  const partOfSpeechOrder = [
    "noun",
    "verb",
    "adjective",
    "adverb",
    "preposition",
    "conjunction",
    "interjection",
    // Add other parts of speech if needed, or they'll be sorted alphabetically
  ];

  // Sort parts of speech based on the predefined order, then alphabetically for unknown ones
  const sortedPOS = Object.keys(groupedMeanings).sort((a, b) => {
    const indexA = partOfSpeechOrder.indexOf(a);
    const indexB = partOfSpeechOrder.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b); // Both not in predefined order, sort alphabetically
    }
    if (indexA === -1) {
      return 1; // 'a' is not in predefined order, put it after 'b'
    }
    if (indexB === -1) {
      return -1; // 'b' is not in predefined order, put it after 'a'
    }
    return indexA - indexB; // Both in predefined order, sort by their index
  });

  return (
    <div className="show-results bg-gray-50 rounded-xl p-6 border border-gray-200 mt-6 shadow-md">
      <div className="word-header flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-300 flex-wrap gap-4">
        <div className="word-info flex items-center gap-4">
          <h2 className="word-title text-3xl font-bold text-gray-800 m-0">
            {word}
          </h2>
          {phonetic && (
            <span className="phonetic text-gray-600 italic text-lg bg-gray-100 px-3 py-1 rounded">
              /{phonetic}/
            </span>
          )}
        </div>
        <div className="definitions-count text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
          {meanings.length} definition{meanings.length !== 1 ? "s" : ""}
        </div>
      </div>

      {meanings.length > 0 ? (
        <div className="meanings-container">
          {/* Show all definitions in order */}
          <div className="all-definitions">
            <h3 className="section-title text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span className="bg-blue-500 w-1 h-6 rounded"></span>
              All Definitions
            </h3>
            <div className="definitions-list space-y-3">
              {meanings.map((meaning, index) => (
                // Using a more robust key if available, otherwise index is fallback
                <Definition
                  key={`${word}-${index}`}
                  meaning={meaning}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Show grouped by part of speech only if there's more than one distinct part of speech */}
          {Object.keys(groupedMeanings).length > 1 && (
            <div className="grouped-definitions mt-8 pt-6 border-t border-gray-200">
              <h3 className="section-title text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span className="bg-green-500 w-1 h-6 rounded"></span>
                By Part of Speech
              </h3>
              {sortedPOS.map((pos) => (
                <div key={pos} className="pos-group mb-6 last:mb-0">
                  <h4 className="pos-title text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <span className="pos-badge bg-green-100 text-green-800 px-3 py-1 rounded-full capitalize">
                      {pos}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({groupedMeanings[pos].length} definition
                      {groupedMeanings[pos].length !== 1 ? "s" : ""})
                    </span>
                  </h4>
                  <div className="pos-definitions space-y-3">
                    {groupedMeanings[pos].map((meaning) => (
                      <Definition
                        key={`${pos}-${meaning.originalIndex}`} // More specific key for grouped definitions
                        meaning={meaning}
                        index={meaning.originalIndex}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="no-meanings text-gray-500 italic text-center py-8">
          No meanings found for this word.
        </p>
      )}
    </div>
  );
}

export default Results;
