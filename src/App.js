import React from 'react';
import logo from './logo.svg';
import './App.css';

<<<<<<< Updated upstream
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <Route exact path="/submit" component={Submissions} />
          <Route
            exact
            path="/"
            component={() => {
              return (
                <React.Fragment>
                  <Hero />
                  <hr></hr>
                  <SubmissionForm />
                  <hr></hr>


                </React.Fragment>
              );
            }}
          />
        </Router>
      </div>
    );
  }
>>>>>>> Stashed changes
}

export default App;
