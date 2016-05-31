import ga from 'react-ga'

const gaEvents = {
  localVariable: false,
  lastTimeout: false,
  startTime: false,


  /** Only call this once! **/
  setTime: function() {
    this.lastTimeout = Date.now()
    this.startTime = this.lastTimeout
    return this.lastTimeout
  },

  getTime: function() {
    if (!this.lastTimeout) {
      return 0
    } else {
      const now = Date.now()
      const diff = now - this.lastTimeout
      this.lastTimeout = now
      return diff
    }
  },

  totalTime: function() {
    if (this.startTime) {
      return Date.now() - this.startTime
    }
    return 0
  },

  /** Ga Event Helpers **/
  pageTime: function(url) {
    const timeOnPage = this.getTime()
    
    ga.timing({
      category: 'Site Engagement',
      variable: 'Page Time',
      label: url,
      value: timeOnPage
    })
  },

  outboundLink: function(event) {
    ga.event({
      category:'Outbound Link',
      action: 'click',
      label: event.target.href
    })
  },

}

export default gaEvents
