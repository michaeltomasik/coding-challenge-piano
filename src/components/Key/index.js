import React from 'react';
import './Key.css';

class Key extends React.Component {
  constructor(props){
    super(props);
  }
  
  playAudio(note) {
    // Allows double click of the same key
    this.sound.pause();
    this.sound.currentTime = 0;

    this.sound.play();
    this.props.addNote(note);
  }

  render() {
    const { note } = this.props;

    return (
      <div className="Key" onClick={() => {this.playAudio(note)}}>
        <div className="Key-note">{note}</div>
        <audio ref={(sound) => { this.sound = sound; }}>
          <source src={`/assets/grand-piano-mp3-sounds/${note}.mp3`} type="audio/mpeg" >
          </source>
        </audio>
      </div>
    );
  }
}

export default Key;
