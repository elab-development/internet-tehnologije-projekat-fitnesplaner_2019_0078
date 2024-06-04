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
  const isAdmin = sessionStorage.getItem('admin') === '1';
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {token ? (
          isAdmin ? (
            <li className="nav-item">
              <Link to="/admin/vezbe" className="nav-link">Admin Vežbe</Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/mojprofil" className="nav-link">Moj profil</Link>
              </li>
              <li className="nav-item">
                <Link to="/vezbe" className="nav-link">Vežbe</Link>
              </li>
              <li className="nav-item">
                <Link to="/foodtracker" className="nav-link">Hrana</Link>
              </li>
            </>
          )
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        )}
        {token && (
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
