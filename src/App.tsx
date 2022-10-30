import React from "react";
import "./App.css";
import Typeahead from "./typeahead/Typeahead";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typeahead Demo</h1>
      </header>
      <main>
        <Typeahead placeholder="Search user name" />
        {/* <Typeahead placeholder="사용자 이름을 검색하세요" /> */}
      </main>
      <footer className="App-footer">
        <a
          className="App-link"
          href="https://github.com/ssjeu/autocomplete-input-component.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          project & docs on Github
        </a>
      </footer>
    </div>
  );
}

export default App;
