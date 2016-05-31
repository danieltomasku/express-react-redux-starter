import React from 'react'
import NavMenu from './NavMenu'
import { openNavMenu } from '../flux/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

class SiteNavBase extends React.Component {
  render() {
    return (
      <div className="nav-menu-wrapper">
        <ReactCSSTransitionGroup transitionName="nav-left" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.props.menuOpen === 'nav' ? (
            <NavMenu />
          ) : null}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navMenuOpen: state.navMenuOpen
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    openNavClick: () => { dispatch(openNavMenu()) }
  }
}

let SiteNav = connect(mapStateToProps,mapDispatchToProps)(SiteNavBase)
export default SiteNav

