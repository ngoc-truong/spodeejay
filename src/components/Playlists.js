import React from "react";

const Playlists = ({ playlists, clicked }) => {
	return (
		<ul>
		{ 
			playlists.map((playlist, idx) => {
				return (
					<li key={idx + 1}>
						<button 
							id={playlist.id}
							onClick={clicked}>
							{playlist.name}
						</button>
					</li>
				)
			})
		}
		</ul>
	)
}
export default Playlists;