// Results Component - displays the search results
import React from "react";
import Definition from "./Definition"; // Assuming Definition.js exists and is correctly styled
import "./Dictionary.css"; // Make sure to import your CSS here too

export default function Results({ results }) {
  if (!results) return null;

  const { word, phonetic, meanings } = results;

  // Group meanings by part of speech for better organization
  const groupedMeanings = meanings.reduce((acc, meaning, index) => {
    const pos = meaning.partOfSpeech;
    if (!acc[pos]) {
      acc[pos] = [];
    }
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
  ];

  // Sort parts of speech based on the predefined order, then alphabetically for unknown ones
  const sortedPOS = Object.keys(groupedMeanings).sort((a, b) => {
    const indexA = partOfSpeechOrder.indexOf(a);
    const indexB = partOfSpeechOrder.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b);
    }
    if (indexA === -1) {
      return 1;
    }
    if (indexB === -1) {
      return -1;
    }
    return indexA - indexB;
  });

  return (
    <div className="show-results">
      <div className="word-header">
        <div className="word-info">
          <h2 className="word-title">{word}</h2>
          {phonetic && <span className="phonetic">/{phonetic}/</span>}
        </div>
        <div className="definitions-count">
          {meanings.length} definition{meanings.length !== 1 ? "s" : ""}
        </div>
      </div>

      {meanings.length > 0 ? (
        <div className="definitions-container">
          <div className="pos-section">
            <h3 className="pos-header">By Part of Speech</h3>
            <ul className="definitions-grid">
              {sortedPOS.map((pos) => (
                <li key={pos} className="pos-group">
                  <h4 className="pos-title">
                    <span className="pos-badge">{pos}</span>
                    <span className="text-sm text-gray-500">
                      ({groupedMeanings[pos].length} definition
                      {groupedMeanings[pos].length !== 1 ? "s" : ""})
                    </span>
                  </h4>
                  <div className="pos-definitions-list">
                    {groupedMeanings[pos].map((meaning) => (
                      <Definition
                        key={`${pos}-${meaning.originalIndex}`}
                        meaning={meaning}
                        index={meaning.originalIndex}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="no-meanings">No meanings found for this word.</p>
      )}
    </div>
  );
}
