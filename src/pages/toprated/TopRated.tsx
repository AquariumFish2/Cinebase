import { useEffect, useState } from "react"
import type { Movie, Genre } from "../../utils/interfaces";
import MovieListing from "../../components/MovieListing";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router";

function TopRated() {
    const [movies, setMovies] = useState<{ movies: Movie[] }>({ movies: [] })
    const [genres, setGenres] = useState<{ genres: Genre[] }>({ genres: [] })

    let pageNum = parseInt(useParams()['pageNum'])
    if(pageNum >= 500) pageNum = 500
    console.log(pageNum)
    const navigate = useNavigate()

    const [page, setPage] = useState(pageNum?pageNum:1);
    const [totalPages, setTotalPages] = useState(500);

    const _baseUrl = "https://api.themoviedb.org/3/movie/top_rated";
    const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDYyY2ZhZWYwZTE2ZjQ0YmRhODNhNmZjM2Y2OGE4ZiIsIm5iZiI6MTc3NTY0NTQzOS4xNDYsInN1YiI6IjY5ZDYzMmZmNjFjMWNhMDc2ZmY2NjU3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ib-ekzEaAKWsKqpR1rO3n9JV9D_CH2HD6g2fk0T_GzE'
        }
    };

    useEffect(() => {
        fetch(`${_baseUrl}?language=en-US&page=${page}`, options)
            .then(res => res.json())
            .then(data => {
                setMovies({ movies: data.results });
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
                
                fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", options)
                    .then(response => response.json())
                    .then(data => {
                        setGenres({ genres: data.genres });
                    });
            })
            .catch(err => console.error(err));

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]) // Listen for page changes

    return (
        <div className="flex flex-col items-center">
            {movies.movies.length > 0 && <MovieListing movies={movies.movies}></MovieListing>}
            
            <Pagination 
                pageNumber={page} 
                maxPages={totalPages} 
                onPageChange={(newPage) => {
                    navigate('/top-rated/'+newPage)
                    setPage(newPage)
                }} 
            />
        </div>
    )
}

export default TopRated;
