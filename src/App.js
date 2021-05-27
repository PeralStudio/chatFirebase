import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';

import SignIn from './components/SignIn';

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
      <section>
        {user ? <ChatRoom roomName={roomName} /> : <SignIn />}
      </section>
    </div>
  );
}
export default App;