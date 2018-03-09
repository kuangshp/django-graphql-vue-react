import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Index from './views/index';
import AddBook from './views/add-book';
import AddAuthor from './views/add-author';
import AddCategory from './views/add-category';
import UpdateBook from './views/update-book';

// Pass your GraphQL endpoint to uri
const apolloClient = new ApolloClient({ uri: 'http://localhost:8000/graphql/' });
const RouterStack = () => (
  <Switch>
    <Route exact path='/' component={Index} />
    <Route path='/add' component={AddBook} />
    <Route path='/add_author' component={AddAuthor} />
    <Route path='/add_category' component={AddCategory} />
    <Route path='/update_book/:id' component={UpdateBook} />
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

export default ClientRender();
registerServiceWorker();
