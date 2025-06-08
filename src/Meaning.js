import React from "react";
// Note: All styles are handled by Dictionary.css - no separate CSS import needed

function Meaning(props) {
  console.log(props.meaning);

  return (
    <div className="Meaning">
      <h3>{props.meaning.partOfSpeech}</h3>
      <div className="definitions-grid">
        {props.meaning.definitions.map((definition, index) => {
          return (
            <div key={index}>
              <p>
                {definition.definition}
                <br />
                <em>{definition.example}</em>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Meaning;
