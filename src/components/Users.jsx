import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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

            setStatusUsers(users);
        });
    }, [])

    return (
        <div className="AppUsers">
            <header>
                <h1 style={{ textAlign: 'center' }}>Participantes</h1>
                <NavLink to="/">
                    <button style={{ fontSize: '12px' }} className="sign-out" >Volver<i style={{ marginLeft: '10px', fontSize: '12px' }} className="fas fa-chevron-left"></i></button>
                </NavLink>
            </header>
            <section>

                {statusUsers.length > 0 && statusUsers.map(item => (
                    <div key={item.uid || item.last_changed} className={item.state} style={{ display: 'flex', width: '60%', padding: '10px' }}>
                        <img src={item.photoURL || 'https://api-private.atlassian.com/users/4ebf62c94a29a704ec2a86244dcf5072/avatar'} alt=" " />
                        {item.displayName && <p>{item.displayName}</p>}
                        {/* <p style={{ width: 'fit-content' }} className={item.state}>{item.state}</p> */}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Users;
