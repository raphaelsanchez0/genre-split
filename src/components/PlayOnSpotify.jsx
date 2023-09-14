/**
 * provides a link for users to access a playlist in
 * their library.
 */

import React from "react";
import spotifyIcon from "../assets/img/spotify-icon.png";

export default function PlayOnSpotify(props) {
  return (<div className="play-on-spotify">
    <p>Play on Spotify </p>
    <img src={spotifyIcon}/>
    </div>
    )
}
