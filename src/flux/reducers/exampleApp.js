import * as actions from '../actions'
import { combineReducers } from 'redux'

/** Nav Menu **/
function navMenuOpen(state = false,action) {
  switch (action.type) {
    case actions.OPEN_NAV_MENU:
      return true;
      break;
    case actions.CLOSE_NAV_MENU:
      return false;
      break;
    default:
      return state;
      break;
  }
}

/** Example Reducer **/
function syncReducer(state = false,action) {
  switch (action.type) {
    case actions.EXAMPLE_ACTION:
      return 'example_state';
      break;
    default:
      return state;
      break;
  }
}

/** Async Reducer **/
function asyncReducer(state = {
  isFetching: false,
  fetchError: false,
  results: [],
},action) {
  switch (action.type) {
    case actions.ASYNC_ACTION_FETCH:
      return Object.assign({},state,{
        isFetching: true,
        fetchError: false
      })
      break
    case actions.ASYNC_ACTION_FAILURE:
      return Object.assign({},state,{
        isFetching: false,
        fetchError: action.error
      })
      break
    case actions.ASYNC_ACTION_SUCCESS:
      return Object.assign({},state,{
        isFetching: false,
        fetchError: false,
        results: state.results.concat(action.results),
      })
      break
    default:
      return state
  }
}

/** COMBINE! **/
const exampleApp = combineReducers({
  navMenuOpen,
  syncReducer,
  asyncReducer,
})

export default exampleApp
