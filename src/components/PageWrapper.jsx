import React from 'react'
import Helmet from 'react-helmet'
import Footer from './Footer'

// Fix this and remove Helmet and Doc title. Move to Individual pages and child components

export default class PageWrapper extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="page-inner">
          {this.props.children}
          <Footer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Sometims we do DOM related thigs here for every page
  }
}