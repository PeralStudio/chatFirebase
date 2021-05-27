import React from 'react';
import firebase from 'firebase/app';


const SignOut = () => {
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;
    const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

    const isOfflineForDatabase = {
        state: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    const handleClick = () => {
        userStatusDatabaseRef.set(isOfflineForDatabase);
        auth.signOut();
    }

    return auth.currentUser && (
        <button className="sign-out" onClick={handleClick}>Salir<i style={{ marginLeft: '10px', fontSize: '16px' }} className="fas fa-sign-out-alt"></i></button>
    )
}

export default SignOut;