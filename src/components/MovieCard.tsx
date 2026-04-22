import type { Movie } from "../utils/interfaces";

export default function MovieCard(movie: Movie) {
  const _imageBaseUrl = "https://image.tmdb.org/t/p/w500/";
  
  return (
    <div className="w-full aspect-2/3 rounded-2xl relative group overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-primary/20">
        <img 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
          src={`${_imageBaseUrl + movie.poster_path}`} 
          alt={movie.title || (movie as any).name} 
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-black text-white z-10">
          {movie.vote_average?.toFixed(1)} <span className="text-primary tracking-tighter">⭐</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-bg-color via-bg-color/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end">
            <h1 className="text-white text-xl md:text-2xl font-black mb-3 line-clamp-2 uppercase tracking-tight leading-none">
              {movie.title || (movie as any).name}
            </h1>
            <p className="line-clamp-3 text-xs md:text-sm text-white/70 leading-relaxed font-medium">
              {movie.overview}
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                View Details
              </span>
              <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-bg-color transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </div>
            </div>
        </div>
    </div>
  )
}
