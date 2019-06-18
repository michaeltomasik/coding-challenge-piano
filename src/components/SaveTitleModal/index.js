import React from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import { Modal, Button, FormControl } from 'react-bootstrap';

import fetchSongQuery from '../../queries/fetchSongs';

import './SaveTitleModal.css';

class SaveTitleModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    }
  }

  changeTitle(title) {
    this.setState({ title });
  }

  render() {
    const { isOpen, closeModal, playedNotes, mutate } = this.props;

    return (
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Song title example"
            className="Modal-input"
            onChange={(e) => this.changeTitle(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!this.state.title}
            variant="primary"
            onClick={() => {
              mutate({
                variables: {
                  title: this.state.title,
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
}

const mutation = gql`
  mutation addSong($title: String, $keysPlayed: [NoteInput]) {
    addSong(title: $title, keysPlayed: $keysPlayed){
      title
      keysPlayed {
        note
        time
      }
    }
  }
`

export default graphql(mutation)(SaveTitleModal);
