export default function Profile() {
  return (
    <div className="bg-bg-color min-h-screen pt-40 px-6 text-white flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 border-b border-white/10 pb-4">Account Settings</h1>
        
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Username
            </label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username"
              className="bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              className="bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button 
            type="submit" 
            className="mt-4 bg-primary text-bg-color font-bold py-3 rounded-md hover:opacity-90 transition-opacity cursor-pointer uppercase tracking-widest"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}