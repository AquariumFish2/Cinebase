import { createContext, useEffect, useState } from "react";
import type { Genre, Movie } from "../utils/interfaces";
import { useParams } from "react-router";

interface MoviesContextType {
    movies: Movie[];
    genres: Genre[];
    page: number;
    setPage: (page: number) => void;
}

export const moviesContext = createContext<MoviesContextType | undefined>(undefined);

export default function MoviesController({ children }: { children: any }) {
    const [movies, setMovies] = useState<Movie[]>([])
    const [genres, setGenres] = useState<Genre[]>([])

    const params = useParams();
    let pageNum = parseInt(params['pageNum'] || '1');
    if (pageNum > 500) pageNum = 500;

    const _baseUrl = "https://api.themoviedb.org/3/movie/";
    const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

    const [page, setPage] = useState(pageNum || 1);

    // Movies List
    useEffect(() => {
        fetch(`${_baseUrl}popular?api_key=${_apiKey}&language=en-US&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                // To get Genres after movies are loaded
                fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=e062cfaef0e16f44bda83a6fc3f68a8f&language=en-US")
                    .then(response => response.json())
                    .then(data => {
                        setGenres(data.genres);
                    });
            }).catch((e) => console.log(e));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page])

    return (
        <moviesContext.Provider value={{ movies, genres, page, setPage }}>
            {children}
        </moviesContext.Provider>
    )
}
