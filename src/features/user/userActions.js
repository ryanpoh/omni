import { toastr } from 'react-redux-toastr';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';
import cuid from 'cuid';

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

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firestore.auth().currentUser; // gets user object
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };

  try {
    dispatch(asyncActionStart()); // for loading animation
    //upload the file to firebase database (not FIRESTORE)
    let uploadedFile = await firebase.uploadFile(path, file, null, options); //uploadFile is an additonal method created by the library and not Firebase API
    // get url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL(); // gives us the URL of the image in firebase storage
    // get userdoc from from Firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo if not then update profile
    if (!userDoc.data().photoURL) {
      // have to use data() method to access data in a specific document\
      await firebase.updateProfile({
        //adding just the Profile database of firestore
        photoURL: downloadURL
      });
      await user.updateProfile({
        // when want to add to the auth section of firestore, we have to use updateProfile against the user object
        photoURL: downloadURL
      });
    }
    // add image to Firestore (just downloadURL and fileName)
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }] //subcollections is plural. photos sub collection will be created when we add our photo
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error('Problem deleting the photo');
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    throw new Error('Problem setting main photo'); // throws error back to the photo page
  }
};
