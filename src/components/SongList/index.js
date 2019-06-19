import React from 'react';
import { Table } from 'react-bootstrap';

import './SongList.css';

const SongList = ({ songs, playSong }) => (
  <div className="SongList">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th><h3>Song titles</h3></th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, index) =>
          <tr key={song.title+index}>
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
  </div>
);

export default SongList;
