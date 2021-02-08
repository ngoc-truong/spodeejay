import { useEffect, useState } from 'react';
import './App.css';
import { Credentials } from "./components/Credentials";
import Nav from "./components/Nav";
import Playlists from "./components/Playlists";
import TracksTable from "./components/TracksTable";
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
		setChosenPlaylist(event.target.id);
		// Get tracks of playlist
		axios(`https://api.spotify.com/v1/playlists/${event.target.id}/tracks`, {
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
		<div className="container">
			<div className="box playlist-nav">
				<Playlists 
					playlists={playlists}
					chosenPlaylist={chosenPlaylist}
					clicked={onPlaylistClicked}
				/>
			</div>
		
			<div className="box content">
				<Nav spotify={spotify} token={token} />
				<TracksTable 
					tracks={tracksWithAudioFeatures}
				/>
			</div>
		</div>
	);
}

export default App;

/* 
To Do:
- Fixed table header and let it be directly over the correct columns
- Get more than 100 songs
- Add loading when clicked

More difficult:
- Sort items on click at table header
- Add button to sort lists in a wavy order (bpm + valence/energy)
- Save playlists in account
- User is able to correct BPM number
*/