import React from 'react';
import { graphql } from 'react-apollo';
import { Jumbotron, Button } from 'react-bootstrap';
import Joyride from 'react-joyride';

import Piano from './components/Piano';
import SaveTitleModal from './components/SaveTitleModal';
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
      showTutorial: false,
      steps: [
        {
          target: '.circle',
          content: 'Click Here to start Recording Your song',
          disableBeacon: true,
        },
        {
          target: '.Piano',
          content: 'Play your favourite song by click on piano keys',
          disableBeacon: true,
        },
        {
          target: '.circle',
          content: 'When you finish click stop button that will appear here',
          disableBeacon: true,
        },
        {
          target: '.SongList',
          content: 'After you save your song it should apper in Song titles! To play it again simply press your song title.',
          disableBeacon: true,
        },
      ],
    };

    this.pianoRef = React.createRef();

    this.addNote = this.addNote.bind(this);
    this.switchRecordMode = this.switchRecordMode.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.playSong = this.playSong.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
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

  handleJoyrideCallback(data) {
    const { joyride } = this.props;

    if (joyride && typeof joyride.callback === "function") {
      joyride.callback(data);
    } else {
      if(data.action === 'reset') {
        this.setState({ showTutorial: false });
      }
    }
  };

  
  render() {
    const { playedNotes, isRecordMode, showPopup, steps, showTutorial } = this.state;
    const pianoNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4', 'C5'];

    return (
      <>
        <Jumbotron>
          <div className="App-Jumbotron-content">
            <h1>Piano App</h1>
            <p>This is a simple piano app that allows you to record your songs and save them in database.</p>
            <p>Technologies: React, Graphql, Nodejs, Mongodb</p>
            <p><b><a href='https://github.com/michaeltomasik/coding-challenge-piano'>Source Code</a></b></p>
            <p>
              <Button
                variant="primary"
                onClick={() => {
                  this.setState({ showTutorial: true })
                }}>How to use it?</Button>
            </p>
          </div>
        </Jumbotron>
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
                <div className="circle">
                {!isRecordMode ?
                  <div>
                    <div
                      onClick={this.switchRecordMode}
                      className="record"></div>
                  </div> :
                  <div>
                    <div
                      onClick={this.switchRecordMode}
                      className="stop"></div>
                  </div>}
                </div>
                {isRecordMode ? 'Recording...' : null}
              </div>
          </div>
          <Joyride
            steps={steps}
            run={showTutorial}
            callback={this.handleJoyrideCallback}
            showSkipButton
            continuous
            scrollToFirstStep />
          <SaveTitleModal
            isOpen={showPopup}
            closeModal={this.closeModal}
            playedNotes={playedNotes} />
        </div>
      </>
    );
  }
}

export default graphql(fetchSongQuery)(App);
