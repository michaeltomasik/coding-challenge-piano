import React from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import fetchSongQuery from '../../queries/fetchSongs';

import './Modal.css';

class Modal extends React.Component {
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

    return isOpen ? (
      <div className="Modal">
        <div className="Modal-content">
          Title
          <input onChange={(e) => this.changeTitle(e.target.value)} />
          <button
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
            }}>Save</button>
        </div>
      </div>
    ) : null;
  }
}

const mutation = gql`
  mutation addSong($title: String, $keysPlayed: [String]) {
    addSong(title: $title, keysPlayed: $keysPlayed){
      title,
      keysPlayed,
    }
  }
`

export default graphql(mutation)(Modal);
