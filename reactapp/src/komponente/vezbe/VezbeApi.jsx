import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VezbaKartica from './VezbaKartica';
import './Exercises.css';

const VezbeApi = () => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState({ type: '', muscle: '', equipment: '', difficulty: '' });

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

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredExercises = exercises.filter(exercise => {
    return (
      (filter.type ? exercise.type === filter.type : true) &&
      (filter.muscle ? exercise.muscle === filter.muscle : true) &&
      (filter.equipment ? exercise.equipment === filter.equipment : true) &&
      (filter.difficulty ? exercise.difficulty === filter.difficulty : true)
    );
  });

  return (
    <div className="exercises-container">
      <div className="filters">
        <select name="type" onChange={handleFilterChange}>
          <option value="">Select Type</option>
          <option value="strength">strength</option>
          <option value="olympic_weightlifting">olympic_weightlifting</option>
          <option value="strongman">strongman</option>
        </select>
        <select name="muscle" onChange={handleFilterChange}>
          <option value="">Select Muscle Group</option> 
          <option value="abdominals">abdominals</option>
          <option value="quadriceps">quadriceps</option>
          <option value="forearms">forearms</option>
          <option value="middle_back">middle_back</option>
          <option value="lats">lats</option>
          <option value="lower_back">lower_back</option>
          <option value="shoulders">shoulders</option>
          <option value="biceps">biceps</option>
        </select>
        <select name="equipment" onChange={handleFilterChange}>
          <option value="">Select Equipment</option>
          <option value="machine">machine</option>
          <option value="barbell">barbell</option>
          <option value="dumbbell">dumbbell</option>
          <option value="other">other</option>

        
        </select>
        <select name="difficulty" onChange={handleFilterChange}>
          <option value="">Select Difficulty</option>
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
      </div>
      <div className="exercises-cards">
            {filteredExercises.map((exercise, index) => (
            <VezbaKartica key={index} exercise={exercise} />
            ))}
        </div>
    </div>
  );
};

export default VezbeApi;
