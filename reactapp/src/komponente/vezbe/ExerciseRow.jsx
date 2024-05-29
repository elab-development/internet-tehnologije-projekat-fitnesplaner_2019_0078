import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const ExerciseRow = ({ vezba, deleteExercise,editExercise }) => {
  return (
    <tr>
      <td>{vezba.id}</td>
      <td>{vezba.name}</td>
      <td>{vezba.description}</td>
      <td>{vezba.video_url}</td>
      <td>{vezba.average_calories_burned}</td>
      <td>{vezba.category}</td>
      <td>
        <button onClick={() => deleteExercise(vezba.id)}><FaRegTrashAlt /></button>
      </td>
      <td>
        <button onClick={() => editExercise(vezba)}>Ažuriraj</button>
      </td>
    </tr>
  );
};

export default ExerciseRow;
