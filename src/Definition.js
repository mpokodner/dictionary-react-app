import React from "react";
// Note: All styles are handled by Dictionary.css - no separate CSS import needed

function Definition({ meaning, index }) {
  const { definition, example, synonyms = [] } = meaning;

  return (
    <div className="definition-item">
      <div className="definition-text">
        {definition || "No definition available"}
      </div>

      {example && <div className="definition-example">{example}</div>}

      {synonyms.length > 0 && (
        <div className="synonyms-container">
          <span className="synonyms-label">Similar words:</span>
          <div className="synonyms-list">
            {synonyms.slice(0, 6).map((synonym, idx) => (
              <span key={idx} className="synonym-tag">
                {synonym}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Definition;
