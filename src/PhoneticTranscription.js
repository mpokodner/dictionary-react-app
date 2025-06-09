import React from "react";

export default function PhoneticTranscription(props) {
  return (
    <div className="PhoneticTrasncription">
      <a href={props.phonetic.audio} target="_blank" rel="noreferrer">
        Listen
      </a>
      <span className="text">{props.phonetic.text}</span>
    </div>
  );
}
