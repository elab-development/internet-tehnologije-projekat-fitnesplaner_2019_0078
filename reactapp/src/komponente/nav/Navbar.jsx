import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Početna</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/vezbe" className="nav-link">Vežbe</Link>
        </li>
        <li className="nav-item">
          <Link to="/vezbeapi" className="nav-link">Vežbe API</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">Registracija</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
