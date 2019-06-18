import React from 'react';
import { Table } from 'react-bootstrap';

import './SongList.css';

class SongList extends React.Component {
  render() {
    const { songs, playSong } = this.props;

    return (
      // <Table striped bordered hover>
      //   <thead>
      //     <tr>
      //       <th>Song titles</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     <tr>
      //       <td>1</td>
      //     </tr>
      //   </tbody>
      // </Table>
      <div className="SongList">

        <Table striped bordered hover>
          <thead>
            <tr>
              <th><h3>Song titles</h3></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) =>
              <tr>
                <td
                  className="SongList-title"
                  key={song.title+index}
                  onClick={() => { playSong(song); }}>
                  {index+1}. {song.title}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {/* <div className="SongList-header">Song titles</div>
        {songs.map((song, index) =>
          <div
            className="SongList-title"
            key={song.title+index}
            onClick={() => { playSong(song); }}>
            {index+1}. {song.title}
          </div>
        )} */}
      </div>
    );
  }
}

export default SongList;
