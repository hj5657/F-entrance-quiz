import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO GTB-工程实践: - 变量命名让人疑惑：studentList，allStudents？preNum和isShow没有存在的意义
      allStudents: [],
      studentList: {},
      isShow: false,
      preNum: 0,
    };
  }

  componentDidMount = () => {
    // TODO GTB-工程实践: - 建议把数据请求提取到单独的service
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

  // TODO GTB-工程实践: - 方法命名不清晰
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
  // TODO GTB-知识点: - 后端直接返回分好组的list就可以了，然后使用数组的map方法就可以了，eg: groupedStudents.map(student => StudentItem)
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
    // TODO GTB-工程实践: - 不要提交注释代码
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
                  {/* TODO GTB-知识点: - 组名应该由后端api返回*/}
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
// TODO GTB-工程实践: * 有小步提交，但提交信息不可读
// TODO GTB-工程实践: * 数据结构不是很清晰
// TODO GTB-知识点: - 没有划分组件，学员列表和分组列表很明显可以分成两个组件
