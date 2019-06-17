import React from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import logo from './logo.svg';
import Piano from './components/Piano';
import Modal from './components/Modal';
import SongList from './components/SongList';

import fetchSongQuery from './queries/fetchSongs';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playedNotes: [],
      isRecordMode: false,
      showPopup: false,
      songs: props.data.songs// [{ title: 'TEST', keysPlayed: ['A1', 'B1'], }],
    };

    this.pianoRef = React.createRef();

    this.addNote = this.addNote.bind(this);
    this.switchRecordMode = this.switchRecordMode.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.playSong = this.playSong.bind(this);
  }

  addNote(note) {
    if (this.state.isRecordMode) {
      this.setState({
        playedNotes: [...this.state.playedNotes, note],
      });
    }
  }

  switchRecordMode() {
    this.setState({
      isRecordMode: !this.state.isRecordMode,
      showPopup: this.state.isRecordMode,
    })
  }

  playSong(song) {
    if (!this.state.isRecordMode) {
      this.pianoRef.current.play(song.keysPlayed);
    }
  }

  closeModal() {
    this.setState({
      showPopup: false,
    });
  }

  render() {
    const { playedNotes, isRecordMode, showPopup, songs } = this.state;
    const pianoNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5'];

    return (
      <div className="App">
        <div>
          <Piano
            ref={this.pianoRef}
            playedNotes={playedNotes}
            pianoNotes={pianoNotes}
            addNote={this.addNote} />
          <button onClick={this.switchRecordMode}>
            {isRecordMode ?
              <div>STOP</div> :
              <div>Start Recording</div>}
          </button>
        </div>
        <div>Played Notes: [{playedNotes.join(', ')}]</div>
        {this.props.data.loading ? 'Loading...' :
          <SongList songs={this.props.data.songs || []} playSong={this.playSong} />
        }
        <Modal
          isOpen={showPopup}
          closeModal={this.closeModal}
          playedNotes={playedNotes} />
      </div>
    );
  }
}

export default graphql(fetchSongQuery)(App);
