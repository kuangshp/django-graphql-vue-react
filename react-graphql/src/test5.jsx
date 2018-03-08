import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';
class Test5 extends Component {
  componentDidMount() {
    const searchLoans = gql`
      query book($id: Int!) {
        book(id: $id) {
          name,
          price,
          category {
            name
          },
          createAt,
          updateAt
        }
      }
    `;
    this.props.client.query({ query: searchLoans, variables: { id: 1 } }).then(({ data: { book } }) => {
      console.log('test5数据==>', book);
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Test5</h1>
      </div>
    )
  }
}


export default withApollo(Test5)