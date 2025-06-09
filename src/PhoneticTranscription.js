import React from "react";

export default function PhoneticTranscription({ phonetic }) {
  return (
    <div className="PhoneticTranscription">
      <a href={phonetic.audio} target="_blank" rel="noreferrer">
        Listen
      </a>
      <span className="text">{phonetic.text}</span>
    </div>
  );
}
