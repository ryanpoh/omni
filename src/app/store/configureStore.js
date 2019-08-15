import { createStore, applyMiddleware } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import firebase from '../config/firebase';

const rrfConfig = {
  //reactreduxfirebaseConfig
  userProfile: 'users',
  attachAuthIsReady: true,
  useFireStoreForProfile: true
};

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })]; //extra arguments allows thunk to have more abilities rather than just dispatch and getState
  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares), //gives access to redux thunk
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );
  const store = createStore(rootReducer, composedEnhancer);

  return store;
};
