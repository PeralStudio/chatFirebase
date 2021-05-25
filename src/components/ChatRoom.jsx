import React, { useState } from "react";
import firebase from "firebase";
import { useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";


const ChatRoom = ({ roomName }) => {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy && dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <main>
                <p className="chat-welcome">Bienvenido a la sala: {roomName}</p>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} roomName={roomName} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe un mensaje" autoFocus />
                <button type="submit" disabled={!formValue}><i className="fas fa-share"></i></button>
            </form>
        </>)
}

export default ChatRoom;