import React from 'react';
import Key from '../Key';
import './Piano.css';

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playedNotes: [],
    };

    this.addNote = this.addNote.bind(this);
  }

  addNote(note) {
    console.log(note);
    this.setState({
      playedNotes: [...this.state.playedNotes, note],
    });
  }

  render() {
    const { pianoNotes } = this.props;

    return (
      <>
        <div className="Piano">
          {pianoNotes.map(note =>
            <Key note={note} addNote={this.addNote} />
          )}
        </div>
        <div>Played Notes: [{this.state.playedNotes.join(', ')}]</div>
      </>
    );
  }
}

export default Piano;
