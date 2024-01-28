import React from 'react';
import { FaDumbbell, FaHeartbeat, FaTools, FaUserGraduate } from 'react-icons/fa';

const VezbaKartica = ({ exercise }) => {
   
  const imageUrl = `https://source.unsplash.com/featured/?gym,exercise/${encodeURIComponent(exercise.name)}/${Date.now()}`;

  return (
    <div className="exercise-card">
      <img 
        src={imageUrl}
        alt={exercise.name} 
        className="exercise-image"
      />
      <h3>{exercise.name}</h3>
      <p><FaDumbbell /> Type: {exercise.type}</p>
      <p><FaHeartbeat /> Muscle: {exercise.muscle}</p>
      <p><FaTools /> Equipment: {exercise.equipment}</p>
      <p><FaUserGraduate /> Difficulty: {exercise.difficulty}</p>
      <p>Instructions: {exercise.instructions}</p>
    </div>
  );
};

export default VezbaKartica;
