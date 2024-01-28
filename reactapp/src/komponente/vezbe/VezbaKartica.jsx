import React, { useState } from 'react';
import { FaDumbbell, FaHeartbeat, FaTools, FaUserGraduate } from 'react-icons/fa';
import Modal from './Modal';  

const VezbaKartica = ({ exercise }) => {
  const [showModal, setShowModal] = useState(false);
  const imageUrl = `https://source.unsplash.com/featured/?gym,exercise/${encodeURIComponent(exercise.name)}/${Date.now()}`;
  const previewInstructions = exercise.instructions.substring(0, 30) + '...';

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
      <p>Instructions: {previewInstructions} 
        <span className="show-more" onClick={() => setShowModal(true)}>Show more</span>
      </p>
      {showModal && <Modal content={exercise.instructions} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default VezbaKartica;
