'use client';

import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { postFact, updateFact } from '../api/facts';

function Home() {
  const [uselessFact, setUselessFact] = useState({});

  const { user } = useAuth();

  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();

    setUselessFact(fact);
  };

  const selectResponse = async (boolean) => {
    const val = boolean ? 'Yes' : 'No';
    const obj = {
      userId: user.uid,
      text: uselessFact.text,
    };

    const response = await postFact(obj, val);
    await updateFact({ firebaseKey: response.name }, val);

    fetchFact();
    return obj;
  };

  useEffect(() => {
    fetchFact();
  }, []);
  return (
    <>
      {uselessFact.text}

      <h2>Did you know this fact?</h2>
      <button className="btn btn-success" type="button" onClick={() => selectResponse(true)}>
        YES
      </button>
      <button className="btn btn-danger" type="button" onClick={() => selectResponse(false)}>
        NO
      </button>
    </>
  );
}

export default Home;
