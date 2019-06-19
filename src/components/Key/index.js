import React from 'react';
import './Key.css';

class Key extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      active: '',
    }
  }
  
  onClickHandler(note, showClicked=false) {
    // Allows double click of the same key
    if (showClicked) {
      this.setState({ active: note });
      setTimeout(() => {
        this.setState({
          active: '',
        })
      }, 500);
    }

    var audio = new Audio();
    audio.src = `/assets/grand-piano-mp3-sounds/${note}.mp3`;

    audio.play();
    
    this.props.addNote(note);
  }

  render() {
    const { note } = this.props;

    return (
      <div className={`${note.length === 2 ? 'Key-white' : 'Key-black' }
        ${this.state.active === note ? 'Key-active' : ''}`}
        onClick={() => { this.onClickHandler(note, true); }}>
        <div
          className={`Key-note
          ${this.state.active === note ? 'Key-note-active' : ''}`}>
            {note}</div>
      </div>
    );
  }
}

export default Key;
