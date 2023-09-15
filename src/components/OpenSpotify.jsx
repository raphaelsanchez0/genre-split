/**
 * provides a link for users to access a playlist in
 * their library.
 */

import React from "react";
import spotifyIcon from "../assets/img/spotify-icon.png";
import { Link } from "react-router-dom";

export default function PlayOnSpotify(props) {
  return (
    <Link to={props.link}
      className="play-on-spotify"
      target="_blank"
      rel="noopener noreferrer">
      <p>Open Spotify</p>
      <img src={spotifyIcon} />
    </Link>

    // <button className="play-on-spotify">
    //   <p>Play on Spotify </p>
    //   <img src={spotifyIcon} />
    // </button>

  )
}
