import { useEffect, useState } from 'react';
import './App.css';
import { Credentials } from "./components/Credentials";
import Playlists from "./components/Playlists";
import Tracks from "./components/Tracks";
import Track from "./components/Track";
import axios from "axios";

// Hash from url after logged in
const hash = window.location.hash
	.substring(1)
	.split("&")
	.reduce(function(initial, item) {
		if (item) {
			var parts = item.split("=");
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {});

window.location.hash = "";


// App component
const App = () => {
	const spotify = Credentials();

	const [token, setToken] = useState("");
	const [playlist, setPlaylist] = useState({ selectedPlaylist: "", listOfPlaylistFromAPI: [] });
	const [tracks, setTracks] = useState({ selectedTrack: "", listOfTracksFromAPI: [] });
	const [trackDetail, setTrackDetail] = useState(null);

	useEffect(() => {
		setToken(hash.access_token);
	}, []);

	useEffect(() => {
		if (token) {
			axios('https://api.spotify.com/v1/me/playlists', {
				method: "GET",
				headers: { 'Authorization': 'Bearer ' + token}
			})
			.then(userDataResponse => {
				setPlaylist({
					selectedPlaylist: "",
					listOfPlaylistFromAPI: userDataResponse.data.items
				});
			})
			.catch(error => {
				console.log(error);
			})
		}
	}, [token]);

	const playlistClicked = (event) => {
		setPlaylist({
			selectedPlaylist: event.target.id,
			listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
		})

		// Get tracks
		axios(`https://api.spotify.com/v1/playlists/${event.target.id}/tracks`, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + token }
		})
		.then(tracksResponse => {
			//console.log(tracksResponse);
			setTracks({
				selectedTrack: tracks.selectedTrack,
				listOfTracksFromAPI: tracksResponse.data.items
			})
		})
		.catch((error) => {
			console.log(error);
		})
		// Get audio features for all tracks
	}

	


	const trackClicked = (event) => {
		setTracks({
			selectedTrack: event.target.id,
			listOfTracksFromAPI: tracks.listOfTracksFromAPI
		})

		axios(`https://api.spotify.com/v1/audio-features/${event.target.id}`, {
			method: "GET",
			headers: { "Authorization": "Bearer " + token }
		})
		.then(audioFeaturesResponse => {
			setTrackDetail(audioFeaturesResponse.data);
		})
		.catch(error => {
			console.log(error);
		})
	}

	const getTracks = () => {
		console.log(tracks.listOfTracksFromAPI);
	}

	const getAudioFeatures = () => {
		console.log(trackDetail);
	}

	return (
		<div>
			{
				token 
					? <a href="https://accounts.spotify.com/en/logout">Logout</a>
					: <a href={`https://accounts.spotify.com/authorize?client_id=${spotify.ClientId}&redirect_uri=${spotify.RedirectURI}&response_type=token&scope=${spotify.Scopes.join("%20")}`}>
						Login to Spotify
					  </a>
			}	
			<button onClick={getTracks}>Get Tracks</button>
			<button onClick={getAudioFeatures}>Get Audio Features</button>	
			<div className="container">
				<Playlists 
					playlists={playlist.listOfPlaylistFromAPI}
					clicked={playlistClicked}
				/>

				<Tracks 
					tracks={tracks.listOfTracksFromAPI}
					clicked={trackClicked}
				/>

				<Track 
					details={trackDetail} 
				/>
			</div>
		</div>
	);
}

export default App;
