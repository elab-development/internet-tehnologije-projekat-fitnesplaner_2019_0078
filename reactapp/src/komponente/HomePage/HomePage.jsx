import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDumbbell, FaHeart, FaBalanceScale } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [funFacts, setFunFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFunFacts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('https://api.api-ninjas.com/v1/facts?category=health', {
            headers: { 'X-Api-Key': '181QjUpNRZQGa5oA0ZA6PCeyG6U12QLvnh2D5sDW' }
          }),
          axios.get('https://api.api-ninjas.com/v1/facts?category=health', {
            headers: { 'X-Api-Key': '181QjUpNRZQGa5oA0ZA6PCeyG6U12QLvnh2D5sDW' }
          }),
          axios.get('https://api.api-ninjas.com/v1/facts?category=health', {
            headers: { 'X-Api-Key': '181QjUpNRZQGa5oA0ZA6PCeyG6U12QLvnh2D5sDW' }
          })
        ]);

        const facts = responses.map(response => response.data[0].fact);
        setFunFacts(facts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunFacts();
  }, []);

  return (
    <>
      <div className="vezbe-container">
        <h1>Dobrodošli u Fitnes Planer</h1>
        <p>
          Vežbanje je ključno za održavanje zdravlja i kondicije. Redovno vežbanje donosi mnoge prednosti, uključujući:
        </p>
        <ul className="colorful-divs">
          <li className="colorful-div red"><FaDumbbell /> Povećava snagu i izdržljivost</li>
          <li className="colorful-div blue"><FaHeart /> Poboljšava kardiovaskularno zdravlje</li>
          <li className="colorful-div green"><FaBalanceScale /> Pomaže u održavanju zdrave težine</li>
        </ul>
        <Link to="/login" className="get-started-button">Get Started</Link>
      </div>
      <div className="more-content">
        <h1>Zanimljivosti</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul className="fun-facts">
            {funFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        )}
        <p>
          Redovno vežbanje pomaže u poboljšanju opšteg zdravlja tela i duha. Ne zaboravite da pravilno razmislite o svom planu treninga i ishrane kako biste postigli najbolje rezultate.
        </p>
        <p>
          Da li ste znali? Vežbanje može poboljšati vaše raspoloženje i smanjiti osećaje anksioznosti, depresije i stresa. To je zato što vežbanje menja deo mozga koji reguliše stres i anksioznost. Takođe, može povećati proizvodnju endorfina, koji su poznati po tome što pomažu u proizvodnji pozitivnih osećaja i smanjuju percepciju bola.
        </p>
        <p>
          Pored toga, redovne fizičke aktivnosti i vežbe imaju snažne koristi za srce i pluća. Povećavajući vašu kondiciju, vežbe mogu smanjiti rizik od hroničnih bolesti, poboljšati balans i koordinaciju, pomoći u kontroli telesne težine, i čak poboljšati kvalitet sna i povećati vašu energiju.
        </p>
      </div>
    </>
  );
}

export default HomePage;
