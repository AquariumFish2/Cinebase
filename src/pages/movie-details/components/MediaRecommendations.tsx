import MovieListing from "../../../components/MovieListing";
import type { Movie } from "../../../utils/interfaces";

interface MediaRecommendationsProps {
  items: Movie[];
  mediaType: 'movie' | 'tv';
}

export default function MediaRecommendations({ items, mediaType }: MediaRecommendationsProps) {
  if (items.length === 0) return null;

  return (
    <section className="w-full">
      <h3 className="text-3xl lg:text-4xl font-black mb-12 uppercase tracking-tighter border-l-8 border-primary pl-10 leading-none">
        Resonating <br/>Archives
      </h3>
      <MovieListing movies={items} forcedType={mediaType} />
    </section>
  );
}
