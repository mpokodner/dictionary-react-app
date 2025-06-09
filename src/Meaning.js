import React from "react";

function Meaning(props) {
  const { definition } = props;

  // Check if meaning exists before continuing
  if (!definition) {
    return <div className="Meaning">Meaning not available.</div>;
  }

  return (
    <div className="Meaning">
      <h3>{definition.partOfSpeech || "Part of Speech not available"}</h3>
      <div className="definitions-grid">
        {definition.definitions.map((definition) => (
          <div key={definition.id || definition.definition}>
            <div className="definition-item">{definition.definition}</div>
            <div className="definition-example">
              {definition.example || "No example available."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meaning;
