import React from 'react';
import './SongList.css';

class SongList extends React.Component {
  render() {
    const { songs, playSong } = this.props;

    return (
      <div className="SongList">
        <div className="SongList-header">Song titles</div>
        {songs.map((song, index) =>
          <div
            className="SongList-title"
            key={song.title+index}
            onClick={() => { playSong(song); }}>
            {index+1}. {song.title}
          </div>
        )}
      </div>
    );
  }
}

export default SongList;
