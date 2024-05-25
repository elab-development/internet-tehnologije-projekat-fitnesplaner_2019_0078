import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Vezbe.css';
import useVezbe from '../hooks/useVezbe';
import ExerciseRow from './ExerciseRow';
import DodajVezbuModal from './DodajVezbuModal';

const Vezbe = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);  
  const [showModal, setShowModal] = useState(false);
  const token = sessionStorage.getItem('authToken');
  const vezbe = useVezbe('http://127.0.0.1:8000/api/exercises', token);

  useEffect(() => {
    setFilteredExercises(vezbe);  
  }, [vezbe]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  
  };

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredExercises = vezbe.filter((vezba) => {
      const { name, description, video_url, average_calories_burned, category } = vezba;
      return (
        name.toLowerCase().includes(lowerCaseSearchTerm) ||
        description.toLowerCase().includes(lowerCaseSearchTerm) ||
        video_url.toLowerCase().includes(lowerCaseSearchTerm) ||
        average_calories_burned.toString().includes(lowerCaseSearchTerm) ||
        category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredExercises(newFilteredExercises);
  }, [searchTerm, vezbe]);

  const deleteExercise = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/exercises/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedExercises = filteredExercises.filter((vezba) => vezba.id !== id);
      setFilteredExercises(updatedExercises);
      alert("Uspesno obrisano!")
    } catch (error) {
      console.error("Došlo je do greške prilikom brisanja vežbe", error);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredExercises.length / exercisesPerPage); i++) {
    pageNumbers.push(i);
  }
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  return (
    <div className="vezbe-container">
      <h1>Vezbe</h1>
      <button onClick={() => setShowModal(true)}>Dodaj Novu Vezbu</button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži vezbe..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="vezbe-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Video URL</th>
            <th>Kalorije</th>
            <th>Kategorija</th>
            <th>Obrisi</th>
          </tr>
        </thead>
        <tbody>
          {currentExercises.map((vezba) => (
            <ExerciseRow key={vezba.id} vezba={vezba} deleteExercise={deleteExercise} />
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <DodajVezbuModal show={showModal} handleClose={() => setShowModal(false)} token={token} />
    </div>
  );
};

export default Vezbe;
