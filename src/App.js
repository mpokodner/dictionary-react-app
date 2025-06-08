import "./App.css";
import Dictionary from "./Dictionary";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header d-flex align-center justify-left p-3">
          <img
            src={logo}
            className="img-fluid"
            style={{ height: "40px" }}
            alt="logo"
          />
        </header>
        <main>
          <Dictionary />
        </main>
        <footer className="text-center">Coded by Michelle Pokodner</footer>
      </div>
    </div>
  );
}

export default App;
