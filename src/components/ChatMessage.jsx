import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import moment from 'moment';
import { presenceAway, presenceOffline, presenceOnline } from '../const/globalConst';


const ChatMessage = (props) => {

    const auth = firebase.auth();

    const [status, setStatus] = useState([]);
    const { text, uid, photoURL, createdAt, displayName } = props.message;

    const namePhoto = displayName.split([' '][0]);

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const classStatus = status[uid]?.state === 'online' ? 'online' : status[uid]?.state === 'away' ? 'away' : 'offline';
    const iconStatus = classStatus === 'online' ? presenceOnline : classStatus === 'away' ? presenceAway : presenceOffline;

    useEffect(() => {
        const statusRef = firebase.database().ref('/status/');
        statusRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setStatus(data);
        });

        //! Mejorar
        const main = document.getElementsByClassName('main')[0];
        main.scrollTo(0, 10000);
    }, []);


    return (
        <>
            <div className={`message ${messageClass} ${classStatus}`}>
                <div className="name-photo">
                    <img src={photoURL || 'https://api-private.atlassian.com/users/4ebf62c94a29a704ec2a86244dcf5072/avatar'} alt=" " />
                    <div className={`span ${messageClass}${classStatus}`}>{iconStatus}</div>
                    {displayName && <div className="message-name">{`${namePhoto[0]} ${namePhoto[1]}`}</div>}
                </div>
                <p className="p-message">
                    <span className="span-text">{text}</span>
                    <span className={`message message-${messageClass}`}>{createdAt ? moment.unix(createdAt?.seconds).utc().local().format('D/M/YY HH:mm ') : <span className={`message message-${messageClass}`}>Cargando...</span>}</span>
                </p>
            </div>
        </>
    )
}

export default ChatMessage;