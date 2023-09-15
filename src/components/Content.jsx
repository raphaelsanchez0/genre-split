import { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import heart from "../assets/img/heart.png";
import { tokenState, userPlaylistsState } from "../assets/atoms";
import { getUserPlaylists } from "../assets/api";
import noImage from "../assets/img/no-image.svg";

import Playlist from "./Playlist";
import Playlists from "./Playlists";
import LoginPage from "./LoginPage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PlaylistSplitter from "./PlaylistSplitter";
import PlaylistCreator from "./PlaylistCreator";
import Footer from "./Footer";
import Landing from "./Landing";
import Privacy from "./Privacy";

export default function Content() {
  const [token, setToken] = useRecoilState(tokenState);
  const [receivedPlaylists, setReceivedPlaylists] = useState(true);
  const [userPlaylists, setUserPlaylists] = useRecoilState(userPlaylistsState);
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundColor =
    location.pathname === "/creator"
      ? "white"
      : location.pathname === "/login"
        ? "#223122"
        : "";
  // const backgroundColor = location.pathname === "/creator" || location.pathname === "/login" ? "white" : "";
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/`);
    }

    // Use a Promise to wait for the token to exist
    const getTokenPromise = new Promise((resolve) => {
      if (token) {
        resolve();
      }
    });

    // Only make the API request once the token exists
    getTokenPromise.then(async () => {
      try {
        const userPlaylists = await getUserPlaylists(token);
        setUserPlaylists(userPlaylists);
      } catch (error) {
        console.log(error);
      }
    });
  }, [token]);

  const playlists = userPlaylists.map((playlist) => {

    const coverImage = playlist.images[0] ? playlist.images[0].url : noImage;
    return (
      <Playlist
        id={playlist.id}
        coverImage={coverImage}
        title={playlist.name}
        numOfTracks={playlist.tracks.total}
        link={playlist.external_urls.spotify}
      />
    );
  });

  return (
    <div className="content" style={{ backgroundColor: backgroundColor }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Playlists playlists={playlists} />} />
        <Route path="/splitter/:id" element={<PlaylistSplitter />} />
        <Route path="/splitter/me" element={<PlaylistSplitter />} />
        <Route path="/creator/" element={<PlaylistCreator />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </div>
  );
}
