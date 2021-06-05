import axios from 'axios';

export async function getPokemons(urlPrevNext) {
    try {
      const response = await axios.get(`
      ${urlPrevNext? urlPrevNext : 'https://pokeapi.co/api/v2/pokemon/?limit=5&offset=0'}`)
      return response;
    } catch (error) {
      console.error(error);
    }
  }