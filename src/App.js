import logo from './logo.svg';
import './App.less';

// import Survey from './survey'
import { Link } from 'react-router-dom'

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link className="App-link" to="/survey" >Show Survey</Link>
        </header>
      </div>
  );
}

export default App;
