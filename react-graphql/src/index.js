import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
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
registerServiceWorker();
