var express = require('express');
var router = express.Router();
import React from 'react'
import { RouterContext, match } from 'react-router'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import routes from '../components/routes'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import exampleApp from '../flux/reducers/exampleApp'
import thunkMiddleware from 'redux-thunk'

router.get('*', function(req, res, next) {
  // Build react app HTML
  match({routes,location:req.url},function(err,redirect,props) {
    // Check for matched route
    if (err === undefined && redirect === undefined && props === undefined) {
      // Send 404 error
      res.render('error', {
        message: 'This is not the page you are looking for...',
        error: {
          status: 404,
          stack: []
        }
      })
    } else {
      // Get React HTML
      let store = createStore(exampleApp,applyMiddleware(thunkMiddleware));
      var reactHTML = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );
      var head = Helmet.rewind();
      
      // Render page
      res.render('index', { 
        head: head,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        reactHTML: reactHTML,
      });
    }
  })
});

module.exports = router;
