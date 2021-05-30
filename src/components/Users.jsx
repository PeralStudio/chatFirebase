import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { presenceAway, presenceOffline, presenceOnline } from '../const/globalConst';

require('firebase/database');

const Users = () => {

    const [statusUsers, setStatusUsers] = useState({});

    useEffect(() => {
        const statusRef = firebase.database().ref('/status/');
        statusRef.on('value', (snapshot) => {
            const data = snapshot.val();
            let users = [];

            for (var value in data) {
                users.push(data[value]);
            }
            users.length > 0 && users.sort((a, b) => (a.displayName.toLowerCase() > b.displayName.toLowerCase()) ? 1 : -1)
            setStatusUsers(users);
        });
    }, [])

    return (
        <div className="AppUsers">
            <header>
                <h1 style={{ textAlign: 'center' }}>Participantes</h1>
                <NavLink to="/">
                    <button style={{ fontSize: '12px' }} className="users" >Volver<i style={{ marginLeft: '10px', fontSize: '12px' }} className="fas fa-chevron-left"></i></button>
                </NavLink>
            </header>
            <section>
                <div style={{ marginTop: '20px' }}>
                    {statusUsers.length > 0 && statusUsers.map(item => (
                        <div key={item?.uid || item.last_changed} className={item.state} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>

                            <div>
                                <img src={item.photoURL || 'https://api-private.atlassian.com/users/4ebf62c94a29a704ec2a86244dcf5072/avatar'} alt=" " />
                                <div className={`span${item.state}`}>
                                    {item.state === 'online' ? presenceOnline : item.state === 'away' ? presenceAway : presenceOffline}
                                </div>
                            </div>
                            {item.displayName && <p>{item.displayName[0].toUpperCase() + item.displayName.substring(1)}</p>}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Users;
