import logo from './sbr-logo.png';
import KeyUpload from './upload/KeyUpload.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <KeyUpload />
        <a className="App-link" href="https://sbr-mx.com" target="_blank" rel="noopener noreferrer">
          Ir a página de inicio
        </a>
      </header>
    </div>
  );
}

export default App;
