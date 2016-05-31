import React from 'react'
import { IndexLink, Link } from 'react-router'
import { closeNavMenu } from '../flux/actions'
import { connect } from 'react-redux'
import gaEvents from './gaEvents'

class NavMenuBase extends React.Component {

  render() {
    const props = this.props
    
    return (
      <div className="site-nav-menu">
        <div className="site-nav-inner">
          <a href="#" className="close-nav" onClick={(event) => { event.preventDefault(); props.closeNavMenu() }}>&times;</a>
          <ul className="nav-links">
            <li><IndexLink to="/" className="site-link" activeClassName="active" onClick={this.navClick.bind(this)}><span>Home</span></IndexLink></li>
            <li><Link to="/two" className="site-link" activeClassName="active" onClick={this.navClick.bind(this)}><span>Page Two</span></Link></li>
          </ul>
        </div>
      </div>
    )
  }

  navClick() {
    // close menu
    this.props.closeNavMenu()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeNavMenu: () => { dispatch(closeNavMenu()) }
  }
}

const NavMenu = connect(null,mapDispatchToProps)(NavMenuBase)

export default NavMenu
