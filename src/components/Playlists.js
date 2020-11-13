import React from "react";

const Playlists = ({ playlists, clicked }) => {
	return (
		<div>
			<h1>Playlists</h1>
			<ul>
			{ 
				playlists.map((playlist, idx) => {
					return (
						<li 
							key={idx + 1}
							id={playlist.id}
							onClick={clicked}
						>
							{playlist.name}
						</li>
					)
				})
			}
			</ul>	
		</div>
		
	)
}
export default Playlists;