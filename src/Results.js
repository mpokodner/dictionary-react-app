import React from "react";
import "./Results.css";

function Results({ results }) {
  if (!results) return null;

  //tried to group by part of speech
  const groupedMeanings = results.meanings.reduce((acc, meaning) => {
    if (!acc[meaning.partOfSpeech]) {
      acc[meaning.partOfSpeech] = [];
    }
    acc[meaning.partOfSpeech].push(meaning);
    return acc;
  }, {});

  return (
    <div className="container my-4">
      <div className="results-wrapper p-4 rounded">
        <h2 className="text-dark-gray text-capitalize mb-4">{results.word} </h2>

        {results.phonetic && (
          <p className="text-soft-gray mb-4">
            <strong>Pronunciation: </strong> {results.phonetic}
          </p>
        )}

        {Object.entries(groupedMeanings).map(
          ([partOfSpeech, meanings], idx) => (
            <div key={idx} className="mb-4">
              <h4 className="text-dark-gray mb-3 text-capitalize">
                {partOfSpeech}
              </h4>
              <div className="row g-3">
                {meanings.map((meaning, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 bg-subtle-beige border-0 shadow-sm">
                      <div className="card-body">
                        <p className="card-text text-dark-gray mb-2">
                          <strong>Definition: </strong> {meaning.definition}
                        </p>
                        {meaning.example && (
                          <p className="text-soft-gray fst-italic mb-2">
                            Example: "{meaning.example}"
                          </p>
                        )}

                        {meaning.synonyms?.length > 0 && (
                          <p className="text-soft-gray">
                            <strong>Synonyms:</strong>{" "}
                            {meaning.synonyms.join(", ")}
                          </p>
                        )}

                        {meaning.antonyms?.length > 0 && (
                          <p className="text-soft-gray">
                            <strong>Antonyms:</strong>{" "}
                            {meaning.antonyms.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Results;
