import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Test2 = ({ data: {allAuthor} }) => {
  console.log('test2数据==>', allAuthor);
  return (
    <div>Test2</div>
  )
}

// We use the gql tag to parse our query string into a query document
export default graphql(gql`
  query allAuthor{
    allAuthor{
      id,
      name,
      createAt,
      updateAt
    }
  }
`)(Test2);