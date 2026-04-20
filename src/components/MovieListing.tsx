import type { Movie } from "../utils/interfaces";
import MovieCard from "./MovieCard";
import { Link } from "react-router";

export default function MovieListing(movies: {movies: Movie[]}) {
    return (
        <div className="flex flex-row w-full h-fit flex-wrap justify-center bg-bg-color">
            {movies.movies.map((movie) => <Link to={`/movie/${movie.id}`}><MovieCard key={movie.id} {...movie} /></Link>)}
        </div>
    )
}
