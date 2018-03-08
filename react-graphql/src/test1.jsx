import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
class Test1 extends Component {
  componentDidMount() {
    const searchLoans = gql`
      query allAuthor{
        allAuthor{
          id,
          name,
          createAt,
          updateAt
        }
      }
    `;
    this.props.client.query({ query: searchLoans }).then(({ data: { allAuthor } }) => {
      console.log('test1数据==>', allAuthor);
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Test1</h1>
      </div>
    )
  }
}


export default withApollo(Test1)