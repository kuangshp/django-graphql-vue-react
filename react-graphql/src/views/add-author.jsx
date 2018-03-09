import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

class AddAuthor extends Component {
  subForm() {
    let author = ReactDOM.findDOMNode(this.refs['input']).value;
    if (author) {
      const mutationSQL = gql`
        mutation createAuthor($name: String!){
          createAuthor(name: $name) {
            status
          }
        }
      `;
      this.props.client.mutate({ mutation: mutationSQL, variables: {name: author} }).then(({data: {createAuthor: { status }}}) => {
        if (status === 200) {
          // 回到首页
          this.props.history.push('/');
        }
      });
    }
  }
  render() {
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="author" className="col-sm-2 control-label">作者</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="author" ref="input" placeholder="请输入作者"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="button" className="btn btn-default" onClick={() => this.subForm()}>提交</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withApollo(AddAuthor);