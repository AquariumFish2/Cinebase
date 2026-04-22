import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

export default function AppBar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-100 flex justify-between items-center px-6 lg:px-12 h-24 bg-bg-color/60 backdrop-blur-md border-b border-white/5"
    >
      <Link to={'/home/1'} className="group">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-white group-hover:text-primary transition-colors duration-500 flex items-center gap-2">
          CINE<span className="text-primary group-hover:text-white transition-colors duration-500">BASE</span>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </h1>
      </Link>

      <div className="flex items-center gap-4 md:gap-10">
        <NavLink to="/home/1" active={location.pathname.includes('/home')}>Explore</NavLink>
        <NavLink to="/top-rated" active={location.pathname === '/top-rated'}>Top Rated</NavLink>

        <Link to="/profile" className="relative group">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-all duration-500 overflow-hidden bg-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-primary transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
        </Link>
      </div>
    </motion.nav>
  );
}

function NavLink({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      to={to}
      className={`relative py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 hover:text-white ${active ? 'text-primary' : 'text-white/40'}`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="nav-glow"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#fbbf24]"
        />
      )}
    </Link>
  );
}
