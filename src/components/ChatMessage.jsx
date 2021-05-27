import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import moment from 'moment';


const ChatMessage = (props) => {

    const auth = firebase.auth();

    const [status, setStatus] = useState([]);
    const { text, uid, photoURL, createdAt } = props.message;


    useEffect(() => {
        const starCountRef = firebase.database().ref('/status/');
        starCountRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setStatus(data);
        });
    }, []);

    useEffect(() => {
        //! Mejorar
        const main = document.getElementsByClassName('main')[0];
        main.scrollTo(0, 10000);
    }, []);


    const messageClass = uid === auth.currentUser.uid ? 'sent ' : 'received';
    const classStatus = status[uid]?.state === 'online' ? 'online' : status[uid]?.state === 'away' ? 'away' : 'offline';

    return (
        <>
            {/* < className={`message ${messageClass} ${classStatus}`}> */}
            <div className={`message ${messageClass} ${classStatus}`}>
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt=" " />
                <p className="p-message">
                    {text}
                    <span className={`message message-${messageClass}`}>{createdAt ? moment.unix(createdAt?.seconds).utc().local().format('D/M/Y HH:mm') : <span className={`message message-${messageClass}`}>Cargando...</span>}</span>
                </p>
            </div>
        </>
    )
}

export default ChatMessage;