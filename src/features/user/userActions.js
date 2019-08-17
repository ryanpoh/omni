import { toastr } from 'react-redux-toastr';

export const updateProfile = (
  user // isEmpty and isLoaded field properties appears automatically when we submit with reduxForm. so we have to get rid of it before we store in Firestore
) =>
  // previously we will always need to add userConstants and userReducers,
  // but in this case we can just use the functions from react-redux-firesbase
  // and redux-firestore because they have their in-built reducers and constants already
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user; //updatedUser object are properties which are NOT isLoaded and isEmpty
    try {
      //now updatedUser will contain all of the fields of the reduxForm MINUS isLoaded and isEmpty
      await firebase.updateProfile(updatedUser); //using updateProfile against an firebase instance. this is going to update our profile in firestore database. It will have nothing to do with the Firebase Auth area in Firebase
      toastr.success('Success', 'Your profile has been updated'); // so lets say even when we updateProfile the 'displayName' of this firestore database, it will not update  'displayName' in firebase's auth  area database. But we don't need to worry about his because we won't be using Firebase's database and noone can see it anyways. Firestore is going to our main source of data, not firebase
    } catch (error) {
      console.log(error);
    }
  }; //anything to do with users, updating profiles, or authentication, we will use Firebase instead of Firestore
