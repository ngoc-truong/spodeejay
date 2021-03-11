import React from "react";
import Nav from "./Nav";
import Playlists from "./Playlists";
import TracksTable from "./TracksTable";

const Dashboard = ({
  playlists,
  chosenPlaylist,
  onPlaylistClicked,
  spotify,
  token,
  playlistLoading,
  loading,
  tracksWithAudioFeatures,
}) => {
  return (
    <div className="container">
      <div className="box playlist-nav">
        <Playlists
          playlists={playlists}
          chosenPlaylist={chosenPlaylist}
          onPlaylistClicked={onPlaylistClicked}
        />
      </div>

      <div className="box content">
        <Nav spotify={spotify} token={token} />
        {playlistLoading ? (
          <img
            className="loading-gif"
            src={loading}
            alt="Loading playlist..."
          />
        ) : (
          <TracksTable tracksWithAudioFeatures={tracksWithAudioFeatures} />
        )}
      </div>
      {console.log(tracksWithAudioFeatures)}
    </div>
  );
};

export default Dashboard;
