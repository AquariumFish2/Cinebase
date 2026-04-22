import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { favoritesContext } from "../../controllers/FavoritesController";
import { authContext } from "../../controllers/AuthController";
import { useNotification } from "../../controllers/NotificationController";
import MovieListing from "../../components/MovieListing";
import type { Movie } from "../../utils/interfaces";

interface CompanyDetail {
  id: number;
  name: string;
  description: string;
  headquarters: string;
  homepage: string;
  logo_path: string;
  origin_country: string;
}

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { user } = useContext(authContext)!;
  const { isFavorite, addFavorite, removeFavorite } = useContext(favoritesContext)!;
  const { showNotification } = useNotification();
  
  const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

  const fetchMovies = async (pageNum: number) => {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${_apiKey}&with_companies=${id}&sort_by=popularity.desc&page=${pageNum}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch company details
        const companyRes = await fetch(`https://api.themoviedb.org/3/company/${id}?api_key=${_apiKey}`);
        const companyData = await companyRes.json();
        setCompany(companyData);

        // Fetch first page of movies
        const moviesData = await fetchMovies(1);
        setMovies(moviesData.results || []);
        if (moviesData.total_pages <= 1) setHasMore(false);
      } catch (err) {
        console.error("Error fetching company details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      const data = await fetchMovies(nextPage);
      if (data.results?.length > 0) {
        setMovies(prev => [...prev, ...data.results]);
        setPage(nextPage);
        if (nextPage >= data.total_pages) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more movies:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!company || !user) return;

    if (isFavorite(company.id, 'company')) {
      await removeFavorite(company.id, 'company');
      showNotification("Studio removed from archive", "error");
    } else {
      const result = await addFavorite({
        favorite_id: company.id,
        type: 'company',
        title: company.name,
        poster_path: company.logo_path,
        overview: company.description || `Production studio: ${company.name}`,
        vote_average: 10
      });
      if (result.success) {
        showNotification("Studio saved to archive", "success");
      }
    }
  };

  if (loading) return (
    <div className="h-dvh w-full bg-bg-color flex items-center justify-center text-primary text-2xl animate-pulse uppercase tracking-[1em]">
      Retrieving Studio Intel...
    </div>
  );

  if (!company) return <div>Company not found</div>;

  const isFav = isFavorite(company.id, 'company');
  const backdropImage = movies.length > 0 ? `https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}` : null;

  return (
    <div className="min-h-screen bg-bg-color text-white relative overflow-hidden">
      {/* Cinematic Backdrop */}
      {backdropImage && (
        <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
          <img
            src={backdropImage}
            className="w-full h-full object-cover opacity-20"
            alt="backdrop"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-color via-bg-color/80 to-transparent" />
        </div>
      )}

      <div className="container mx-auto pt-40 pb-20 px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20 bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
           
           <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white flex items-center justify-center p-8 shadow-2xl"
           >
              <img 
                src={`https://image.tmdb.org/t/p/w500${company.logo_path}`} 
                alt={company.name} 
                className="w-full object-contain"
              />
           </motion.div>

           <div className="flex-1 text-center md:text-left">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter"
              >
                {company.name}
              </motion.h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 text-white/60 font-bold uppercase tracking-widest text-xs">
                {company.origin_country && (
                  <span className="flex items-center gap-2">
                    <span className="text-primary">Country:</span> {company.origin_country}
                  </span>
                )}
                {company.headquarters && (
                  <span className="flex items-center gap-2">
                    <span className="text-primary">HQ:</span> {company.headquarters}
                  </span>
                )}
                {company.homepage && (
                  <a href={company.homepage} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    Official Website
                  </a>
                )}
              </div>

              {company.description && (
                <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                  {company.description}
                </p>
              )}

              <div className="flex justify-center md:justify-start">
                {user && (
                  <button
                    onClick={handleFavoriteToggle}
                    className={`px-10 py-4 rounded-xl font-black border transition-all cursor-pointer uppercase tracking-[0.2em] text-xs flex items-center gap-3 ${
                      isFav 
                        ? "bg-red-500 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                        : "bg-white/10 border-white/20 text-white hover:border-primary hover:text-primary"
                    }`}
                  >
                    {isFav ? "❤️ FAVORITE STUDIO" : "🤍 SAVE TO ARCHIVE"}
                  </button>
                )}
              </div>
           </div>
        </div>

        {/* Movies Section */}
        <div>
           <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter border-l-4 border-primary pl-6">
              Production History
           </h2>
           {movies.length > 0 ? (
             <>
               <MovieListing movies={movies} forcedType="movie" />
               
               {hasMore && (
                 <div className="flex justify-center mt-20">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="group relative px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-primary hover:text-bg-color hover:border-primary transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                       <span className="relative z-10 flex items-center gap-3">
                         {loadingMore ? (
                           <>
                             <div className="w-4 h-4 border-2 border-bg-color/30 border-t-bg-color rounded-full animate-spin" />
                             Processing...
                           </>
                         ) : (
                           <>
                             Load More Records
                             <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                           </>
                         )}
                       </span>
                    </button>
                 </div>
               )}
             </>
           ) : (
             <div className="text-center py-20 text-white/20 uppercase tracking-[1em]">
                No archives found
             </div>
           )}
        </div>
      </div>
    </div>
  );
  }

