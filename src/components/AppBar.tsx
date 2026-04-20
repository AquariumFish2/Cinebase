import { Link } from "react-router";

export default function AppBar() {
    return (
        <div className="h-30 w-full flex flex-row justify-between items-center bg-transparent px-6">
            <Link to={'/home/1'}>
                <h1 className="h-fit text-4xl md:text-5xl font-bold font-family-logo text-primary text-shadow-[0_0_12px_var(--color-primary)] animate-glow cursor-pointer">CINEBASE</h1>
            </Link>
            <div className="options flex flex-row gap-2">
                <Link to={'/top-rated'}>
                    <button className="text-white text-2xl px-6 bg-inherit hover:bg-bg-color hover:text-primary hover:text-shadow-[0_0_10px_var(--color-primary)] cursor-pointer h-30 transition-all duration-500 w-fit">Top Rated</button>
                </Link>
                <Link to={'/profile'}>
                    <button className="text-white text-2xl px-6 bg-inherit hover:bg-bg-color hover:text-primary hover:text-shadow-[0_0_10px_var(--color-primary)] cursor-pointer h-30 transition-all duration-500 w-fit">Profile</button>
                </Link>
            </div>
        </div>
    )
}
