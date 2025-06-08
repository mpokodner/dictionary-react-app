// Definition Component - handles individual definition display
import React from "react";
import "./Definition.css";
function Definition({ meaning, index }) {
  const { definition, example, synonyms = [] } = meaning;

  return (
    <div className="definition-item">
      <div className="definition-text">
        {definition || "No definition available"}
      </div>
      {example && <div className="definition-example">{example}</div>}

      <div className="definition-image">
        {/* Placeholder for image - matching wireframe */}
        <div className="image-placeholder">
          <div className="diagonal-line-1"></div>
          <div className="diagonal-line-2"></div>
        </div>
      </div>

      {synonyms && synonyms.length > 0 && (
        <div className="synonyms-section">
          <span className="similar-label">Similar</span>
          <div className="synonyms-list">
            {synonyms.slice(0, 4).map((synonym) => (
              <span key={synonym} className="synonym-tag">
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
