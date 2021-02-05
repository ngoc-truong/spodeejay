import React from "react";

const Playlists = ({ playlists, chosenPlaylist, clicked}) => {
	return (
		<div>
			<h1>Playlists</h1>
			<ul>
			{ 
				playlists.map((playlist, idx) => {
					if (chosenPlaylist === playlist.id) {
						return (
							<li 
								className="highlighted"
								key={idx + 1}
								id={playlist.id}
								onClick={clicked}
							>
							{playlist.name}
						</li>
						)
					} else {
						return (
							<li 
								key={idx + 1}
								id={playlist.id}
								onClick={clicked}
							>
								{playlist.name}
							</li>
						)
					}
				})
			}
			</ul>	
		</div>
		
	)
}
export default Playlists;