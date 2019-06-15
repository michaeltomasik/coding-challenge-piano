import React from 'react';
import './Key.css';

class Key extends React.Component {
  constructor(props){
    super(props);
  }
  
  playAudio() {
    this.sound.play();
  }

  render() {
    const { note } = this.props;

    return (
      <div className="Key" onClick={() => {this.playAudio()}}>
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
