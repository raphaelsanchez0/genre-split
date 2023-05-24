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
  console.log(allTracks.length)
  return allTracks
}