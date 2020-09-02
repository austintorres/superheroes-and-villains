import React from 'react';
import { Row, Col, Image, ProgressBar } from 'react-bootstrap';

function CharacterCard({ characterInfo }) {
  const powers = Object.keys(characterInfo.powerstats);
  return (
    <Row>
      <Col>
        <Image src={characterInfo.image.url} alt="Superhero or Villain" />
      </Col>
      <Col>
        <p>Name: {characterInfo.name}</p>
        <p>Secret Identity: {characterInfo.biography['full-name']}</p>
        <p>Power Stats:</p>
        {powers.map((quality) => (
          <Row>
            <Col>
              <p>{quality}</p>
            </Col>
            <Col md={8}>
              <ProgressBar
                now={characterInfo.powerstats[quality]}
                label={`${characterInfo.powerstats[quality]}`}
              />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
}

export default CharacterCard;