import React from 'react'
import SiteNav from './SiteNav'
import { connect } from 'react-redux'
import { openNavMenu } from '../flux/actions'

const HeaderBase = ({ openNavMenu }) => (
  <div className="header-wrapper">
    <div className="header container">
      <SiteNav />
      <a href="#" className="nav-menu-toggle" onClick={(event) => { event.preventDefault(); openNavMenu() }}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </a>
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => {
  return {
    openNavMenu: () => { dispatch(openNavMenu()) }
  }
}

const Header = connect(null,mapDispatchToProps)(HeaderBase)

export default Header
