import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStudents: [],
    };
  }

  componentDidMount = () => {
    fetch('http://localhost:8080/students', { method: 'GET', mode: 'cors' })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        this.setState({
          allStudents: json,
        });
        console.log(json);
      });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <div className="divide-list">
          <h3>分组列表</h3>
          <button type="button" className="divide-btn" name="divide-btn" value="分组学员">
            分组学员
          </button>
        </div>
        <div className="student-list">
          <h3>学员列表</h3>
          {this.state.allStudents.map((item) => {
            return <div className="item">{`${item.id} ${item.name}`}</div>;
          })}
          <button type="button" className="add-btn" name="add-btn" value="+添加学员">
            +添加学员
          </button>
        </div>
      </div>
    );
  }
}

export default App;
