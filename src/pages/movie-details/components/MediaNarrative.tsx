interface MediaNarrativeProps {
  overview: string;
  genres: any[];
}

export default function MediaNarrative({ overview, genres }: MediaNarrativeProps) {
  return (
    <>
      <div className="mb-12">
        <h3 className="text-primary uppercase tracking-[0.4em] font-black text-xs mb-6 flex items-center gap-4">
          The Narrative <div className="h-[1px] flex-1 bg-primary/20" />
        </h3>
        <p className="text-xl text-white/80 leading-relaxed font-light">
          {overview}
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-primary uppercase tracking-[0.4em] font-black text-xs mb-6 flex items-center gap-4">
          Categories <div className="h-[1px] flex-1 bg-primary/20" />
        </h3>
        <div className="flex gap-4 flex-wrap">
          {genres?.map((g: any) => (
            <span key={g.id} className="text-sm font-bold py-2 px-6 rounded-lg bg-white/5 border border-white/10 tracking-widest uppercase hover:bg-primary/10 hover:border-primary transition-all">
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
