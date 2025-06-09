import React from "react";
import Phonetic from "./PhoneticTranscription";
import Meaning from "./Meaning";

export default function Results(props) {
  console.log(props);
  const { results } = props;

  if (!results) {
    return null; // Early return if there are no results
  }

  return (
    <div className="Results">
      <section>
        <h2>{results.word}</h2>
        {results.phonetics.map((phonetic, index) => (
          <div key={index}>
            <Phonetic phonetic={phonetic} />
          </div>
        ))}
      </section>
      {results.meanings.map((meaning, index) => (
        <section key={index}>
          <Meaning meaning={meaning} />
        </section>
      ))}
    </div>
  );
}
