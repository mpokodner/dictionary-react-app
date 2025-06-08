// Results.js
import React from "react";

export default function Results({ results }) {
  if (!results || !results.meanings || results.meanings.length === 0) {
    return <p>No definitions found.</p>;
  }

  return (
    <div className="results-container">
      <div className="word-header">
        <h2 className="word-title">{results.word}</h2>
        {results.phonetic && <div className="phonetic">{results.phonetic}</div>}
      </div>

      <div className="definitions-container">
        {results.meanings.map((meaning, index) => (
          <div className="pos-section" key={index}>
            <div className="pos-header">
              <span className="pos-badge">{meaning.partOfSpeech}</span>
            </div>
            <ul className="definitions-grid">
              {meaning.definitions.map((definition, i) => (
                <li key={i} className="definition-item">
                  <p className="definition-text">{definition.definition}</p>
                  {definition.example && (
                    <p className="definition-example">{definition.example}</p>
                  )}
                  {definition.synonyms && definition.synonyms.length > 0 && (
                    <div className="synonyms-container">
                      <span className="synonyms-label">Synonyms:</span>
                      <div className="synonyms-list">
                        {definition.synonyms.map((syn, sIndex) => (
                          <span className="synonym-tag" key={sIndex}>
                            {syn}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
