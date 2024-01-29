 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './komponente/LoginRegistracija/LoginForm';
import RegisterForm from './komponente/LoginRegistracija/RegisterForm';
import Vezbe from './komponente/vezbe/Vezbe';
import VezbeApi from './komponente/vezbe/VezbeApi';
import HomePage from './komponente/HomePage/HomePage';
import Navbar from './komponente/nav/Navbar';
 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/vezbe" element={<Vezbe />} />
        <Route path="/vezbeapi" element={<VezbeApi/>} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
