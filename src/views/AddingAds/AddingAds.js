import React, { useRef } from 'react';
import { db } from '../../firebase-config';
import firebase from 'firebase';
import { useAuth } from '../../context/AuthProvider';
import { useHistory } from 'react-router-dom';

export default function AddingAds() {
  const category = useRef();
  const title = useRef();
  const descriptions = useRef();
  const myDateCreated = firebase.firestore.Timestamp.fromDate(new Date());
  const { currentUser } = useAuth();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const checkedGiveOrTake = document.querySelector(
      'input[name=give-take]:checked'
    ).value;
    const data = {
      author: currentUser.email,
      category: category.current.value,
      title: title.current.value,
      descriptions: descriptions.current.value,
      givetake: checkedGiveOrTake,
      dateCreated: myDateCreated,
      status: 'active'
    };
    db.collection('announcements').add(data);
    history.push('/dashboard');
  }

  return (
    <>
      <h2>Dodaj ogłoszenie</h2>
      <form>
        <div>
          <label htmlFor="category">Kategoria</label>
          <select ref={category} id="category" name="category">
            <option disabled value="">
              Wybierz kategorie
            </option>
            <option value="small-fixes">Small fixes</option>
            <option value="storage">Storage</option>
            <option value="helper">Helper</option>
            <option value="parking-space">Parking space</option>
            <option value="events">Events</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label for="title">Tytuł</label>
          <input ref={title} required id="title" name="title"></input>
        </div>
        <div>
          <label for="descriptions">Opis</label>
          <textarea
            ref={descriptions}
            style={{ height: 100, width: 400 }}
            required
            id="descriptions"
            name="descriptions"
          ></textarea>
        </div>
        <fieldset>
          <legend>Wybierz</legend>

          <label for="give">Give</label>
          <input
            required
            id="give"
            name="give-take"
            value="give"
            type="radio"
          ></input>

          <label for="take">Take</label>
          <input id="take" name="give-take" value="take" type="radio"></input>
        </fieldset>
        <button onClick={handleSubmit}>Dodaj</button>
      </form>
    </>
  );
}
