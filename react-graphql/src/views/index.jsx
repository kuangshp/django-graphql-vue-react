import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
// 引入时间格式化插件
import moment from 'moment';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
  }
  componentDidMount() {
    const querySQL = gql`
      query {
        allBook{
          id,
          name,
          price,
          category{
            id,
            name,
            createAt,
            updateAt
          },
          author{
            id,
            name,
            createAt,
            updateAt
          },
          createAt
          updateAt
        }
      }
    `;
    this.props.client.query({ query: querySQL }).then(({ data: { allBook } }) => {
      console.log('allBook==>', allBook);
      this.setState({ bookList: allBook });
    });
  }
  edit(id) {
    console.log('id', id);
  }
  del(id) {
    const mutationSQL = gql`
      mutation delBook($id: Int!){
        delBook(id: $id){
          status
        }
      }
    `;
    this.props.client.mutate({ mutation: mutationSQL, variables: { id: id } }).then(({ data: { delBook: { status } } }) => {
      if (status === 200) {
        alert('删除成功');
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 60);
      }
    });
  }
  render() {
    const { bookList } = this.state;
    return (
      <div className="container">
        <Link to="/add" className="btn btn-info" style={{ marginRight: 20, marginTop: 20, marginBottom: 20 }}>新增图书</Link>
        <Link to="/add_author" className="btn btn-info" style={{ marginRight: 20, marginTop: 20, marginBottom: 20 }}>新增作者</Link>
        <Link to="/add_category" className="btn btn-info" style={{ marginRight: 20, marginTop: 20, marginBottom: 20 }}>新增分类</Link>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>书名</th>
              <th>价格</th>
              <th>分类</th>
              <th>作者</th>
              <th>创建时间</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              bookList.map((item, index) => {
                return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.author.name}</td>
                  <td>{item.category.name}</td>
                  <td>{moment(item.createAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>{moment(item.updateAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>
                    <Link to={`/update_book/${item.id}`} className="btn btn-info" style={{ marginRight: 5 }}>修改</Link>
                    <input className="btn btn-danger" type="button" value="删除" onClick={() => this.del(item.id)} />
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}


export default withApollo(Index);