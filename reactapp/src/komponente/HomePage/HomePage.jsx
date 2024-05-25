import React from 'react';
import { FaDumbbell, FaHeart, FaBalanceScale } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (<>
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
    <p>
      Redovno vežbanje pomaže u poboljšanju opšteg zdravlja tela i duha. Ne zaboravite da pravilno razmislite o svom planu treninga i ishrane kako biste postigli najbolje rezultate.
    </p>
    <p>
      Da li ste znali? Vežbanje može poboljšati vaše raspoloženje i smanjiti osećaje anksioznosti, depresije i stresa. To je zato što vežbanje menja deo mozga koji reguliše stres i anksioznost. Takođe, može povećati proizvodnju endorfina, koji su poznati po tome što pomažu u proizvodnji pozitivnih osećaja i smanjuju percepciju bola.
    </p>
    <p>
      Pored toga, redovne fizičke aktivnosti i vežbe imaju snažne koristi za srce i pluća. Povećavajući vašu kondiciju, vežbe mogu smanjiti rizik od hroničnih bolesti, poboljšati balans i koordinaciju, pomoći u kontroli telesne težine, i čak poboljšati kvalitet sna i povećati vašu energiju.
    </p>
  </div></>
  );
}

export default HomePage;
