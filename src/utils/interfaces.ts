export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  backdrop_path: string;
  runtime?: number;
  genres: { id: number; name: string }[];
  tagline: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface PropsInterface {
    setMovies: React.Dispatch<React.SetStateAction<{ movies: Movie[] }>>;
    setGenres: React.Dispatch<React.SetStateAction<{ genres: Genre[] }>>;
}

export interface HomeProps {
  movies: { movies: Movie[] };
  genres: { genres: Genre[] };
}

export interface Profile {
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  favorites_count?: number;
}

export type FavoriteType = 'movie' | 'company' | 'cast';

export interface Favorite {
  vote_average: number|null;
  id: string;
  user_id: string;
  type: FavoriteType;
  favorite_id: number; // TMDB ID
  poster_path: string;
  title: string;
  overview: string;
}

