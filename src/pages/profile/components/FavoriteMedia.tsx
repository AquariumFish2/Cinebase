import { motion } from "framer-motion";
import MovieListing from "../../../components/MovieListing";
import type { Favorite } from "../../../utils/interfaces";

interface FavoriteMediaProps {
  title: string;
  favorites: Favorite[];
  type: 'movie' | 'tv';
}

export default function FavoriteMedia({ title, favorites, type }: FavoriteMediaProps) {
  const filtered = favorites.filter(f => f.type === type);
  
  const mapped = filtered.map(f => ({
    id: f.favorite_id,
    title: f.title,
    poster_path: f.poster_path,
    overview: f.overview,
    vote_average: f.vote_average,
    media_type: type
  } as any));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-20"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">{title}</h2>
        <span className="text-primary font-bold text-xs tracking-widest uppercase">{filtered.length} items</span>
      </div>
      
      {filtered.length > 0 ? (
        <div className="-mx-6">
           <MovieListing movies={mapped} forcedType={type} />
        </div>
      ) : (
        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center">
          <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">No {type === 'movie' ? 'movies' : 'series'} in your collection yet</p>
        </div>
      )}
    </motion.div>
  );
}
