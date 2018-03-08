import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
class Test3 extends Component {
  render() {
    console.log('test3数据==>', this.props.data.allAuthor);
    return (
      <div>
        <h1>Test3</h1>
      </div>
    )
  }
}


export default graphql(gql`
  query allAuthor{
    allAuthor{
      id,
      name,
      createAt,
      updateAt
    }
  }
`)(Test3);