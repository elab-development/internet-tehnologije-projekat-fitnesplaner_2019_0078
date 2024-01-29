import React, { useState } from 'react';
import axios from 'axios';

const DodajVezbuModal = ({ show, handleClose, token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [averageCaloriesBurned, setAverageCaloriesBurned] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/exercises',
        {
          name,
          description,
          video_url: videoUrl,
          average_calories_burned: averageCaloriesBurned,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      handleClose();
    } catch (error) {
      console.error('Došlo je do greške prilikom dodavanja vežbe', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Naziv" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="url" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <input type="number" placeholder="Kalorije" value={averageCaloriesBurned} onChange={(e) => setAverageCaloriesBurned(e.target.value)} />
          <input type="text" placeholder="Kategorija" value={category} onChange={(e) => setCategory(e.target.value)} />
          <button type="submit">Dodaj Vezbu</button>
        </form>
      </div>
    </div>
  );
};

export default DodajVezbuModal;
