import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';

import SignIn from './components/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Users from './components/Users';

firebase.initializeApp({
  ****************
})

const auth = firebase.auth();
// const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);
  const roomName = 'Pruebas';

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/users' exact component={Users} />
        <div className="App">
          <section>
            {user ? <ChatRoom roomName={roomName} /> : <SignIn />}
          </section>
        </div>
      </Switch>
    </BrowserRouter>
  );
}
export default App;