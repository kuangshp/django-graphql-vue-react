import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();

// 按路由拆分代码
import Loadable from 'react-loadable';

const loadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
      return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
      return null;
  }
};

const Index = Loadable({
  loader: () => import('./Index'),
  loading: loadingComponent
});

const Home= Loadable({
  loader: () => import('./Home'),
  loading: loadingComponent
});

const Login= Loadable({
  loader: () => import('./Login'),
  loading: loadingComponent
});

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

// 登录验证
function requireAuth(Layout, props) {
  if (true) { // 未登录
    return <Redirect to="/login" />;
  } else {
    return <Layout {...props} />
  }
}

let Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;

const RouteConfig = (
    <Router history={history}>
        <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/home" component={props => requireAuth(Home, props)} />
            <Route path="/login" component={Login} />
            <Redirect from='' to="/" />
        </Switch>
    </Router>
);

export default RouteConfig;