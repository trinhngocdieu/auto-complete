import React, { Component } from 'react';
import './App.css';

import AutoComplete from './components/auto-complete';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      suggesstions: [
        "ActionScript",
        "AppleScript",
        "Apple Mac",
        "Apple iPhone",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme",
        "jsConf",
        "ReactJS"
      ]
    }
  }

  componentDidMount() {
    this._autoComplete.focusToInput();
  }

  render() {
    return (
      <div className="App">

        {/* App Header */}
        <header className="App-header">
          <h1 className="App-title">Auto-Complete Control - Trinh Ngoc Dieu</h1>
        </header>

        {/* App Main */}
        <div className="App-main">
          <p><strong>Please type something to show suggesstion:</strong></p>
          <AutoComplete ref={ e => this._autoComplete = e}
            data={this.state.suggesstions}
            placeholder="Type something"
            />
        </div>
      </div>
    );
  }
}

export default App;
