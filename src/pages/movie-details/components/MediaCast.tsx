interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface MediaCastProps {
  cast: CastMember[];
  onNavigate: (id: number) => void;
}

export default function MediaCast({ cast, onNavigate }: MediaCastProps) {
  return (
    <section className="mb-32">
      <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter border-l-4 border-primary pl-6">Main Characters</h3>
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 pt-4">
        {cast.map((actor) => (
          <div 
            key={actor.id} 
            onClick={() => onNavigate(actor.id)}
            className="w-32 md:w-48 shrink-0 group cursor-pointer"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 border border-white/5 group-hover:border-primary/50 transition-all shadow-xl">
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={actor.name} />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 font-black uppercase text-center p-4">Unidentified Asset</div>
              )}
            </div>
            <h4 className="font-bold text-sm mb-1 truncate">{actor.name}</h4>
            <p className="text-[10px] uppercase font-bold text-white/30 truncate tracking-widest">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
