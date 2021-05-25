import React from 'react';
import firebase from 'firebase';


const SignIn = () => {

    const auth = firebase.auth();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Acceder con Google</button>
        </>
    )
}

export default SignIn;