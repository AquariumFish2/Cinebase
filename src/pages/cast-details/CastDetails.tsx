import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { favoritesContext } from "../../controllers/FavoritesController";
import { authContext } from "../../controllers/AuthController";
import { useNotification } from "../../controllers/NotificationController";
import MovieListing from "../../components/MovieListing";
import type { Movie } from "../../utils/interfaces";

interface PersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
}

export default function CastDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  
  const { user } = useContext(authContext)!;
  const { isFavorite, addFavorite, removeFavorite } = useContext(favoritesContext)!;
  
  const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [personRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${_apiKey}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${_apiKey}&language=en-US`)
        ]);

        const personData = await personRes.json();
        const creditsData = await creditsRes.json();

        setPerson(personData);
        // Store full list of movies with posters, sorted by popularity
        const sortedMovies = creditsData.cast
          .filter((m: any) => m.poster_path && (m.media_type === 'movie' || m.media_type === 'tv'))
          .sort((a: any, b: any) => b.popularity - a.popularity);
        
        setMovies(sortedMovies);
      } catch (err) {
        console.error("Error fetching cast details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  const handleFavoriteToggle = async () => {
    if (!person || !user) return;
    
    if (isFavorite(person.id, 'cast')) {
      await removeFavorite(person.id, 'cast');
      showNotification("Removed from talent archive", "error");
    } else {
      const result = await addFavorite({
        favorite_id: person.id,
        type: 'cast',
        title: person.name,
        poster_path: person.profile_path || "",
        overview: person.biography || `Actor: ${person.name}`,
        vote_average: (person as any).popularity || 0
      });
      if (result.success) {
        showNotification("Talent saved to archive", "success");
      }
    }
  };

  if (loading) return (
    <div className="h-dvh w-full bg-bg-color flex items-center justify-center text-primary text-2xl animate-pulse uppercase tracking-[1em]">
      Analyzing Talent Signature...
    </div>
  );

  if (!person) return <div className="h-dvh w-full bg-bg-color flex items-center justify-center text-white">Cast member not found</div>;

  const isFav = isFavorite(person.id, 'cast');
  const backdropImage = movies.length > 0 ? `https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}` : null;

  return (
    <div className="min-h-screen bg-bg-color text-white relative overflow-hidden">
      {/* Cinematic Backdrop */}
      {backdropImage && (
        <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
          <img src={backdropImage} className="w-full h-full object-cover opacity-20" alt="backdrop" />
          <div className="absolute inset-0 bg-linear-to-t from-bg-color via-bg-color/80 to-transparent" />
        </div>
      )}

      <div className="container mx-auto pt-40 pb-20 px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-96 shrink-0 flex justify-center"
          >
            <div className="w-64 h-64 lg:w-full lg:h-auto aspect-square lg:aspect-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
              {person.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} className="w-full h-full object-cover" alt={person.name} />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 font-black uppercase text-center p-8">No Visual Asset</div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <h1 className="text-5xl lg:text-8xl font-black mb-4 uppercase tracking-tighter leading-none">{person.name}</h1>
            <p className="text-primary font-bold text-xl mb-8 tracking-[0.4em] uppercase opacity-70">{person.known_for_department}</p>

            <div className="flex flex-wrap gap-6 mb-12 items-center text-white/50 font-bold uppercase tracking-widest text-xs">
              {person.birthday && (
                <span className="flex items-center gap-2">
                  <span className="text-primary">Born:</span> {person.birthday}
                </span>
              )}
              {person.place_of_birth && (
                <span className="flex items-center gap-2">
                  <span className="text-primary">Origin:</span> {person.place_of_birth}
                </span>
              )}
            </div>

            <div className="mb-12">
              <h3 className="text-primary uppercase tracking-[0.4em] font-black text-xs mb-6 flex items-center gap-4">
                Biography <div className="h-px flex-1 bg-primary/20" />
              </h3>
              <p className="text-lg text-white/70 leading-relaxed font-light max-w-3xl whitespace-pre-line italic">
                {person.biography || "No biological intel available in the archive."}
              </p>
            </div>

            <div className="flex justify-center md:justify-start">
                {user && (
                  <button
                    onClick={handleFavoriteToggle}
                    className={`px-12 py-5 rounded-xl font-black border transition-all cursor-pointer duration-500 uppercase tracking-[0.3em] text-xs flex items-center gap-4 ${
                      isFav 
                        ? "bg-red-500 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
                        : "bg-white/5 border-white/10 text-white hover:border-primary hover:text-primary"
                    }`}
                  >
                    {isFav ? "❤ Saved Talent" : "🤍 Add to Talent Archive"}
                  </button>
                )}
            </div>
          </motion.div>
        </div>

        <div>
           <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter border-l-8 border-primary pl-10 leading-none">
              Known For <br/><span className="text-primary opacity-50">Filmography</span>
           </h2>
           {movies.length > 0 ? (
             <>
               <MovieListing movies={movies.slice(0, visibleCount)} />
               
               {visibleCount < movies.length && (
                 <div className="flex justify-center mt-20">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 8)}
                      className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50"
                    >
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      <span className="relative z-10 text-xs font-black uppercase tracking-[0.5em] group-hover:text-primary transition-colors duration-500">
                        Expand Filmography
                      </span>
                    </button>
                 </div>
               )}
             </>
           ) : (
             <div className="text-center py-20 text-white/20 uppercase tracking-[1em]">
                No filmography found
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
