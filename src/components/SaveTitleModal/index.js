import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { Modal, Button, FormControl } from 'react-bootstrap';

import fetchSongQuery from '../../queries/fetchSongs';
import addSongQuery  from '../../queries/addSong';

import './SaveTitleModal.css';

const SaveTitleModal = ({ isOpen, closeModal, playedNotes, mutate }) => {
  const [title, setTitle] = useState('');

  return (
    <Modal show={isOpen}>
      <Modal.Header>
        <Modal.Title>Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          placeholder="Song title example"
          className="Modal-input"
          onChange={(e) => setTitle(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!title}
          variant="primary"
          onClick={() => {
            mutate({
              variables: {
                title: title,
                keysPlayed: playedNotes,
              },
              refetchQueries: [{ query: fetchSongQuery }]
            }).then((res) => {
              closeModal();
            });
          }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default graphql(addSongQuery)(SaveTitleModal);
