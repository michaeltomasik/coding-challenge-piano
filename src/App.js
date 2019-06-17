import React from 'react';
import { graphql } from 'react-apollo';

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
      startSongDate: null,
    };

    this.pianoRef = React.createRef();

    this.addNote = this.addNote.bind(this);
    this.switchRecordMode = this.switchRecordMode.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.playSong = this.playSong.bind(this);
  }

  addNote(note) {
    if (this.state.isRecordMode) {
      const noteObj = {
        note,
        time: this.state.playedNotes[0] ?
          (new Date() - this.state.startSongDate).toFixed(2) : 0,
      };
      this.setState({
        startSongDate:
          this.state.playedNotes[0] ? this.state.startSongDate : new Date(),
        playedNotes: [...this.state.playedNotes, noteObj],
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
    const { playedNotes, isRecordMode, showPopup } = this.state;
    const pianoNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5'];

    return (
      <div className="App">
        {this.props.data.loading ? 'Loading...' :
          <SongList songs={this.props.data.songs || []} playSong={this.playSong} />
        }
        <div className="App-piano-container">
          <Piano
            ref={this.pianoRef}
            playedNotes={playedNotes}
            pianoNotes={pianoNotes}
            addNote={this.addNote} />
            <div>
              <div
                onClick={this.switchRecordMode}
                className="record"></div>
              {isRecordMode ?
                'Stop Recording' :
                'Start Recording'}
            </div>
        </div>
        {/* <div>Played Notes: [{playedNotes.join(', ')}]</div> */}
        <Modal
          isOpen={showPopup}
          closeModal={this.closeModal}
          playedNotes={playedNotes} />
      </div>
    );
  }
}

export default graphql(fetchSongQuery)(App);
