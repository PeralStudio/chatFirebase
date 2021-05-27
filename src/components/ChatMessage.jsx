import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import moment from 'moment';


const ChatMessage = (props) => {

    const auth = firebase.auth();

    const [status, setStatus] = useState([]);
    const { text, uid, photoURL, createdAt, displayName } = props.message;


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


    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const classStatus = status[uid]?.state === 'online' ? 'online' : status[uid]?.state === 'away' ? 'away' : 'offline';

    return (
        <>
            <div className={`message ${messageClass} ${classStatus}`}>
                <div className="name-photo">
                    <img src={photoURL || 'https://api-private.atlassian.com/users/4ebf62c94a29a704ec2a86244dcf5072/avatar'} alt=" " />
                    {displayName && <div className="message-name">{displayName}</div>}
                </div>
                <p className="p-message">
                    <span className="span-text">{text}</span>
                    <span className={`message message-${messageClass}`}>{createdAt ? moment.unix(createdAt?.seconds).utc().local().format('D/M/Y HH:mm') : <span className={`message message-${messageClass}`}>Cargando...</span>}</span>
                </p>
            </div>
        </>
    )
}

export default ChatMessage;