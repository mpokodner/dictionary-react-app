import React, { useState } from "react";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");
  function search(event) {
    event.preventDefault();
    alert(`Searching for ${keyword} definition.`);
  }

  function handleKeywordChange(event) {
    console.log(event.target.value);
    setKeyword(event.target.value);
  }
  return (
    <div className="Dictionary">
      <h1>Hello from Dictionary</h1>
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="Type a word"
          autoFocus={true}
          onChange={handleKeywordChange}
        />
      </form>
    </div>
  );
}
