import type { Movie } from "../utils/interfaces";

export default function MovieCard(movie:Movie) {
const _imageBaseUrl = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="w-sm m-3 rounded-3xl relative group overflow-hidden hover:shadow-[0px_0px_10px_var(--color-primary)] transition-all duration-500">
        <img className="rounded-3xl object-cover w-full h-full" src={`${_imageBaseUrl + movie.poster_path}`} alt={movie.title} />
        <div className="absolute bottom-5 right-5 bg-white px-5 py-2 rounded-2xl border-2 border-primary border-solid opacity-80 duration-500 transition-opacity group-hover:opacity-0">{movie.vote_average.toFixed(1)}/10 &#11088;</div>
        <div className="absolute w-full bottom-0 left-0 h-2/3 translate-y-full group-hover:translate-0 transition-all duration-500 p-2 bg-linear-0 from-primary to-transparent flex flex-col gap-5">
            <h1 className="text-white text-4xl font-semibold border-b-2 line-clamp-2 py-2">{movie.title}</h1>
            <p className="line-clamp-4 text-2xl text-bg-color">{movie.overview}</p>
            <div className="absolute bottom-5 right-5 bg-white px-5 py-2 rounded-2xl border-2 border-primary border-solid ">{movie.vote_average.toFixed(1)}/10 &#11088;</div>
        </div>
    </div>
  )
}
