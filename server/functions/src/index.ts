import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const createUser = functions.auth.user().onCreate((user) => {
    const userObject = {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        createdOn: user.metadata.creationTime,
    };
    admin.firestore().collection('users').doc(user.uid).set(userObject);
});
