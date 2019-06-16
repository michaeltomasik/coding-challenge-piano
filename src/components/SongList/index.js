import React from 'react';
import './SongList.css';

class SongList extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { songs, playSong } = this.props;

    return (
      <div className="SongList">
        {songs.map((song, index) =>
          <div key={song.title+index} onClick={() => { playSong(song); }}>
            {index+1}. Title: {song.title}
          </div>
        )}
      </div>
    );
  }
}

export default SongList;
