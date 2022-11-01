import "./App.css";
import React, { useState } from "react";
import { AutoDataType } from "./typings/db";
import { config } from "./config";
import LangSelect from "./components/LangSelect";
import Typeahead from "./components/Typeahead";

function App() {
  const [langState, setLangState] = useState(0);

  const lang = (lang: number) => {
    setLangState(lang);
  };

  return (
    <div className="App">
      <nav className="App-nav">
        <LangSelect lang={lang} />
      </nav>
      <header className="App-header">
        <h1>Typeahead Demo</h1>
      </header>
      <main className="App-main">
        {langState === 0 && (
          <Typeahead dataUrl={config.EN_URL} placeholder="Search user name" />
        )}
        {langState === 1 && (
          <Typeahead
            dataUrl={config.EN_URL}
            
            placeholder="영화 제목을 검색하세요"
          />
        )}
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
