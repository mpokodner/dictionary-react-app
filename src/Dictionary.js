import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState(" ");

  function handleResponse(response) {
    console.log(response.data);
  }
  function search(event) {
    event.preventDefault();
    alert(`Searching for ${keyword} definition.`);

    let apiKey = "207446fe5b843td6o246060ad31759ff";
    let apiUrl =
      "https://api.shecodes.io/dictionary/v1/define?word=${keyword}&key=${apiKey}";
    axios.get(apiUrl).then(handleResponse);
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
