import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';
import { Container, Row } from 'react-bootstrap';
import SelectionModal from './components/SelectionModal';

function App() {
  const [characterInfo, setCharacterInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [characterList, setCharacterList] = useState(null);

  const getCharacter = async (characterName) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3401549706550150/search/${characterName}`
      );
      const data = await response.json();
      if (!response.ok || data.response === 'error') {
        throw Error(`"${characterName}" not found. Try again!`);
      }
      const filteredData = data.results.filter(
        (item) => characterName.toLowerCase() === item.name.toLowerCase()
      );
      setCharacterList(filteredData);
      if (filteredData.length === 1) {
        setCharacterInfo(filteredData[0]);
      } else {
        setShow(true);
      }
    } catch (err) {
      setError(err.message);
      setCharacterInfo(null);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <h1>Superheroes And Villains</h1>
      </Row>
      <SearchBar
        error={error}
        isLoading={isLoading}
        setError={setError}
        getCharacter={getCharacter}
      />
      {characterInfo && !error ? <CharacterCard characterInfo={characterInfo} /> : null}
      <SelectionModal
        show={show}
        setCharacterInfo={setCharacterInfo}
        characterList={characterList}
        setShow={setShow}
      />
    </Container>
  );
}

export default App;