import React from 'react';
import { Link , useHistory } from 'react-router-dom';

export function AddAdBtn() {
  const history = useHistory();

  function handleGoToPost(e) {
    e.preventDefault();
    history.push('/post');
  }

  return (
    <div>
      <button onClick={handleGoToPost}>Dodaj</button>
      <Link to="/post">Dodaj</Link>
    </div>
  );
}