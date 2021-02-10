import React from "react";

const Home = ({ spotify }) => {
    return (
        <div>
            <h1>Mehr Zeit zum Tanzen</h1>
            <p>Spodeejay sortiert deine Playlists nach deinen Wünschen. So bleibt dir mehr Zeit, um deine Musik zu genießen.</p>
            <a className="button" href={`https://accounts.spotify.com/authorize?client_id=${spotify.ClientId}&redirect_uri=${spotify.RedirectURI}&response_type=token&scope=${spotify.Scopes.join("%20")}`}>
                Login to Spodeejay
            </a>
        </div> 
    )
};

export default Home;