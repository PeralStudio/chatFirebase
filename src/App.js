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
  ****************
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