import { useEffect, useState } from "react"
import type { Movie } from "../../utils/interfaces";
import MovieListing from "../../components/MovieListing";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router";

function TopRated() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true);

    let pageNum = parseInt(useParams()['pageNum'] || '1')
    if (pageNum >= 500) pageNum = 500

    const navigate = useNavigate()

    const [page, setPage] = useState(pageNum ? pageNum : 1);
    const [totalPages, setTotalPages] = useState(500);

    const _baseUrl = "https://api.themoviedb.org/3/movie/top_rated";

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDYyY2ZhZWYwZTE2ZjQ0YmRhODNhNmZjM2Y2OGE4ZiIsIm5iZiI6MTc3NTY0NTQzOS4xNDYsInN1YiI6IjY5ZDYzMmZmNjFjMWNhMDc2ZmY2NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ib-ekzEaAKWsKqpR1rO3n9JV9D_CH2HD6g2fk0T_GzE'
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch(`${_baseUrl}?language=en-US&page=${page}`, options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
                setLoading(false);
            })
            .catch(err => console.error(err));

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]) // Listen for page changes

    if(loading)
        return<div className="h-dvh w-full bg-bg-color flex flex-col justify-center items-center">
            <p className="text-primary tracking-wider ">Loading Archive....</p>
        </div>

    return (
        <div className="flex flex-col items-center pt-32">
            {movies.length > 0 && <MovieListing movies={movies} forcedType="movie" />}

            <Pagination
                pageNumber={page}
                maxPages={totalPages}
                onPageChange={(newPage: number) => {
                    navigate('/top-rated/' + newPage)
                    setPage(newPage)
                }}
            />
        </div>
    )
}

export default TopRated;
