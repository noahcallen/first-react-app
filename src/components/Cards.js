'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Form from '@/components/Form';
import { deleteFact } from '../api/facts';

function FactCard({ fact, deleteFunc }) {
  const [localFact, SetLocalFact] = useState(fact);
  const [editMode, setEditMode] = useState(false);

  const deleteIndFact = () => {
    deleteFact(fact.firebaseKey, 'Yes').then(() => deleteFunc());
  };
  // test
  return (
    <Card>
      <Card.Body>
        {editMode ? (
          <>
            <p>EDIT MODE</p>
            <Form obj={localFact} func={SetLocalFact} />
            <div>
              <button type="button" className="btn btn-success" onClick={() => setEditMode(false)}>
                EXIT EDIT MODE
              </button>
            </div>
          </>
        ) : (
          <>
            {localFact.text}
            {localFact.name}
            <div>
              <button type="button" className="btn btn-info" onClick={() => setEditMode(true)}>
                EDIT FACT
              </button>
              <button type="button" className="btn btn-danger" onClick={deleteIndFact}>
                DELETE FACT
              </button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

FactCard.propTypes = {
  fact: PropTypes.string.isRequired,
  deleteFunc: PropTypes.string.isRequired,
};

export default FactCard;
