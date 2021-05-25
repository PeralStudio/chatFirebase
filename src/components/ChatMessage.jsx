import React from 'react';
import firebase from 'firebase/app';
import moment from 'moment';


const ChatMessage = (props) => {

    const auth = firebase.auth();

    const { text, uid, photoURL, createdAt } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt=" " />
            <p className="p-message">
                {text}
                <span className={`message message-${messageClass}`}>{createdAt ? moment.unix(createdAt?.seconds).utc().local().format('D/M/Y HH:mm') : <span className={`message message-${messageClass}`}>Cargando...</span>}</span>
            </p>
        </div>
    </>)
}

export default ChatMessage;