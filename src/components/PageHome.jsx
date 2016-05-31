import React from 'react'
import PageWrapper from './PageWrapper'
import Helmet from 'react-helmet'

export default class PageHome extends React.Component {

  render() {
    const title = "Page Title"
    const description = "Page Description"
    return (
      <PageWrapper allFootnotes={true}>
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
        <div className="page homepage">
          <div>
            <h1>Example Website Homepage</h1>
          </div>
        </div>
      </PageWrapper>
    )
  }
}
