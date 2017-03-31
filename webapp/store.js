import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage'
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

//the store should be something like this:
//{authenticated:true/false, user:user, nodes:nodes}

 const userReducer = (state, action) => {
   switch (action.type) {
    case 'GET_USER_STATE':
      let p=action.payload;
      return {
        ...state,
        p
      }
    case 'LOGIN':
      return {
        ...action.payload,
        authenticated:true,
      }
    default:
      return state || {authenticated:false}
  }
}

const nodesReducer = (state, action) => {
  switch (action.type) {
  // GET_USER_STATE
  // action.payload.nodes=> nodes from server. replace all client state.
   case 'GET_USER_STATE':
      return action.payload.nodes
   case 'LOGIN':
      return [];
  // SET_STATUS
  // action.node=> uuid of the node
  // action.state=> new state for the node
   case 'SET_STATUS':
    return state.map(function(m){
      if(m.uuid==action.node){
        m.state=action.state
      }
      return m
    })
  // SET_SCHEDULE
  // action.node=> uuid of the node
  // action.schedule=> object from server of the schedule
  case 'SET_SCHEDULE':
   return state.map(function(m){
     if(m.uuid==action.node){
       m.schedules=m.schedules||[]
       m.schedules=[...m.schedules, action.schedule]
     }
     return m
   })
  //  REMOVE_SCHEDULE
  //  action.node=> uuid of node
  //  action.schedule=> uuid of schedule
   case 'REMOVE_SCHEDULE':
    return state.map(function(m){
      if(m.uuid==action.node){
        let s=m.schedules || []
        let schedule=s.find(function(s){
          return s.uuid==action.schedule
        })
        let index=s.indexOf(schedule)
        m.schedules=s.slice(0, index).concat(s.slice(index+1))
      }
      return m
    })
  //  NEW_NODE
  //  action.payload=> new node to add
   case 'NEW_NODE':
    return [...state, action.payload];
   default:
     return state || []
 }
}
var reducers={
  user: userReducer,
  nodes: nodesReducer
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const logger = createLogger();
let store = createStore(combineReducers(reducers),applyMiddleware(logger),   persistState(),
)
module.exports=store;
