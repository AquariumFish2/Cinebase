import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { favoritesContext } from "../../../controllers/FavoritesController";
import { authContext } from "../../../controllers/AuthController";

interface Company {
  id: number;
  name: string;
  logo_path: string | null;
}

const POPULAR_COMPANIES = [
  { id: 420, name: "Marvel Studios" },
  { id: 174, name: "Warner Bros." },
  { id: 2, name: "Disney" },
  { id: 33, name: "Universal" },
  { id: 4, name: "Paramount" },
  { id: 5, name: "Columbia" },
  { id: 3, name: "Pixar" },
  { id: 25, name: "20th Century" },
  { id: 12, name: "New Line" },
  { id: 521, name: "DreamWorks" },
  { id: 57, name: "Sony Pictures" },
  { id: 1632, name: "Lionsgate" },
  { id: 60, name: "Netflix" },
  { id: 41077, name: "A24" }
];

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [_, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const _apiKey = "e062cfaef0e16f44bda83a6fc3f68a8f";

  const { user } = useContext(authContext)!;
  const { isFavorite, addFavorite, removeFavorite } = useContext(favoritesContext)!;

  useEffect(() => {
    const fetchCompanies = async () => {
      const fetched = await Promise.all(
        POPULAR_COMPANIES.map(async (c) => {
          const res = await fetch(`https://api.themoviedb.org/3/company/${c.id}?api_key=${_apiKey}`);
          return res.json();
        })
      );
      setCompanies(fetched.filter(c => c.logo_path));
    };

    fetchCompanies();
  }, []);

  const handleFavoriteToggle = async (company: Company) => {
    if (!user) return;
    
    if (isFavorite(company.id, 'company')) {
      await removeFavorite(company.id, 'company');
    } else {
      await addFavorite({
        favorite_id: company.id,
        type: 'company',
        title: company.name,
        poster_path: company.logo_path || "",
        overview: `Production studio: ${company.name}`
      });
    }
  };

  return (
    <div className="w-full py-16 bg-linear-to-b from-bg-color to-transparent overflow-hidden">
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-1 mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Studios & Brands</h2>
          <p className="text-[10px] md:text-sm font-bold text-primary uppercase tracking-[0.4em] opacity-60">The architects of cinema</p>
        </div>

        <div 
          className="relative w-full overflow-hidden pt-20 pb-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scroll Container */}
          <div className="animate-scroll flex gap-12">
            {[...companies, ...companies].map((company, index) => {
              const isFav = isFavorite(company.id, 'company');
              return (
                <motion.div
                  key={`${company.id}-${index}`}
                  whileHover={{ y: -15, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="flex flex-col items-center gap-6 shrink-0 group cursor-pointer relative will-change-transform"
                >
                  <div 
                    className={`w-36 h-36 md:w-56 md:h-56 rounded-3xl bg-white border p-8 md:p-12 backdrop-blur-xl flex items-center justify-center transition-all duration-700 shadow-2xl relative overflow-hidden group-hover:shadow-primary/30 ${
                      isFav ? "border-primary bg-primary/10" : "border-white/10"
                    }`}
                  >
                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                      alt={company.name}
                      className="w-full h-full object-contain  brightness-200 contrast-200 group-hover:scale-125 transition-transform duration-700 pointer-events-none"
                    />
                    
                    {/* Heart Button */}
                    {user && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavoriteToggle(company);
                        }}
                        className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm ${
                          isFav ? "text-red-500" : "text-white"
                        }`}
                      >
                        <motion.div
                          animate={{ scale: isFav ? [1, 1.3, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                          </svg>
                        </motion.div>
                      </button>
                    )}
                  </div>
                  <span className={`text-xs md:text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 group-hover:tracking-[0.5em] group-hover:text-primary ${
                    isFav ? "text-primary px-4 py-1 bg-primary/10 rounded-full" : "text-white/40"
                  }`}>
                    {company.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
          
          {/* Faded edges overflow */}
          <div className="absolute top-0 left-0 h-full w-32 bg-linear-to-r from-bg-color to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-32 bg-linear-to-l from-bg-color to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
