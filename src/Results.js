import React from "react";
import Definition from "./Definition";

function Results({ results }) {
  if (!results) return null;

  const { word, phonetic, meanings = [] } = results;

  // Group meanings by part of speech
  const groupedMeanings = meanings.reduce((acc, meaning, index) => {
    const pos = meaning.partOfSpeech || "other";
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push({ ...meaning, originalIndex: index });
    return acc;
  }, {});

  // Define order for parts of speech
  const partOfSpeechOrder = [
    "noun",
    "verb",
    "adjective",
    "adverb",
    "preposition",
    "conjunction",
    "interjection",
    "other",
  ];

  // Sort parts of speech
  const sortedPOS = Object.keys(groupedMeanings).sort((a, b) => {
    const indexA = partOfSpeechOrder.indexOf(a);
    const indexB = partOfSpeechOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="results-container">
      <header className="word-header">
        <h2 className="word-title">{word}</h2>
        {phonetic && <span className="phonetic">/{phonetic}/</span>}
      </header>

      <section className="definitions-container">
        {sortedPOS.map((pos) => (
          <section key={pos} className="pos-section">
            <h3 className="pos-header">
              <span className="pos-badge">{pos}</span>
            </h3>
            <ul className="definitions-grid">
              {groupedMeanings[pos].map((meaning) => (
                <li key={`${pos}-${meaning.originalIndex}`}>
                  <Definition meaning={meaning} index={meaning.originalIndex} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </div>
  );
}

export default Results;
