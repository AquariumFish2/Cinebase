import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Splash() {
    const loadingQuotes: Array<string> = ["Initializing Curator",
        "Summoning the Archive",
        "Curating Your Cinema Universe",
        "Loading Film Intelligence",
        "Assembling the Watchlist",
        "Scanning the Movie Database"];
    const [loadingText, setLoadingText] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((oldState) => {
                if (oldState >= loadingQuotes.length - 1) {
                    navigate('/home');
                }
                return oldState + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <AnimatePresence>
        <div className="flex flex-col w-full h-dvh items-center justify-center bg-bg-color">
            <h1 className="text-7xl md:text-9xl font-bold font-family-logo text-primary text-shadow-[0_0_12px_var(--color-primary)] animate-glow">CINEBASE</h1>
            <AnimatePresence mode="wait">
                <motion.p
                    key={loadingText}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                    transition={{ duration: .3, ease: "easeInOut" }}
                    className="text-text-body typing mt-10 font-family-intel tracking-[0.3em]"
                >
                    {loadingQuotes[loadingText]}
                </motion.p>
            </AnimatePresence>
            <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent opacity-50 mt-5"></div>
            <div className="absolute top-5 left-5 flex flex-row mt-10 items-center justify-center gap-x-3">
                <div className="w-2 h-2 rounded-2xl bg-primary animate-glow"></div>
                <p className=" text-primary typing font-family-intel tracking-[0.25em]">SYNCHRONIZING VAULT</p>
            </div>
        </div >
    </AnimatePresence>
}

export default Splash;