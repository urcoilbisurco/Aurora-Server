import { createStore } from 'redux'

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
      console.log("action taken.payload:", action.payload);
      return action.payload//{ action.payload
        // nodes: action.payload.nodes,
        // authenticated:true,
        // user:action.payload
      //}
    case 'LOGIN':
      return {
        nodes: action.payload.nodes,
        authenticated:true,
        user:action.payload
      }
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(userReducer)
console.log("store store.js", store)
module.exports=store;

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log("STORE CHANGED:", store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'INCREMENT' })
// // 1
// store.dispatch({ type: 'INCREMENT' })
// // 2
// store.dispatch({ type: 'DECREMENT' })
