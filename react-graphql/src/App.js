import React, { Component } from 'react';
import './App.css';
import Test1 from './test1';
import Test2 from './test2';
import Test3 from './test3';
import Test4 from './test4';
import Test5 from './test5';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>主页</h2>
        <Test1 />
        <Test2 />
        <Test3 />
        <Test4 />
        <Test5 />
      </div>
    );
  }
}

export default App;
