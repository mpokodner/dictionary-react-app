import React from "react";

function Results({ results }) {
  if (!results) return null;

  return (
    <div className="container my-4">
      <div
        className="card border-0 shadow-sm"
        style={{ backgroundColor: "#f5f5dc" }}
      >
        <div className="card-body">
          <h3 className="card-title text-success text-capitalize mb-3">
            {results.word}
          </h3>

          {results.phonetic && (
            <p className="text-muted mb-4">
              <strong>Pronunciation:</strong> {results.phonetic}
            </p>
          )}

          {results.meanings &&
            results.meanings.map((meaning, idx) => (
              <div
                key={idx}
                className="mb-4 p-3 border-start border-3"
                style={{ borderColor: "#6c757d" }}
              >
                <h5 className="text-secondary text-capitalize mb-2">
                  {meaning.partOfSpeech}
                </h5>

                <p className="mb-2 text-dark">
                  <strong>Definition:</strong> {meaning.definition}
                </p>

                {meaning.example && (
                  <p className="fst-italic text-muted mb-2">
                    Example: "{meaning.example}"
                  </p>
                )}

                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <p className="text-muted mb-1">
                    <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                  </p>
                )}

                {meaning.antonyms && meaning.antonyms.length > 0 && (
                  <p className="text-muted">
                    <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
