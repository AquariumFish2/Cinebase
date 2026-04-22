import { createBrowserRouter, RouterProvider } from "react-router";
import MoviesController from "./controllers/MoviesController";
import { lazy } from "react";

import Layout from "./pages/Layout";
import Splash from "./pages/splash/Splash";
import Home from "./pages/home/Home";
import { AuthController } from "./controllers/AuthController";

const TopRated = lazy(() => import("./pages/toprated/TopRated"))
const MovieDetails = lazy(() => import("./pages/movie-details/MovieDetails"))
const CompanyDetails = lazy(() => import("./pages/company-details/CompanyDetails"))
const CastDetails = lazy(() => import("./pages/cast-details/CastDetails"))
const Profile = lazy(() => import("./pages/profile/profile"))
const SignUp = lazy(() => import("./pages/auth/SignUp"))
const SignIn = lazy(() => import("./pages/auth/SignIn"))


import { FavoritesController } from "./controllers/FavoritesController";
import { NotificationProvider } from "./controllers/NotificationController";

function App() {

  const routes = createBrowserRouter(
    [
      { index: true, element: <Splash /> },
      {
        path: '/home', element: <Layout />,
        children: [
          { path: '/home', element: <Home /> },
          { path: '/home/:pageNum', element: <Home /> }
        ]
      },
      {
        path: '/top-rated', element: <Layout />,
        children: [
          { path: '/top-rated', element: <TopRated /> },
          { path: '/top-rated/:pageNum', element: <TopRated /> }
        ]
      },
      {
        path: '/profile', element: <Layout />, children: [
          { path: '/profile', element: <Profile /> }
        ]
      },
      {
        path: '/sign-up', element: <Layout />, children: [
          { path: '/sign-up', element: <SignUp /> }
        ]
      },
      {
        path: '/sign-in', element: <Layout />, children: [
          { path: '/sign-in', element: <SignIn /> }
        ]
      },
      {
        element: <Layout />, children: [
          { path: '/movie/:id', element: <MovieDetails /> },
          { path: '/tv/:id', element: <MovieDetails /> }
        ]
      },
      {
        path: '/company', element: <Layout />, children: [
          { path: '/company/:id', element: <CompanyDetails /> }
        ]
      },
      {
        path: '/cast', element: <Layout />, children: [
          { path: '/cast/:id', element: <CastDetails /> }
        ]
      }
    ]
  )

  return <div className="w-full h-full bg-bg-color">
    <NotificationProvider>
      <AuthController>
        <FavoritesController>
          <MoviesController>
            <RouterProvider router={routes}></RouterProvider>
          </MoviesController>
        </FavoritesController>
      </AuthController>
    </NotificationProvider>
  </div>
}



export default App