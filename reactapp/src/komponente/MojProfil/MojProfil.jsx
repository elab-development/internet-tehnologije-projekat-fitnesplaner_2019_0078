import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MojProfil.css';
import { FaUser, FaEnvelope, FaRulerVertical, FaWeight, FaVenusMars, FaBirthdayCake, FaBullseye, FaStickyNote, FaTint } from 'react-icons/fa';

const MojProfil = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [waterAmount, setWaterAmount] = useState('');
    const [totalWaterToday, setTotalWaterToday] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                if (!token) {
                    setError(new Error('No token found in session storage'));
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setUser(response.data.user);
                calculateTotalWaterToday(response.data.user.hydrations);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const calculateTotalWaterToday = (hydrations) => {
        const today = new Date().toISOString().split('T')[0];
        const total = hydrations
            .filter(hydration => hydration.date.split('T')[0] === today)
            .reduce((sum, hydration) => sum + hydration.amount, 0);
        setTotalWaterToday(total);
    };

    const handleWaterSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = sessionStorage.getItem('authToken');
            const today = new Date().toISOString().split('T')[0];
            const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
            
            const response = await axios.post('http://127.0.0.1:8000/api/hydration', {
                user_id: user.id,
                date: today,
                amount: parseInt(waterAmount),
                time: now
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const newHydration = {
                id: response.data.id,
                date: response.data.date,
                amount: response.data.amount,
                time: response.data.time,
                created_at: response.data.created_at,
                updated_at: response.data.updated_at,
            };
            
            const updatedHydrations = [...user.hydrations, newHydration];
            updatedHydrations.sort((a, b) => new Date(b.date) - new Date(a.date));
            setUser(prevState => ({ ...prevState, hydrations: updatedHydrations }));
            calculateTotalWaterToday(updatedHydrations);
            setWaterAmount('');
        } catch (error) {
            setError(error);
        }
    };

    const getLastFiveHydrations = (hydrations) => {
        return hydrations
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
    };

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
                    <p><FaBirthdayCake /> <strong>Datum rođenja:</strong> {new Date(user.date_of_birth).toLocaleDateString()}</p>
                    <p><FaBullseye /> <strong>Fitness ciljevi:</strong> {user.fitness_goals}</p>
                    <p><FaStickyNote /> <strong>Napomene:</strong> {user.notes}</p>   

                    <h2>Unosi vode</h2>
                    <p><strong>Ukupno danas uneseno:</strong> {totalWaterToday} ml</p>
                    {user.hydrations && user.hydrations.length > 0 ? (
                        <ul className="hydrations-list">
                            {getLastFiveHydrations(user.hydrations).map((hydration) => (
                                <li key={hydration.id}>
                                    <FaTint /> <strong>Datum:</strong> {new Date(hydration.date).toLocaleDateString()} <strong>Količina:</strong> {hydration.amount} ml <strong>Vreme:</strong> {new Date(hydration.time).toLocaleTimeString()}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nema unosa vode za prikaz.</p>
                    )}

                    <form onSubmit={handleWaterSubmit} className="water-form">
                        <label>
                            Unesi količinu vode (ml):
                            <input 
                                type="number" 
                                value={waterAmount} 
                                onChange={(e) => setWaterAmount(e.target.value)} 
                                required 
                            />
                        </label>
                        <button type="submit">Dodaj unos vode</button>
                    </form>
                </div>
            ) : (
                <p>Nema podataka o korisniku.</p>
            )}
        </div>
    );
};

export default MojProfil;
