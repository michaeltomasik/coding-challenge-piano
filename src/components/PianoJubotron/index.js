import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';


const PianoJubotron = ({ openTutorial }) => (
  <Jumbotron>
    <div className="App-Jumbotron-content">
      <h1>Piano App</h1>
      <p>This is a simple piano app that allows you to record your songs and save them in database.</p>
      <p>Technologies: React, Graphql, Nodejs, Mongodb</p>
      <p><b><a href="https://github.com/michaeltomasik/coding-challenge-piano" target="_blank" rel="noopener noreferrer">Source Code</a></b></p>
      <p>
        <Button
          variant="primary"
          onClick={() => { openTutorial(); }}>
          How to use it?
        </Button>
      </p>
    </div>
  </Jumbotron>
);

export default PianoJubotron;
