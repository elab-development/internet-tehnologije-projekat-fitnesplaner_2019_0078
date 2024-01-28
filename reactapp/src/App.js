 
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './komponente/LoginRegistracija/LoginForm';
import RegisterForm from './komponente/LoginRegistracija/RegisterForm';
import Vezbe from './komponente/vezbe/Vezbe';
import VezbeApi from './komponente/vezbe/VezbeApi';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/vezbe" element={<Vezbe />} />
        <Route path="/vezbeapi" element={<VezbeApi/>} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
