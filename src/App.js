import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header"></header>
        <main>
          <Dictionary defaultKeyword="sunset" />
        </main>
        <div class="alert alert-primary" role="alert">
          <p style={{ display: "none" }} className="d-block">
            Bootstrap is now successfully installed 😃
          </p>
          <p className="d-none">
            Bootstrap is not installed if you can see this 😢
          </p>
        </div>
        <footer className="text-center">Coded by Michelle Pokodner</footer>
      </div>
    </div>
  );
}

export default App;
