const API_KEY = "10bff6291faf8086404cf4ea07208429";
// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IFetchMoviesResult {
  page: number;
  results: IMovie[];
  dates: {
    maximum: string;
    mininum: string;
  };
  total_pages: number;
  total_results: number;
}
/*export async function fetchMovies() {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  );
  return await response.json();
}*/
export function fetchMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
