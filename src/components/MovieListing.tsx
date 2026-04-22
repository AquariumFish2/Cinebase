import type { Movie } from "../utils/interfaces";
import MovieCard from "./MovieCard";
import { Link } from "react-router";

export default function MovieListing({ movies, forcedType }: { movies: Movie[]; forcedType?: 'movie' | 'tv' }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 py-12 w-full max-w-7xl mx-auto">
            {movies.map((movie: any) => (
                <Link to={`/${movie.media_type || forcedType || 'movie'}/${movie.id}`} key={movie.id}>
                    <MovieCard {...movie} />
                </Link>
            ))}
        </div>
    );
}
