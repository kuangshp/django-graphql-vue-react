import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Index from './views/index';
import AddBook from './views/add-book';
import AddAuthor from './views/add-author';
import AddCategory from './views/add-category';
import UpdateBook from './views/update-book';
import Login from './views/login';

// Pass your GraphQL endpoint to uri
const apolloClient = new ApolloClient({ uri: 'http://localhost:8000/graphql/' });

// let Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;
const RouterStack = () => (
  <Switch>
    <Route exact path='/' component={props => requireAuth(Index, props)} />
    <Route path='/login' component={Login}/>
    <Route path='/add' component={props => requireAuth(AddBook, props)} />
    <Route path='/add_author' component={props => requireAuth(AddAuthor, props)} />
    <Route path='/add_category' component={props => requireAuth(AddCategory, props)} />
    <Route path='/update_book/:id' component={props => requireAuth(UpdateBook, props)} />
  </Switch>
)
const ClientRender = () => {
  let appComponent = (
    <Router basename="/">
      <ApolloProvider client={apolloClient}>
        <RouterStack />
      </ApolloProvider>
    </Router>
  )
  ReactDOM.render(appComponent, document.getElementById('root'));
};



function requireAuth(Layout, props) {
  if (!window.sessionStorage.getItem('userId')) { // 未登录
    return <Redirect to="/login" />;
  } else {
    return <Layout {...props} />
  }
}
export default ClientRender();
registerServiceWorker();
