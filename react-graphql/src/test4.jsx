import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
class Test4 extends Component {
  render() {
    console.log('test4数据==>', this.props.data.book);
    return (
      <div>
        <h1>Test4</h1>
      </div>
    )
  }
}

export default graphql(gql`
  query book($id: Int!) {
    book(id: $id) {
      name,
      price,
      category {
        id,
        name
      },
      createAt,
      updateAt
    }
  }
`, { options: {variables: { id: 1 } }})(Test4);