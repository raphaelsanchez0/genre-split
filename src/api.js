import axios from 'axios';

export async function getTopArtists(token) {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.items;
    } catch (error) {
      console.log(error);
      return [];
    }
  }