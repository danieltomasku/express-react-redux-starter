import React from 'react'
import { Link, IndexLink } from 'react-router'
import gaEvents from './gaEvents'

const Footer = ({allFootnotes}) => (
  <div className="footer">
    <div className="container">
      <h3>THE FOOTER</h3>
            
      <div className="row">
        <ul className="footer-links">
          <li><IndexLink to='/' className="footer-link">Home</IndexLink></li>
          <li><Link to='/two' className="footer-link">Page Two</Link></li>
        </ul>
      </div>

    </div>
  </div>
)

export default Footer
