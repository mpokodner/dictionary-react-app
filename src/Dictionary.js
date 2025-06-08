// App.js
import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");

  function handleResponse(response) {
    console.log(response.data[0]);
  }

  function search(event) {
    event.preventDefault();

    const apiKey = "207446fe5b843td6o246060ad31759ff";
    const apiUrl = `https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}`;

    axios.get(apiUrl).then(handleResponse);
  }
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="dictionary-app">
      <div className="dictionary-header">
        <h1>Dictionary</h1>
        <p>Search for a word to see its definition</p>
      </div>

      <div className="search-section">
        <form className="search-container" onSubmit={search}>
          <input
            type="search"
            onChange={handleKeywordChange}
            placeholder="Type a word..."
          />
        </form>
      </div>
    </div>
  );
}
