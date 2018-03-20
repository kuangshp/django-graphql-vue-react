import React, { Component } from 'react';

export default class Login extends Component {
  login() {
    window.sessionStorage.setItem('userId', '123');
    this.props.history.push('/');
  }
  render() {
    return (
      <React.Fragment>
        <div className="row" style={{marginTop: 50}}>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form>
              <div className="form-group">
                <label htmlFor="username">用户名</label>
                <input type="text" className="form-control" id="username" placeholder="请输入用户名"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">密码</label>
                <input type="password" className="form-control" id="password" placeholder="请输入密码"/>
              </div>
              <button type="button" className="btn btn-default" onClick={() => this.login()}>登陆</button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </React.Fragment>
    )
  }
}
