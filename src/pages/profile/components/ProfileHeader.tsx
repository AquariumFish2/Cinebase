import { motion } from "framer-motion";
import type { Profile } from "../../../utils/interfaces";

interface ProfileHeaderProps {
  dbProfile: Profile | null;
  userMetadata: any;
  counts: {
    movies: number;
    companies: number;
    cast: number;
  };
  onSignOut: () => void;
}

export default function ProfileHeader({ dbProfile, userMetadata, counts, onSignOut }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16 pb-16 border-b border-white/5">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/50 transition-all duration-500" />
        
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/10 relative z-10 bg-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center cursor-pointer">
          {dbProfile?.avatar_url ? (
            <img src={dbProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-24 md:h-24">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] md:text-sm font-bold uppercase tracking-widest text-center px-4">
            Upload Image
          </div>
        </div>
      </motion.div>

      <div className="text-center md:text-left flex-1">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-2xl md:text-4xl font-black mb-4 bg-linear-to-r from-white to-white/40 bg-clip-text text-transparent uppercase tracking-tight">
            {dbProfile?.user_name || userMetadata?.userName || "Explorer"}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full">{counts.movies} Movies</span>
            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full">{counts.companies} Companies</span>
            <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full">{counts.cast} Cast</span>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onSignOut}
          className="bg-white text-bg-color font-black px-10 py-4 rounded-xl hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer uppercase tracking-[0.2em] text-xs shadow-2xl"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
