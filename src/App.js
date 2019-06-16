import React from 'react';
import logo from './logo.svg';
import Piano from './components/Piano';
import Modal from './components/Modal';
import SongList from './components/SongList';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playedNotes: [],
      isRecordMode: false,
      showPopup: false,
      songs: [{ title: 'TEST', notes: ['A1', 'B1'], }],
    };

    this.pianoRef = React.createRef();

    this.addNote = this.addNote.bind(this);
    this.switchRecordMode = this.switchRecordMode.bind(this);
    this.saveSong = this.saveSong.bind(this);
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
    // let additionalChanges = {}
    // if (this.state.isRecordMode) {
    //   additionalChanges = {
    //     showPopup: true,
    //   }
    // }
    this.setState({
      isRecordMode: !this.state.isRecordMode,
      showPopup: this.state.isRecordMode,
    })
  }

  playSong(song) {
    this.pianoRef.current.play(song.notes);
  }

  saveSong(title) {
    this.setState({
      showPopup: false,
      songs: [
        ...this.state.songs,
        { title, notes: this.state.playedNotes }
      ],
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
        <SongList songs={songs} playSong={this.playSong} />
        <Modal
          isOpen={showPopup}
          saveSong={this.saveSong} />
      </div>
    );
  }
}

export default App;
