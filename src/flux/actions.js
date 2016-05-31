import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

/* Action Types */
export const EXAMPLE_ACTION = 'EXAMPLE_ACTION'
export const OPEN_NAV_MENU = 'OPEN_NAV_MENU'
export const CLOSE_NAV_MENU = 'CLOSE_NAV_MENU'
export const ASYNC_ACTION_REQUEST = 'ASYNC_ACTION_REQUEST'
export const ASYNC_ACTION_FAILURE = 'ASYNC_ACTION_FAILURE'
export const ASYNC_ACTION_SUCCESS = 'ASYNC_ACTION_SUCCESS'


/* Action Creators */
export function exampleAction() {
  return { type: EXAMPLE_ACTION }
}

/** Nav Menus **/
export function openNavMenu() {
  return { type: OPEN_NAV_MENU }
}
export function closeNavMenu() {
  return { type: CLOSE_NAV_MENU }
}

export function getSomeAsyncData() {
  return (dispatch,getState) => {
    dispatch(loadAysncRequest())
    return fetch('http://urltofetchfrom.com')
      .then(res => res.json())
      .then(json => dispatch(loadAsyncSuccess(json)))
  }
}

function loadAysncRequest() {
  return { type: ASYNC_ACTION_REQUEST }
}

function loadSocialFailure() {
  return { type: LOAD_SOCIAL_FAILURE, error: "Couldn't connect to API" }
}
function loadAsyncSuccess(json) {
  return { type: LOAD_SOCIAL_SUCCESS, results: json }
}
