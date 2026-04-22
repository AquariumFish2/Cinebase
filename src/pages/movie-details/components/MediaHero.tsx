import { motion } from "framer-motion";

interface MediaHeroProps {
  movie: any;
  mediaType: 'movie' | 'tv';
}

export default function MediaHero({ movie, mediaType }: MediaHeroProps) {
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0] || 'N/A';
  const runtime = movie.runtime || movie.episode_run_time?.[0] || 'N/A';
  const rating = movie.vote_average?.toFixed(1) || "0.0";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1"
    >
      <h1 className="text-5xl lg:text-8xl font-black mb-2 uppercase tracking-tighter leading-[0.8]">
        {movie.title || movie.name}
      </h1>
      <p className="text-primary italic text-xl md:text-2xl mb-8 tracking-wide font-light">{movie.tagline}</p>

      <div className="flex flex-wrap gap-6 mb-10 items-center">
        <span className="flex items-center gap-2 text-white/50 font-bold uppercase tracking-widest text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {runtime} MIN
        </span>
        <span className="flex items-center gap-2 text-white/50 font-bold uppercase tracking-widest text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {year}
        </span>
        <div className="bg-primary/20 border border-primary text-primary px-5 py-2 rounded-xl text-sm font-black flex items-center gap-2">
          {rating} <span className="text-[10px]">TMDB RATING</span>
        </div>
      </div>
    </motion.div>
  );
}
