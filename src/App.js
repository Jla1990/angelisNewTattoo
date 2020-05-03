import React, { Component } from "react";
import NavBar from "./homePage/navBar";
import Submissions from "./submissionsPage/submissions";
import Hero from "./homePage/hero";
import SubmissionForm from "./homePage/formsubmission";

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
}

export default App;
