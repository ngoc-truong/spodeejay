import React from "react";

const Home = ({ spotify }) => {
    return (
        <a href={`https://accounts.spotify.com/authorize?client_id=${spotify.ClientId}&redirect_uri=${spotify.RedirectURI}&response_type=token&scope=${spotify.Scopes.join("%20")}`}>
            Login to Spodeejay
        </a>
    )
};

export default Home;