import React from 'react'
import {Router,browserHistory} from 'react-router'
import routes from './routes'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import exampleApp from '../flux/reducers/exampleApp'
import ga from 'react-ga'
import AppConfig from '../data/AppConfig'
const gaTrackingId = AppConfig.env[(process.env.NODE_ENV || 'development')].gaTrackingId
import gaEvents from './gaEvents'

let store = createStore(exampleApp,applyMiddleware(thunkMiddleware))

export default class ExampleSite extends React.Component {

  componentDidMount() {
    this.props.wrapper.className = 'mounted';

    // Initialize google analytics
    ga.initialize(gaTrackingId)

    // Other site init here?
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={logPageView}>
          {routes}
        </Router>
      </Provider>
    )
  }
}

function logPageView(a,b,c) {
  // Remove baseUri from path
  const path = this.state.location.pathname
  ga.pageview(path)
}
