import { useEffect, useState } from 'react';
import './App.css';
import { Credentials } from "./components/Credentials";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import loading from "./images/loading.gif";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
	const [playlists, setPlaylists] = useState([]);
	const [chosenPlaylist, setChosenPlaylist] = useState("");
	const [tracks, setTracks] = useState([]);
	const [trackIds, setTrackIds] = useState([]);
	const [audioFeatures, setAudioFeatures] = useState([]);
	const [tracksWithAudioFeatures, setTracksWithAudioFeatures] = useState([]);
	const [playlistLoading, setPlaylistLoading] = useState(true);

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
				setPlaylists(userDataResponse.data.items);
				setChosenPlaylist(userDataResponse.data.items[0].id);
			})
			.catch(error => {
				console.log(error);
			})
		}
	}, [token]);

	useEffect(() => {
		requestAudioFeatures();
	}, [trackIds]);

	useEffect(() => {
		mergeTracksWithAudioFeatures();
	}, [audioFeatures]);

	useEffect(() => {
		playOnlyOneAudio();
	}, [tracksWithAudioFeatures]);


	const onPlaylistClicked = (event) => {
		setPlaylistLoading(true);
		getTracksOfPlaylist(event.target.id);
		// Bug: Why is no playlist loaded the first time the user logs in?
	}

	const getTracksOfPlaylist = (playlistId) => {
		setChosenPlaylist(playlistId);

		// Get tracks of playlist
		axios(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
			method: 'GET',
			headers: { 'Authorization': 'Bearer ' + token }
		})
		.then(tracksResponse => {
			let trackInfos = [];
			let trackIds = [];

			tracksResponse.data.items.forEach(item => {
				trackInfos.push(item.track);
				trackIds.push(item.track.id);
			})
			setTracks(trackInfos);
			setTrackIds(trackIds);
			setPlaylistLoading(false);
		})
		.catch(error => console.log(error));
	}

	const requestAudioFeatures = async () => {
		if (Array.isArray(trackIds) && trackIds.length > 0) {
			axios(`https://api.spotify.com/v1/audio-features/?ids=${trackIds.toString()}`, {
				method: "GET",
				headers: { "Authorization": "Bearer " + token }
			})
			.then(audioFeaturesResponse => {
				setAudioFeatures(audioFeaturesResponse.data.audio_features);
			})
		}
	}

	const mergeTracksWithAudioFeatures = () => {
		if (tracks.length === audioFeatures.length) {
			setTracksWithAudioFeatures(mergeArrays(tracks, audioFeatures));
		}
	}

	const playOnlyOneAudio = () => {
		window.addEventListener("play", (event) => {
			if(window.$_currentlyPlaying && window.$_currentlyPlaying !== event.target)
			{
				window.$_currentlyPlaying.pause();
			} 
			window.$_currentlyPlaying = event.target;
		}, true);
	}

	// Helper function
	const mergeArrays = (array1, array2) => {
		let mergedArray = [];

		array1.forEach((item, index) => {
			if (item.id === array2[index].id){
				mergedArray.push({...item, ...array2[index]});
			}
		})
		return mergedArray; 
	}

	return (
		<Router>
			<Switch>
				<Route path="/dashboard">
					{ token 
						? <Dashboard 
							playlists={playlists}
							chosenPlaylist={chosenPlaylist}
							onPlaylistClicked={onPlaylistClicked}
							spotify={spotify}
							token={token}
							playlistLoading={playlistLoading}
							loading={loading}
							tracksWithAudioFeatures={tracksWithAudioFeatures}
							/>
						: <Redirect to="/" />
					}
				</Route>
				<Route exact path="/">
					{ token ? <Redirect to="/dashboard" /> : <Home spotify={spotify}/>}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;

/* 
To Do:
- Get more than 100 songs
- Fix bug with loading image
- When logged out, redirect to Homepage (instead of Spotify)
- Style homepage
- Add default playlist on dashboard when log in
- Move individual row (drag), e.g. with Sortable.js

More difficult:
- // Sort items on click at table header
- Add button to sort lists in a wavy order (bpm + valence/energy)
- Save playlists in account/export it to spotify
- User is able to correct BPM number
*/