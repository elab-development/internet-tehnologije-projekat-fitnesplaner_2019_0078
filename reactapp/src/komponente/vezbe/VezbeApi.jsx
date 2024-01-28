import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
import './Exercises.css';  
import VezbaKartica from './VezbaKartica';

const VezbeApi = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/exercises/getRandomExercises');  
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="exercises-container">
      {exercises.map((exercise, index) => (
        <VezbaKartica key={index} exercise={exercise} />
      ))}
    </div>
  );
};

export default VezbeApi;
