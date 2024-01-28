import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vezbe.css';

const Vezbe = () => {
  const [vezbe, setVezbe] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/exercises', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setVezbe(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <div className="vezbe-container">
      <h1>Vezbe</h1>
      <table className="vezbe-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Video URL</th>
            <th>Kalorije</th>
            <th>Kategorija</th>
          </tr>
        </thead>
        <tbody>
          {vezbe.map((vezba) => (
            <tr key={vezba.id}>
              <td>{vezba.id}</td>
              <td>{vezba.name}</td>
              <td>{vezba.description}</td>
              <td>{vezba.video_url}</td>
              <td>{vezba.average_calories_burned}</td>
              <td>{vezba.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vezbe;
