import "./App.css";
import LanguageSelect from "./components/LanguageSelect";
import Typeahead from "./components/Typeahead";

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <LanguageSelect />
      </nav>
      <header className="App-header">
        <h1>Typeahead Demo</h1>
      </header>
      <main className="App-main">
        <Typeahead placeholder="Search user name" />
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
