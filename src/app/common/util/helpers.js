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

export const createNewJob = (user, photoURL, job) => {
    return {
        ...job, //form values
        chairUid: user.uid,
        chairedBy: user.displayName,
        chairPhotoURL: photoURL || '/assets/user.png',
        created: new Date()
    }
}

export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};