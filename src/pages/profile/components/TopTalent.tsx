import { motion } from "framer-motion";
import type { Favorite } from "../../../utils/interfaces";

interface TopTalentProps {
  favorites: Favorite[];
  onRemove: (id: number, type: 'cast') => void;
}

export default function TopTalent({ favorites, onRemove }: TopTalentProps) {
  const talents = favorites.filter(f => f.type === 'cast');

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-black uppercase tracking-widest mb-6 text-white/60">Top Talent</h2>
      {talents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {talents.map((fav) => (
            <div key={fav.id} className="group relative flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white/10">
                {fav.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`} alt={fav.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs font-bold text-white/20">{fav.title.charAt(0)}</span>
                )}
              </div>
              <span className="font-bold text-sm truncate">{fav.title}</span>

              <button 
                onClick={() => onRemove(fav.favorite_id, 'cast')}
                className="ml-auto w-6 h-6 rounded-full bg-white/5 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:border-red-500 transition-all text-white/40 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-6 text-center">
          <p className="text-white/20 text-[10px] font-bold uppercase">No cast members saved</p>
        </div>
      )}
    </motion.div>
  );
}
