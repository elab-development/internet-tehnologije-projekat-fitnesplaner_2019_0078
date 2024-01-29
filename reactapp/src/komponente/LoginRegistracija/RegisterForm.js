import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import InputField from './InputField';  
import GenderSelect from './GenderSelect';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    height: '',
    weight: '',
    gender: '', // 'M' for Male or 'Z' for Female
    date_of_birth: '',
    fitness_goals: '',
    notes: ''
  });
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      const { data } = response;

      if (response.status === 201) {
        console.log('Registration successful', data);
        navigate('/login');
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        FITNESS REGISTRATION FORM
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
        <InputField label="Height" type="number" name="height" value={formData.height} onChange={handleChange} />
        <InputField label="Weight" type="number" name="weight" value={formData.weight} onChange={handleChange} />
      
        <div className="input-container">
          <label>Gender</label>
          <GenderSelect
            selectedGender={formData.gender}
            onChange={handleChange}
          />
        </div>
        <InputField label="Date of Birth" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
        <InputField label="Fitness Goals" type="text" name="fitness_goals" value={formData.fitness_goals} onChange={handleChange} />
        <InputField label="Notes" type="text" name="notes" value={formData.notes} onChange={handleChange} />
        <div className="form-footer">
          <button type="submit" className="login-button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
