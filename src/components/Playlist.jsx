/**
 * Shows information about the playlist, including the name,
 * picture, number of tracks. Has a button for the user to select
 * it for splitting.
 */
import shuffle from "../assets/img/shuffle.svg";
import musicNote from "../assets/img/music-note.png";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import PlayOnSpotify from "./OpenSpotify";

export default function Playlist(props) {
  const location = useLocation();
  const isInSplitter = location.pathname.startsWith("/splitter");

  const renderSongsStat =
    props.title !== "Liked Songs" ? (
      <div className="songs-stat">
        <img className="music-note" src={musicNote}></img>
        <h3>{props.numOfTracks} Tracks</h3>
      </div>
    ) : null;


  return (
    <div className="playlist">
      <img src={props.coverImage} className="cover-image" />
      <div className="text">
        <h2 className="playlist-name">{props.title}</h2>
        {renderSongsStat}
        {props.link ?
          <PlayOnSpotify link={props.link} />
          : null}

      </div>
      {!isInSplitter ? (
        <Link to={`splitter/${props.id}`} className="shuffle-btn">
          <button>
            <img src={shuffle}></img>
          </button>
        </Link>
      ) : (
        <></>
      )}

    </div>
  );
}
