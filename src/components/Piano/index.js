import React from 'react';
import Key from '../Key';
import './Piano.css';

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.keyRef = React.createRef();
  }

  play(notes) {
    console.log(this.props.playedNotes);
    notes.forEach((note, index) => {
      console.log(note);
      const time = 200*index;
      setTimeout(() => {
        this.keyRef.current.onClickHandler(note);
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
