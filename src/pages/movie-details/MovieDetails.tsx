import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import type { Movie } from "../../utils/interfaces";
export default function MovieDetails() {

  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  const _imageBaseUrl = "https://image.tmdb.org/t/p/original/";
  const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${_apiKey}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <div className="h-dvh w-full bg-bg-color flex items-center justify-center text-primary text-2xl animate-pulse uppercase tracking-[1em]">Scanning Archive...</div>;
  return (
    <div className="min-h-screen bg-bg-color text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
        <img 
            src={_imageBaseUrl + movie.backdrop_path} 
            className="w-full h-full object-cover opacity-30" 
            alt="backdrop" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-color to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-6 pt-32 flex flex-col md:flex-row gap-12">

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full md:w-[400px] shrink-0"
        >
          <img 
            src={_imageBaseUrl + movie.poster_path} 
            className="w-full rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            alt={movie.title} 
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-family-logo mb-2">{movie.title}</h1>
          <p className="text-primary italic text-xl mb-6 tracking-wide">{movie.tagline}</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-sm">
                {movie.release_date.split('-')[0]}
            </span>
            <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full text-sm">
                {movie.runtime} MIN
            </span>
            <span className="bg-primary/20 border border-primary text-primary px-4 py-1 rounded-full text-sm font-bold">
                {movie.vote_average.toFixed(1)} ⭐
            </span>
          </div>
          <div className="mb-8">
            <h3 className="text-primary uppercase tracking-[0.3em] font-bold text-sm mb-4">Storyline</h3>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
          </div>
          <div className="mb-10">
            <h3 className="text-primary uppercase tracking-[0.3em] font-bold text-sm mb-4">Genres</h3>
            <div className="flex gap-3 flex-wrap">
              {movie.genres?.map(g => (
                <span key={g.id} className="text-lg font-light py-1 px-3 border-l border-primary/40 bg-white/5">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
          <button className="bg-white text-bg-color px-12 py-4 rounded-sm font-bold tracking-[0.2em] hover:bg-primary transition-all cursor-pointer duration-500">
            WATCH NOW
          </button>
        </motion.div>
      </div>
    </div>
  );
}