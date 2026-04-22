import { favoritesContext } from "../../controllers/FavoritesController";
import { authContext } from "../../controllers/AuthController";
import { useNotification } from "../../controllers/NotificationController";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { FavoriteType, Movie } from "../../utils/interfaces";

import MediaHero from "./components/MediaHero";
import MediaNarrative from "./components/MediaNarrative";
import MediaActions from "./components/MediaActions";
import MediaCast from "./components/MediaCast";
import MediaCompanies from "./components/MediaCompanies";
import MediaRecommendations from "./components/MediaRecommendations";

export default function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [cast, setCast] = useState<any[]>([]);
  const { showNotification } = useNotification();

  const { isFavorite, addFavorite, removeFavorite } = useContext(favoritesContext)!;
  const { user } = useContext(authContext)!;

  const _imageBaseUrl = "https://image.tmdb.org/t/p/original/";
  const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

  // Determine media type from URL path
  const mediaType = location.pathname.startsWith('/tv') ? 'tv' : 'movie';

  useEffect(() => {
    const fetchAllData = async () => {
      setMovie(null); // Reset state to show loading during transition
      try {
        const [movieRes, similarRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${_apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?api_key=${_apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${_apiKey}&language=en-US`)
        ]);

        const movieData = await movieRes.json();
        const similarData = await similarRes.json();
        const creditsData = await creditsRes.json();

        setMovie(movieData);
        setSimilarMovies(similarData.results?.slice(0, 8) || []);
        setCast(creditsData.cast?.slice(0, 10) || []);
        
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [id, mediaType]);


  const handleFavoriteToggle = async () => {
    if (!movie) return;
    
    if (isFavorite(movie.id, mediaType as FavoriteType)) {
      await removeFavorite(movie.id, mediaType as FavoriteType);
      showNotification(`Removed ${mediaType} from archive`, "error");
    } else {
      const result = await addFavorite({
        favorite_id: movie.id,
        type: mediaType as FavoriteType,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: movie.vote_average
      });

      if (result.success) {
        showNotification(result.message || "Saved to archive", "success");
      } else {
        showNotification(result.message || "Failed to save", "error");
      }
    }
  };

  if (!movie) return <div className="h-dvh w-full bg-bg-color flex items-center justify-center text-primary text-2xl animate-pulse uppercase tracking-[1em]">Scanning Archive...</div>;
  
  const isFav = isFavorite(movie.id, mediaType as FavoriteType);

  return (
    <div className="min-h-screen bg-bg-color text-white relative overflow-hidden pb-20">

      {/* Cinematic Backdrop */}
      {movie.backdrop_path && (
        <div className="absolute top-0 left-0 w-full h-[70vh] z-0">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            className="w-full h-full object-cover opacity-40"
            alt="backdrop"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-color via-bg-color/40 to-transparent" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-6 pt-32 lg:pt-48">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-96 shrink-0 flex justify-center lg:block">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              className="w-72 lg:w-full rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10"
              alt={movie.title || movie.name}
            />
          </div>

          <div className="flex-1">
            <MediaHero movie={movie} mediaType={mediaType as any} />
            <MediaNarrative overview={movie.overview} genres={movie.genres} />
            <MediaActions 
              isFav={isFav} 
              onToggleFavorite={handleFavoriteToggle} 
              userLoggedIn={!!user} 
              mediaType={mediaType} 
            />
          </div>
        </div>

        <div className="mt-32">
          <MediaCast cast={cast} onNavigate={(cid) => navigate(`/cast/${cid}`)} />
          <MediaCompanies companies={movie.production_companies} onNavigate={(coid) => navigate(`/company/${coid}`)} />
          <MediaRecommendations items={similarMovies} mediaType={mediaType as any} />
        </div>
      </div>
    </div>
  );
}