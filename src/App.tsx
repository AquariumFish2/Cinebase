import Splash from "./pages/splash/Splash";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import AppBar from "./components/AppBar";
import TopRated from "./pages/toprated/TopRated";
import MovieDetails from "./pages/movie-details/MovieDetails";
import Profile from "./pages/profile/profile";

function App(){
  // setTimeout(() => {
  //   setShowSplash(false);
  // }, 1500)
  


  return <div className="w-full h-dvh bg-bg-color">
    <BrowserRouter>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<Splash/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/home/:pageNum" element={<Home/>}></Route>
        <Route path="/top-rated" element={<TopRated/>}></Route>
        <Route path="/top-rated/:pageNum" element={<TopRated/>}></Route>
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </div>
}



export default App