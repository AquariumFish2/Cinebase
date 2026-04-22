interface MediaCompaniesProps {
  companies: any[];
  onNavigate: (id: number) => void;
}

export default function MediaCompanies({ companies, onNavigate }: MediaCompaniesProps) {
  return (
    <section className="mb-32">
      <h3 className="text-2xl font-black mb-10 uppercase tracking-tighter border-l-4 border-primary pl-6">Architects</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {companies?.map((company: any) => (
          <div 
            key={company.id} 
            onClick={() => onNavigate(company.id)}
            className="flex flex-col items-center gap-4 bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="w-20 h-20 flex items-center justify-center p-2 rounded-2xl bg-white bg-opacity-95 group-hover:scale-110 transition-transform">
              {company.logo_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} className="w-full object-contain" alt={company.name} />
              ) : (
                <span className="text-xs font-black text-bg-color text-center uppercase leading-none text-[10px]">{company.name}</span>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-center opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
