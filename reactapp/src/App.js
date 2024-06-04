 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './komponente/LoginRegistracija/LoginForm';
import RegisterForm from './komponente/LoginRegistracija/RegisterForm';
import Vezbe from './komponente/vezbe/Vezbe';
import VezbeApi from './komponente/vezbe/VezbeApi';
import HomePage from './komponente/HomePage/HomePage';
import Navbar from './komponente/nav/Navbar';
import { useState } from 'react';
import MojProfil from './komponente/MojProfil/MojProfil';
import FoodTracker from './komponente/FoodTracker/FoodTracker';
import WorkoutScheduler from './komponente/WorkoutScheduler/WorkoutScheduler';
 

function App() {
  const [token,setToken]=useState(null);
  return (
    <Router>
      <Navbar token={token} setToken={setToken}  />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm setToken={setToken}/>} />
        <Route path="/register" element={<RegisterForm />} />
        
        <Route path="/admin/vezbe" element={<Vezbe />} />  {/*admin moze da vrsi crud operacije nad vezbama */}
        <Route path="/vezbeapi" element={<VezbeApi/>} />



         {/*dodato za seminarski*/}
        <Route path="/mojprofil" element={<MojProfil />} />
        <Route path="/foodtracker" element={<FoodTracker />} />
        <Route path="/vezbe" element={<WorkoutScheduler />} />

      </Routes>
    </Router>
  );
}

export default App;
