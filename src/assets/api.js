import axios from 'axios';

export async function getTopItems(token, type, limit) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        limit: limit
      }
    });
    return response.data.items;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getUserId(token) {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.id
  } catch (error) {
    console.log(error)
  }
}

export async function getLikedTracks(token) {
  const limit = 50;
  let offset = 0;
  let allTracks = []
  while (true) {
    const url = `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await axios.get(url, { headers })
      const data = response.data;

      //adds items to allTracks
      const items = data.items
      allTracks = allTracks.concat(items)

      //checks if number of linked songs is less then the current offset
      if (items.length < limit) {
        break
      }

      offset += limit;
    } catch (error) {
      console.error(`Error retreiving tracks:${error}`)
      break
    }
  }
  return allTracks
}

export async function getPlaylistInfo(token, playlist_id) {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`
  const headers = {
    Authorization: `Bearer ${token}`
  };
  try {
    const response = await axios.get(url, { headers })
    return response.data;
  } catch (error) {
    console.error(`Error retreiving playlist tracks:${error}`)
  }
}

export async function getUserPlaylists(token) {
  const limit = 50;
  let offset = 0;
  let allUserPlaylists = []
  while (true) {
    const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await axios.get(url, { headers })
      const data = response.data;

      //add playlists to allUserPlaylists
      const items = data.items
      allUserPlaylists = allUserPlaylists.concat(items)

      if (items.length < limit) {
        break
      }

      offset += limit;


    } catch (error) {
      console.error(`Error retreiving user playlists:${error}`)
      break
    }
  }
  return allUserPlaylists;
}

export async function getArtistGenre(token, id) {
  let genre = ""
  const url = `https://api.spotify.com/v1/artists/${id}`
  const headers = {
    Authorization: `Bearer ${token}`
  };
  try {
    const response = await axios.get(url, { headers })
    const data = response.data
    const genre = data.genres
    return genre
  } catch (error) {
    console.log(`Error getting artist genre:${error}`)
  }
}

export async function createPlaylist(token, name, userId) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`
  const requestBody = {
    name: name
  }
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  try {
    const response = await axios.post(url, requestBody, { headers });
    return (response.data)

  } catch (err) {
    console.log
  }
}



export async function addToPlaylist(token, playlistId, playlistObject) {

}

export function convertToSpotifyURI(trackId) {
  return `spotify:track:${trackId}`;
}

export function createArrayOfFormatedSpotifyURIs(arrayOfTracks) {
  let URIs = []
  arrayOfTracks.forEach(track => {
    const formattedURI = convertToSpotifyURI(track.id)
    URIs.push(formattedURI)
  });
  return URIs
}