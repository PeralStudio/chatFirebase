import React from 'react';
import firebase from 'firebase';
import moment from 'moment';


const ChatMessage = (props) => {

    const auth = firebase.auth();

    const { text, uid, photoURL, createdAt } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="Avatar" />
            <p style={{ fontSize: '18px', fontWeight: 'bold', wordBreak: 'break-word' }}>
                {text}
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000' }} className={`message ${messageClass}`}>{moment.unix(createdAt?.seconds).utc().local().format('D/M/Y HH:mm')}</span>
            </p>
        </div>
    </>)
}

export default ChatMessage;