import { useContext } from "react"
import MovieListing from "../../components/MovieListing";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router";
import Hero from "./components/Hero";
import Companies from "./components/Companies";
import { moviesContext } from "../../controllers/MoviesController";

function Home() {

    const navigate = useNavigate()
    const { movies, page, setPage } = useContext(moviesContext)!;

    const { pageNum } = useParams()
    setPage(parseInt(pageNum || '1'));
    return <div className="flex flex-col items-center ">
        <div className="h-20"></div>
        <Hero></Hero>
        <Companies></Companies>
        {movies.length > 0 && <MovieListing movies={movies} forcedType="movie" />}
        <Pagination pageNumber={page} maxPages={500} onPageChange={(newPage: number) => {
            navigate('/home/' + newPage)
            setPage(newPage)
        }}></Pagination>
    </div>
}

export default Home