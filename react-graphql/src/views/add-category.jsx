import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

class AddCategory extends Component {
  subForm() {
    let category = ReactDOM.findDOMNode(this.refs['input']).value;
    if (category) {
      const mutationSQL = gql`
        mutation createCategory($name: String!){
          createCategory(name: $name){
            status
          }
        }
      `;
      this.props.client.mutate({ mutation: mutationSQL, variables: {name: category} }).then(({data: {createCategory: { status }}}) => {
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
            <label htmlFor="category" className="col-sm-2 control-label">分类</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="category" ref="input" placeholder="请输入分类"/>
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

export default withApollo(AddCategory);