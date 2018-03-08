> 使用`apollo`[传送门](https://www.apollographql.com/)做关于`react`连接`graphql`的项目

### 一、项目搭建
* 1、使用`create-react-app`创建一个`react`项目
* 2、安装`react-graphql`的基础包

  ```javascript
  yarn add apollo-boost graphql react-apollo
  ```
  
* 3、在`package.json`中配置代理

  ```json
  {
    ...
    "proxy":"http://localhost:8000/"
  }
  ```

* 4、修改`react`项目的入口文件(把`client`传递到子组件中)

  ```javascript
  import ApolloClient from 'apollo-boost';
  import { ApolloProvider } from 'react-apollo';

  // Pass your GraphQL endpoint to uri
  const apolloClient = new ApolloClient({ uri: 'http://localhost:8000/graphql/' });

  const ClientRender = () => {
    let appComponent = (
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    )
    ReactDOM.render(appComponent, document.getElementById('root'));
  };

  export default ClientRender();
  ```

* 5、在组件中使用`query`查询语句(参考`test1.jsx`)
* 6、函数方式的组件可以参考`test2.jsx`(个人更习惯使用`class`构造组件的方式)
* 7、传递参数参考`test4.jsx`和`test5.jsx`