import React from 'react';

const ExerciseRow = ({ vezba }) => {
  return (
    <tr>
      <td>{vezba.id}</td>
      <td>{vezba.name}</td>
      <td>{vezba.description}</td>
      <td>{vezba.video_url}</td>
      <td>{vezba.average_calories_burned}</td>
      <td>{vezba.category}</td>
    </tr>
  );
};

export default ExerciseRow;
