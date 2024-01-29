import React from 'react';

const ExerciseRow = ({ vezba, deleteExercise }) => {
  return (
    <tr>
      <td>{vezba.id}</td>
      <td>{vezba.name}</td>
      <td>{vezba.description}</td>
      <td>{vezba.video_url}</td>
      <td>{vezba.average_calories_burned}</td>
      <td>{vezba.category}</td>
      <td>
        <button onClick={() => deleteExercise(vezba.id)}>Obriši</button>
      </td>
    </tr>
  );
};

export default ExerciseRow;
