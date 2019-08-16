import { SubmissionError, reset } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Login failed.'
      });
    }
  };
};

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore } //return is implied
) => {
  const firebase = getFirebase(); // documentation: https://firebase.google.com/docs/reference/js/firebase.User.html#displayname
  const firestore = getFirestore();
  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password); // using this to have Firebase's full Auth API. https://firebase.google.com/docs/auth/web/password-auth
    console.log(createdUser);
    await createdUser.user.updateProfile({
      displayName: user.displayName
    });
    let newUser = {
      // let allows the variable to be reassigned but is scope sensitive. this instance will only exists within that function or loop eventhough there is a var with the same name outside
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp() //must be used with set or update
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
    });
  }
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase(); // https://github.com/prescottprue/react-redux-firebase/blob/master/docs/api/get-firebase.md   // we use this instead of props.firebase because we need Redux Thunk as middleware
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    const user = await firebase.login({ // this is not from the store. additionalUserInfo is returned from getFirebase() compared to our state.firebase
      // https://github.com/prescottprue/react-redux-firebase/blob/master/docs/api/props-firebase.md
      provider: selectedProvider, // //we can't set const to another value later on. unless it is an object. More info https://medium.com/@gianpaul.r/whats-the-difference-between-let-const-and-var-in-javascript-1535e0ffcdc
      type: 'popup' // user doesnt contain any auth data. only profile data i think
    });
    if (user.additionalUserInfo.isNewUser) {
      //will only run this when it is the user's first time logging in
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl, //firestore has no schema
        createdAt: firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = creds => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1);
    await dispatch(reset('account')); //pass in the name of the form to clear it off
    toastr.success('Success', 'Your password has been updated.');
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    });
  }
};
