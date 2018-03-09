import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {
        book: '',
        price: '',
        category: 1,
        author: 1
      },
      categoryList: [],
      authorList: []
    };
  }
  changeBook(event) {
    this.setState({ postData: Object.assign(this.state.postData, { book: event.target.value }) });
  }
  changePrice(event) {
    this.setState({ postData: Object.assign(this.state.postData, { price: event.target.value }) });
  }
  changeCategory(event) {
    this.setState({ postData: Object.assign(this.state.postData, { category: event.target.value }) });
  }
  changeAuthor(event) {
    this.setState({ postData: Object.assign(this.state.postData, { author: event.target.value }) });
  }
  // 提交数据到后台
  subForm() {
    const {book, price, category, author} = this.state.postData;
    const mutationSQL = gql`
      mutation createBook($name: String!, $price: Float, $category: Int!, $author: Int!){
        createBook(bookData: {name: $name, price: $price, category: $category, author: $author}){
          status
        }
      }
    `;
    this.props.client.mutate({ mutation: mutationSQL, variables: {name: book, price: price, category: category, author: author} }).then(({data: {createBook: { status }}}) => {
      if (status === 200) {
        // 回到首页
        this.props.history.push('/');
      }
    });
  }
  componentDidMount() {
    const querySQL = gql`
      query{
        allAuthor{
          id,
          name
        },
        allCategory{
          id,
          name
        }
      }
    `;
    this.props.client.query({ query: querySQL }).then(({ data: { allAuthor, allCategory } }) => {
      this.setState({ authorList: allAuthor, categoryList: allCategory });
    });
  }
  render() {
    const { postData, categoryList, authorList } = this.state;
    return (
      <div className="container">
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="book" className="col-sm-2 control-label">书籍</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="book" placeholder="请输入书名" value={postData.book} onChange={(event) => this.changeBook(event)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="col-sm-2 control-label">价格</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="price" placeholder="请输入价格" value={postData.price} onChange={(event) => this.changePrice(event)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category" className="col-sm-2 control-label">分类</label>
            <div className="col-sm-10">
              <select className="form-control" value={postData.category} onChange={(event) => this.changeCategory(event)}>
                {
                  categoryList.map((item, index) => {
                    return <option value={item.id} key={index}>{item.name}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="author" className="col-sm-2 control-label">作者</label>
            <div className="col-sm-10">
              <select className="form-control" value={postData.author} onChange={(event) => this.changeAuthor(event)}>
                {
                  authorList.map((item, index) => {
                    return <option value={item.id} key={index}>{item.name}</option>
                  })
                }
              </select>
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

export default withApollo(AddBook);
