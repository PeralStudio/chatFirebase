import React from 'react';
import firebase from 'firebase/app';
import { googleBtnIcon } from '../const/globalConst';


const SignIn = () => {

    const auth = firebase.auth();

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <>
            <div className="container-signin">
                <button className="google-button sign-in" onClick={signInWithGoogle}>
                    <span className="google-button__icon">
                        {googleBtnIcon}
                    </span>
                    <span className="google-button__text">Acceder con Google</span>
                </button>
            </div>
        </>
    )
}

export default SignIn;