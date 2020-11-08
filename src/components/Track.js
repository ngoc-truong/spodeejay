import React from "react";

const Track = ({ details }) => {
	return (
		<div>
			{ details && 
				<ul>
					<li>Danceability: {details.danceability}</li>
					<li>Energy: {details.energy}</li>
					<li>Key: {details.key}</li>
					<li>Tempo: {details.tempo}</li>
					<li>Duration: {details.duration_ms}</li>
					<li>Valence: {details.valence}</li>
				</ul>
			}
		</div>
	)
}

export default Track;