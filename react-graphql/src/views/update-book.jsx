import React, { Component } from 'react'
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      postData: {
        book: '',
        price: '',
        category: '',
        author: ''
      },
      allAuthor: [],
      allCategory: []
    };
  }
  componentDidMount() {
    // 获取url上面的参数
    const { match: { params: { id } } } = this.props;
    // 查询全部的分类及作者
    const querySQL = gql`
      query book($id: Int!) {
        book(id: $id) {
          id,
          name,
          price,
          category{
            id,
            name
          },
          author{
            id,
            name
          }
        }
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
    this.props.client.query({ query: querySQL, variables: { id: id } }).then(({ data: { book, allAuthor, allCategory } }) => {
      this.setState({ id: id, allAuthor: allAuthor, allCategory: allCategory, postData: Object.assign(this.state.postData, { book: book.name, price: book.price, category: book.category.id, author: book.author.id }) });
    });
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
  // 提交数据
  subForm() {
    const mutationSQL = gql`
      mutation updateBook($id: Int!, $name: String!, $price: Float, $category: Int!, $author: Int!) {
        updateBook(id: $id, bookData: {name: $name, price: $price, category: $category, author: $author}){
          status
        }
      }
    `;
    const { id, postData: { book, price, author, category } } = this.state;
    this.props.client.mutate({ mutation: mutationSQL, variables: { id: id, name: book, price: price, category: category, author: author } }).then(({ data: { updateBook: { status } } }) => {
      if (status === 200) {
        // 回到首页
        this.props.history.push('/');
      }
    });
  }
  render() {
    const { allAuthor, allCategory, postData } = this.state;
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
                  allCategory.map((item, index) => {
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
                  allAuthor.map((item, index) => {
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


export default withApollo(UpdateBook);