import React from 'react'
import PageWrapper from './PageWrapper'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

export default class PageTwo extends React.Component {
  render() {
    const title = "Page 2"
    const description = "Page 2 description"
    return (
      <PageWrapper>
        <Helmet 
          title={title}
          meta={[
            {name:'description',content:description},
            {property: 'og:title', content:title},
            {property: 'og:description', content:description},
            {property: 'twitter:title', content:title},
            {property: 'twitter:description', content:description}
          ]}
        />
        <div className="page pagetwo">
          <div>
            <h1>Page Two</h1>
          </div>
        </div>
      </PageWrapper>
    )
  }
}
