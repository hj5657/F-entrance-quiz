import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStudents: [],
      studentList: {},
      isShow: false,
      preNum: 0,
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
      });
  };

  handleDivide = () => {
    fetch('http://localhost:8080/studentList', { method: 'GET', mode: 'cors' })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          studentList: json,
          isShow: true,
        });
      });
  };

  handleShow = (num) => {
    const { preNum } = this.state;
    const { students } = this.state.studentList;
    const items = [];
    for (let i = 0; i < num; i += 1) {
      items.push(
        <div className="item" key={preNum + i}>{`${students[preNum + i].id} ${
          students[preNum + i].name
        }`}</div>
      );
    }
    // this.setState({
    //   preNum: preNum + num,
    // });
    return items;
  };

  render() {
    const { formatter } = this.state.studentList;
    return (
      <div data-testid="app" className="App">
        <div className="divide-list">
          <h3>分组列表</h3>
          <button
            type="button"
            className="divide-btn"
            name="divide-btn"
            value="分组学员"
            onClick={this.handleDivide}
          >
            分组学员
          </button>
          {this.state.isShow &&
            formatter.map((num, index) => {
              return (
                <div key={index}>
                  <div>{`${index + 1} 组`}</div>
                  <div>{this.handleShow(num)}</div>
                </div>
              );
            })}
        </div>
        <div className="student-list">
          <h3>学员列表</h3>
          {this.state.allStudents.map((item, index) => {
            return <div className="item" key={index}>{`${item.id} ${item.name}`}</div>;
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
