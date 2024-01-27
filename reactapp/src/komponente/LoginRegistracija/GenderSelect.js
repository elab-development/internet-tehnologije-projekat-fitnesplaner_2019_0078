 
import React from 'react';

const GenderSelect = ({ selectedGender, onChange }) => {
  return (
    <div className="gender-select">
      <button
        type="button"
        className={`gender-button ${selectedGender === 'M' ? 'selected' : ''}`}
        onClick={() => onChange({ target: { name: 'gender', value: 'M' } })}
      >
        M
      </button>
      <button
        type="button"
        className={`gender-button ${selectedGender === 'Z' ? 'selected' : ''}`}
        onClick={() => onChange({ target: { name: 'gender', value: 'Z' } })}
      >
        Z
      </button>
    </div>
  );
};

export default GenderSelect;
