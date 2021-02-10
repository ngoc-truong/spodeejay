import React from "react";

const Nav = ({ spotify, token }) => {
	return (
		<div className="main-nav">
			<div>Spodeejay</div>
			<nav className="profile">
				{
					token 
						? <a href="https://accounts.spotify.com/en/logout">Logout</a>
						: <a href={`https://accounts.spotify.com/authorize?client_id=${spotify.ClientId}&redirect_uri=${spotify.RedirectURI}&response_type=token&scope=${spotify.Scopes.join("%20")}`}>
							Login to Spotify
						</a>
				}
			</nav>
		</div>
	)
}
export default Nav;