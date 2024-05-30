import React, { useState } from 'react';
import axios from 'axios';  
import './LoginForm.css';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({setToken}) => {
  const [formData, setFormData] = useState({
    email: 'kameron06@example.org',
    password: 'password'
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
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: formData.email,
        password: formData.password
      });

     
      const { data } = response;

    
      if (response.status === 200) {
        sessionStorage.setItem('authToken', data.access_token);
        setToken(data.access_token);
        console.log('Login successful');
        if(data.user.admin==1){
          navigate('/admin/vezbe');

        }else{
          navigate('/mojprofil');

        }
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
  
      if (error.response) {
      
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
     
        console.error('No response:', error.request);
      } else {
       
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        FITNESS LOGIN FORM
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        <div className="form-footer">
          <button type="submit" className="login-button">Log In</button>
          {/* <a href="#forgot" className="forgot-password">Forgot Password?</a> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
