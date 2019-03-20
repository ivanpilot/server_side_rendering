import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Unlike for the client we do not use the <Provider /> here because on the server we just want to create the store to manage the redux aspect whereas for the client we create the store and immediately want to use it for our client side application

export default () => {
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    return store;
}