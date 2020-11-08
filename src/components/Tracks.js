import React from "react";

const Tracks = ({ tracks, clicked }) => {
	return (
		<ul>
		{ 
			tracks.map((track, idx) => {
				return (
					<li key={idx + 1}>
						<button 
							id={track.track.id}
							onClick={clicked}>
							{track.track.name}
						</button>
						<audio 
							
							src={track.track.preview_url}
							type="audio/mp3"
						></audio>
					</li>
				)
			})
		}
	</ul>
	)
}
export default Tracks;