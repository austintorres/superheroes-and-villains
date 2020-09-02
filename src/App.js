import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';
import { Container, Button } from 'react-bootstrap';

function App() {

  const [ characterInfo, setCharacterInfo ] = useState();
  const [ characterName, setCharacterName ] = useState('batman')

  const getCharacter = async () => {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/3401549706550150/search/${characterName}`);
      const json = await response.json();
      console.log('json', json)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      setCharacterInfo(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <h1>Super-Heroes & Villains</h1>
      <Button onClick={() => getCharacter()}>Get Character</Button>
      <SearchBar />
      <CharacterCard />
    </Container>
  );
}

export default App;
