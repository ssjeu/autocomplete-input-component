import React from "react";
import "./App.css";
import InputBox from "./components/InputBox";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typeahead Demo</h1>
      </header>
      <main>
        <InputBox placeholder="Search user name" />
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
