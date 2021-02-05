import React from "react";

const Tracks = ({ tracks }) => {

	const msToMinAndSec = (ms) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = ((ms % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}

	return (
		<div className="tracks">
			{ tracks.map((track, idx) => {
				return (
					<div key={idx} className="row"> 
						<div className="bigger title">{track.name}</div>
						<div className="bigger artist">{track.artists[0].name}</div>
						<div>{msToMinAndSec(track.duration_ms)}</div>
						<div>{track.tempo.toFixed(2)}</div>
						<div>{track.valence.toFixed(2)}</div>
						<div>{track.energy.toFixed(2)}</div>
						<div>{track.key}</div>
						<div className="bigger"><audio controls src={track.preview_url} type="audio/mp3"></audio></div>
					</div>
				)
			})}
		</div>
	)
}
export default Tracks;