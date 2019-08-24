export const objectToArray = (object) => {
    if (object) {
        return  Object.entries(object).map(e => Object.assign({}, e[1], {id: e[0]}))
    }
}


export const createNewMeeting = (user, photoURL, meeting) => {
    return {
        ...meeting, //form values
        chairUid: user.uid,
        chairedBy: user.displayName,
        chairPhotoURL: photoURL || '/assets/user.png',
        created: new Date(),
        attendees: {
            [user.uid]: {
                going: true,
                joinDate: new Date(),
                photoURL: photoURL || '/assets/user.png',
                displayName: user.displayName,
                chair: true
            }
        }
    }
}