import { useState, useEffect } from 'react';
import axios from 'axios';

const useVezbe = (url, token) => {
  const [vezbe, setVezbe] = useState([]);

  useEffect(() => {
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setVezbe(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [url, token]);

  return vezbe;
};

export default useVezbe;
