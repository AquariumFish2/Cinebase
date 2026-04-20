import { useEffect, useState } from "react"
import type { Movie, Genre } from "../../utils/interfaces";
import MovieListing from "../../components/MovieListing";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router";
import Hero from "./components/Hero";

function Home() {

    const [movies, setMovies] = useState<{ movies: Movie[] }>({ movies: [] })
    const [genres, setGenres] = useState<{ genres: Genre[] }>({ genres: [] })

    let pageNum = parseInt(useParams()['pageNum'])
    if(pageNum > 500) pageNum = 500
    console.log(pageNum)

    const navigate = useNavigate();

    const _baseUrl = "https://api.themoviedb.org/3/movie/";
    const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

    const [page, setPage] = useState(pageNum || 1);

    // Movies List
    useEffect(() => {

        fetch(`${_baseUrl}popular?api_key=${_apiKey}&language=en-US&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setMovies({ movies: data.results });
                // To get Genres after movies are loaded
                fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=e062cfaef0e16f44bda83a6fc3f68a8f&language=en-US")
                    .then(response => response.json())
                    .then(data => {
                        setGenres({ genres: data.genres });
                    });
            }).catch((e) => console.log(e));
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [page])

    return <div className="flex flex-col items-center ">
        <Hero></Hero>
        {movies.movies.length > 0 && <MovieListing movies={movies.movies}></MovieListing>}
        <Pagination pageNumber={page} maxPages={500} onPageChange={(newPage) => {
            navigate('/home/'+newPage)
            setPage(newPage)
            }}></Pagination>
    </div>
}

export default Home