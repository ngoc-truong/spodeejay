import React from "react";

const Playlists = ({ playlists, chosenPlaylist, onPlaylistClicked }) => {
  return (
    <div>
      <h1>Playlists</h1>
      <ul>
        {playlists.map((playlist, idx) => {
          if (chosenPlaylist === playlist.id) {
            return (
              <li
                className="highlighted"
                key={idx + 1}
                id={playlist.id}
                onClick={onPlaylistClicked}
              >
                {playlist.name}
              </li>
            );
          } else {
            return (
              <li key={idx + 1} id={playlist.id} onClick={onPlaylistClicked}>
                {playlist.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
export default Playlists;
