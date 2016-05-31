import React from 'react'
import {Route,IndexRoute} from 'react-router'
import ExampleApp from './ExampleApp'
import PageHome from './PageHome'
import PageTwo from './PageTwo'

export default [
  <Route key="root-route" path="/" component={ExampleApp}>
    <IndexRoute component={PageHome} />
    <Route path="/two" component={PageTwo} />
  </Route>
];
