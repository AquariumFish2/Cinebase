import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Movie } from "../../../utils/interfaces";
import { Link } from "react-router";
export default function Hero() {
    const [trending, settrending] = useState<Movie[]>([]);
    const [index, setIndex] = useState(0);
    
    const _imageBaseUrl = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=e062cfaef0e16f44bda83a6fc3f68a8f")
            .then(res => res.json())
            .then(data => settrending(data.results.slice(0, 8)));
    }, []);

    useEffect(() => {
        if (trending.length === 0) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % trending.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [trending]);

    if (trending.length === 0) return <div className="h-[80vh] bg-black/20 animate-pulse w-full" />;
    const currentMovie = trending[index];
    return (
        <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                        src={_imageBaseUrl + currentMovie.backdrop_path}
                        className="w-full h-full object-cover"
                        alt={currentMovie.title}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-bg-color via-bg-color/40 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-bg-color via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 w-full px-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl"
                    >
                        <span className="text-primary tracking-[0.5em] text-sm font-bold uppercase mb-4 block animate-pulse">
                            Trending Now
                        </span>
                        <h1 className="text-white text-5xl md:text-8xl font-bold mb-6 leading-tight uppercase font-family-logo drop-shadow-2xl">
                            {currentMovie.title}
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl line-clamp-3 mb-10 max-w-2xl font-light leading-relaxed">
                            {currentMovie.overview}
                        </p>
                        <div className="flex gap-6">
                            <Link to={`/movie/${currentMovie.id}`}>
                                <button className="bg-primary text-bg-color px-10 py-4 font-bold rounded-sm tracking-widest hover:scale-105 hover:shadow-[0_0_20px_var(--color-primary)] transition-all cursor-pointer">
                                    VIEW DETAILS
                                </button>
                            </Link>
                            <button className="border border-white/20 text-white px-10 py-4 font-bold rounded-sm tracking-widest hover:bg-white/10 hover:border-white transition-all cursor-pointer">
                                WATCH TRAILER
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="absolute bottom-10 right-12 z-20 flex gap-3">
                {trending.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1 transition-all duration-500 cursor-pointer ${i === index ? "w-12 bg-primary shadow-[0_0_10px_var(--color-primary)]" : "w-6 bg-white/20 hover:bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}