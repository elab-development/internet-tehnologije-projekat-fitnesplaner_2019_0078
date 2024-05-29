import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DodajVezbuModal = ({ show, handleClose, token, exerciseToEdit, onExerciseUpdated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [averageCaloriesBurned, setAverageCaloriesBurned] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (exerciseToEdit) {
      setName(exerciseToEdit.name);
      setDescription(exerciseToEdit.description);
      setVideoUrl(exerciseToEdit.video_url);
      setAverageCaloriesBurned(exerciseToEdit.average_calories_burned);
      setCategory(exerciseToEdit.category);
    } else {
      setName('');
      setDescription('');
      setVideoUrl('');
      setAverageCaloriesBurned('');
      setCategory('');
    }
  }, [exerciseToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exerciseData = {
      name,
      description,
      video_url: videoUrl,
      average_calories_burned: averageCaloriesBurned,
      category,
    };

    try {
      let response;
      if (exerciseToEdit) {
        response = await axios.put(
          `http://127.0.0.1:8000/api/exercises/${exerciseToEdit.id}`,
          exerciseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          'http://127.0.0.1:8000/api/exercises',
          exerciseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      onExerciseUpdated(response.data);
      handleClose();
    } catch (error) {
      console.error('Došlo je do greške prilikom dodavanja ili ažuriranja vežbe', error);
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
          <button type="submit">{exerciseToEdit ? 'Ažuriraj Vežbu' : 'Dodaj Vežbu'}</button>
        </form>
      </div>
    </div>
  );
};

export default DodajVezbuModal;
