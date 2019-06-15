import React from 'react';
import Key from '../Key';
import './Piano.css';

class Piano extends React.Component {
  render() {
    const { pianoNotes } = this.props;

    return (
      <div className="Piano">
        {pianoNotes.map(note =>
          <Key note={note} />
        )}
      </div>
    );
  }
}

export default Piano;
