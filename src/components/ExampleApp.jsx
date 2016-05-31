import React from 'react'
import { RouteHandler } from 'react-router'
import Header from './Header'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class ExampleApp extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="pagefade" transitionEnterTimeout={1000} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        <div key='site-wrapper' className="site-wrapper">
          <Header />
          <ReactCSSTransitionGroup transitionName="pagefade" transitionEnterTimeout={1000} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
            <div key={"page-transition-"+this.props.location.pathname}>
              {this.props.children}
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </ReactCSSTransitionGroup>
    )
  }

}