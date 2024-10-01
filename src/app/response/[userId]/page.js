'use client';

import React, { useEffect, useState, useCallback } from 'react';
import FactCard from '@/components/Cards';
import PropTypes from 'prop-types';
import { readFacts } from '../../../api/facts';

export default function ResponsePage({ params, searchParams }) {
  const [facts, setFacts] = useState([]);

  const getFacts = useCallback(() => {
    readFacts(params.userId, searchParams.value).then(setFacts);
  }, [params.userId, searchParams.value]);

  useEffect(() => {
    getFacts();
  }, [getFacts]);

  return (
    <div>
      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact} deleteFunc={getFacts} />
      ))}
    </div>
  );
}

ResponsePage.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
  searchParams: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
};
