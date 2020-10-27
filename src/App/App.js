import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  componentDidMount = () => {
    fetch('http://localhost:8080/students', { method: 'GET', mode: 'no-cors' }).then((res) => {
      console.log(res.json);
    });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        Hello World
      </div>
    );
  }
}

export default App;
