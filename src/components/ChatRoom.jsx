import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import { useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

require('firebase/database');


const ChatRoom = ({ roomName }) => {

    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const { uid, photoURL, displayName, email } = auth.currentUser;

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');

    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    useEffect(() => {
        firebase.database().ref(`users/${uid}`).set({
            uid,
            username: displayName,
            email: email,
            profile_picture: photoURL
        });
    }, [uid, photoURL, displayName, email])


    var myStatusRef = firebase.database().ref("users/" + uid + "/status");
    var connectedRef = firebase.database().ref(".info/connected");

    connectedRef.on("value", function (snap) {
        if (snap.val() === true) {
            var con = myStatusRef;
            con.onDisconnect().remove();
            con.set("online");
            myStatusRef.onDisconnect().set("offline");
            //o       
            // myStatusRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
        }
    });

    document.onvisibilitychange = (e) => {
        if (document.visibilityState === "hidden") {
            myStatusRef.set('away');
        } else {
            myStatusRef.set('online');
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL, displayName, email } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
            email
        })

        setFormValue('');
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

    return (
        <>
            <main className="main">
                <p className="chat-welcome">Bienvenido a la sala: {roomName}</p>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} roomName={roomName} auth={auth} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe un mensaje" autoFocus />
                <button type="submit" disabled={!formValue}><i className="fas fa-share"></i></button>
            </form>
        </>)
}

export default ChatRoom;