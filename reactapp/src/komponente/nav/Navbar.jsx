import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Navbar({ token, setToken }) {
  const history = useNavigate(); 
  const handleLogout = async () => {
    try { 
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
    
      setToken(null); 
      history('/');
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Početna</Link>
        </li>
        {token === null && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Registracija</Link>
            </li>
            <li className="nav-item">
              <Link to="/vezbeapi" className="nav-link">Vežbe API</Link>
            </li>
          </>
        )}
        {token !== null && (
          <>
            <li className="nav-item">
              <Link to="/vezbe" className="nav-link">Vežbe</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
