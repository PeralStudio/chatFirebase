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

require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.REACT_APP_DB_APIKEY,
  authDomain: process.env.REACT_APP_DB_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DB_DATABASEURL,
  projectId: process.env.REACT_APP_DB_PROJECTID,
  storageBucket: process.env.REACT_APP_DB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_DB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_DB_APPID,
  measurementId: process.env.REACT_APP_DB_MEASUREMENTID
})

const auth = firebase.auth();
// const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);
  const roomName = 'Pruebas';

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/users' component={Users} />
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