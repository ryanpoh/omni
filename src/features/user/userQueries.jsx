export const userDetailedQuery = ({ auth, userUid }) => {
  //allows us to bring back or listen to our photos subcolletion for that particular user (need uid)\
  if (userUid !== null) {
    return [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  } else {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  }
};
