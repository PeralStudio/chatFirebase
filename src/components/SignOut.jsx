import React from 'react';
import firebase from 'firebase/app';


const SignOut = () => {

    const auth = firebase.auth();

    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Salir<i style={{ marginLeft: '10px', fontSize: '16px' }} className="fas fa-sign-out-alt"></i></button>
    )
}

export default SignOut;