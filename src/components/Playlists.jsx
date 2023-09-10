/**
 * Shows all of the user's playlist.
 */

import heart from "../assets/img/heart.png";
import Playlist from "./Playlist";
import spotifyLogo from "../assets/img/spotify-logo.png";

export default function Playlists(props) {
  return (
    <>
      <div className="playlist-header">
        <h1 className="your-playlists">Your Playlists </h1>
        <img className="spotify-logo" src={spotifyLogo}></img>
        <div className="logo-container"></div>
      </div>
      <div className="playlists">
        <Playlist id="me " coverImage={heart} title="Liked Songs" />
        {props.playlists}
      </div>
    </>
  );
}
