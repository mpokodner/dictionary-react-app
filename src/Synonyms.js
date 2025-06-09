import React from "react";

export default function Synonyms({ synonyms }) {
  if (!synonyms || synonyms.length === 0) {
    return null; // Short-circuit if no synonyms are available
  }

  return (
    <ul className="Synonyms">
      {synonyms.map((synonym, index) => (
        <li key={index}>{synonym}</li>
      ))}
    </ul>
  );
}
