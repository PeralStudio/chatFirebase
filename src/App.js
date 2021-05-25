import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

firebase.initializeApp({
  apiKey: "AIzaSyBMFVL_berT0wp1lFSguniGitDcQxBvsrg",
  authDomain: "chatprueba-e0891.firebaseapp.com",
  databaseURL: "https://chatprueba-e0891-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatprueba-e0891",
  storageBucket: "chatprueba-e0891.appspot.com",
  messagingSenderId: "324007932543",
  appId: "1:324007932543:web:6699a30e22bca8e8eb054a",
  measurementId: "G-R5KT4KNLTP"
})

const auth = firebase.auth();
// const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);
  const roomName = 'Pruebas';

  return (
    <div className="App">
      <header>
        <h1>Sala: {roomName}</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom roomName={roomName} /> : <SignIn />}
      </section>

    </div>
  );
}
export default App;