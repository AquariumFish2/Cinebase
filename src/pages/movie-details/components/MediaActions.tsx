interface MediaActionsProps {
  isFav: boolean;
  onToggleFavorite: () => void;
  userLoggedIn: boolean;
  mediaType: string;
}

export default function MediaActions({ isFav, onToggleFavorite, userLoggedIn }: MediaActionsProps) {
  return (
    <div className="flex flex-wrap gap-6 text-white">
      <button
        className="bg-primary text-bg-color px-16 py-5 rounded-xl font-black tracking-[0.3em] hover:bg-white transition-all cursor-pointer duration-500 uppercase text-xs shadow-2xl"
      >
        Watch Now
      </button>
      
      {userLoggedIn && (
        <button
          className={`px-10 py-5 rounded-xl font-black border transition-all cursor-pointer duration-500 uppercase tracking-[0.3em] text-xs flex items-center gap-3 ${
            isFav 
              ? "bg-red-500 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
              : "bg-white/5 border-white/10 text-white hover:border-primary hover:text-primary"
          }`}
          onClick={onToggleFavorite}
        >
          {isFav ? "❤ Saved" : "🤍 Add to Archive"}
        </button>
      )}
    </div>
  );
}
