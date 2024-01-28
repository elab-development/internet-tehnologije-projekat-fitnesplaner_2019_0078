import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vezbe.css';
import useVezbe from '../hooks/useVezbe';

const Vezbe = () => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(5);
  const token = sessionStorage.getItem('token');

//   const [vezbe, setVezbe] = useState([]);
//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/exercises', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         setVezbe(response.data.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [token]);

  const vezbe = useVezbe('http://127.0.0.1:8000/api/exercises', token);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = vezbe.slice(indexOfFirstExercise, indexOfLastExercise);
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(vezbe.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }

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
          {currentExercises.map((vezba) => (
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
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <button onClick={() => paginate(number)}   className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Vezbe;
