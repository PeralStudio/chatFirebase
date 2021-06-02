import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import { useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import SignOut from "./SignOut";
import { NavLink } from "react-router-dom";

import { Picker } from 'emoji-mart-awesome';
import data from 'emoji-mart-awesome/data/google.json'
import 'emoji-mart-awesome/css/emoji-mart.css';

require('firebase/database');


const ChatRoom = ({ roomName }) => {

    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const { uid, photoURL, displayName, email } = auth.currentUser;

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');

    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });

    // Emoji Picker
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        firebase.database().ref(`users/${uid}`).set({
            uid,
            username: displayName,
            email: email,
            profile_picture: photoURL
        });
    }, [uid, photoURL, displayName, email])



    // ------------------------------------------------------------------------------------
    // Presence Firebase Online/Away/Offline

    useEffect(() => {
        const userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

        const isOfflineForDatabase = {
            uid,
            displayName,
            photoURL,
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };

        const isOnlineForDatabase = {
            uid,
            displayName,
            photoURL,
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };

        const isAwayForDatabase = {
            uid,
            displayName,
            photoURL,
            state: 'away',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };


        firebase.database().ref('.info/connected').on('value', function (snapshot) {

            if (snapshot.val() === false) return;

            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function () {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            });
        });

        document.onvisibilitychange = (e) => {
            if (document.visibilityState === "hidden") {
                userStatusDatabaseRef.set(isAwayForDatabase);
            } else {
                userStatusDatabaseRef.set(isOnlineForDatabase);
            }
        };
    }, [uid, displayName, photoURL]);

    // ------------------------------------------------------------------------------------



    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL, displayName, email } = auth.currentUser;

        await messagesRef.add({
            text: message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
            email
        })

        setMessage('');
        SetEmojiPicker(false);
        dummy && dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    function handleResize() {
        const scrollHeight = document.documentElement.clientHeight;
        const main = document.getElementsByClassName('main')[0];
        scrollHeight && (scrollHeight < 1600) && main.scrollTo({
            top: 100000,
        })
    }

    window.addEventListener("resize", handleResize);

    // ------------------------------------------------------------------------------------
    // Emoji Picker

    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
            <Picker
                // title="Elige un emoji"
                emoji=""
                onSelect={emoji => setMessage(message + emoji.native)}
                set="google"
                showPreview={false}
                showSkinTones={false}
                data={data}
                exclude={['flags']}
            />
        );
    }

    const triggerPicker = (event) => {
        event.preventDefault();
        SetEmojiPicker(!emojiPickerState);
    }

    // ------------------------------------------------------------------------------------

    return (
        <>
            <header>
                <h1>Sala: {roomName}</h1>
                <div style={{ justifyContent: 'space-between' }}>
                    <NavLink to="/users">
                        <button style={{ fontSize: '12px', marginRight: '10px' }} className="users" >Participantes<i style={{ marginLeft: '10px', fontSize: '12px' }} className="fas fa-users"></i></button>
                    </NavLink>

                    <SignOut />
                </div>
            </header>
            <main className="main">
                <p className="chat-welcome">Bienvenido a la sala: {roomName}</p>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} roomName={roomName} auth={auth} />)}
                <span ref={dummy}></span>
            </main>
            <form onSubmit={sendMessage}>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Escribe un mensaje" autoFocus
                />
                <button
                    type="submit"
                    disabled={!message}>
                    <i className="fas fa-share"></i>
                </button>
                {emojiPicker}
                <button
                    className="ma4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    onClick={triggerPicker}
                >
                    <span className="span-emoji" role="img" aria-label="">😁</span>
                </button>
            </form>
        </>)
}

export default ChatRoom;