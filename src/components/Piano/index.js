import React from 'react';
import Key from '../Key';
import './Piano.css';

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.keyRef = React.createRef();
  }

  play(notes) {
    notes.forEach((noteObj, index) => {
      const time = noteObj.time;

      setTimeout(() => {
        this.keyRef.current.onClickHandler(noteObj.note);
      }, time);
    })
  };

  render() {
    const { pianoNotes, addNote } = this.props;

    return (
      <div className="Piano">
        {pianoNotes.map(note =>
          <Key key={note} ref={this.keyRef} note={note} addNote={addNote} />
        )}
      </div>
    );
  }
}

export default Piano;
