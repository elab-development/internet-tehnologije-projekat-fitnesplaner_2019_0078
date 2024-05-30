import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MojProfil.css';
import { FaUser, FaEnvelope, FaRulerVertical, FaWeight, FaVenusMars, FaBirthdayCake, FaBullseye, FaStickyNote } from 'react-icons/fa';

const MojProfil = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Dohvatanje tokena iz session storage-a
                const token = sessionStorage.getItem('authToken');
                
                // Ako nema tokena, postavi error
                if (!token) {
                    setError(new Error('No token found in session storage'));
                    setLoading(false);
                    return;
                }

                // Postavljanje Axios zahteva sa Authorization headerom
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setUser(response.data.user);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="profile-container">
            <h1>Moj Profil</h1>
            {user ? (
                <div className="profile-details">
                    <p><FaUser /> <strong>ID:</strong> {user.id}</p>
                    <p><FaUser /> <strong>Ime:</strong> {user.name}</p>
                    <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
                    <p><FaRulerVertical /> <strong>Visina:</strong> {user.height} cm</p>
                    <p><FaWeight /> <strong>Težina:</strong> {user.weight} kg</p>
                    <p><FaVenusMars /> <strong>Pol:</strong> {user.gender}</p>
                    <p><FaBirthdayCake /> <strong>Datum rođenja:</strong> {user.date_of_birth}</p>
                    <p><FaBullseye /> <strong>Fitness ciljevi:</strong> {user.fitness_goals}</p>
                    <p><FaStickyNote /> <strong>Napomene:</strong> {user.notes}</p>   
                </div>
            ) : (
                <p>Nema podataka o korisniku.</p>
            )}
        </div>
    );
};

export default MojProfil;
