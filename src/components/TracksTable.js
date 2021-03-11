import React from "react";

const TracksTable = ({ tracksWithAudioFeatures }) => {
  const msToMinAndSec = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const sortArrayBy = (array, property, direction) => {
    if (direction === "asc") {
      return array.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    } else {
      return array.sort((a, b) => (a[property] > b[property] ? -1 : 1));
    }
  };

  return (
    <table className="tracksWithAudioFeatures">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th className="number">Duration</th>
          <th className="number">BPM</th>
          <th className="number"> Valence</th>
          <th className="number">Energy</th>
          <th className="number">Key</th>
          <th>Play</th>
        </tr>
      </thead>
      <tbody>
        {sortArrayBy(tracksWithAudioFeatures, "duration_ms", "asc").map(
          (track, idx) => {
            return (
              <tr key={idx}>
                <td className="title">{track.name}</td>
                <td>{track.artists[0].name}</td>
                <td className="number">{msToMinAndSec(track.duration_ms)}</td>
                <td className="number">{track.tempo.toFixed(2)}</td>
                <td className="number">{track.valence.toFixed(2)}</td>
                <td className="number">{track.energy.toFixed(2)}</td>
                <td className="number">{track.key}</td>
                <td>
                  <audio
                    controls
                    src={track.preview_url}
                    type="audio/mp3"
                  ></audio>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};
export default TracksTable;
