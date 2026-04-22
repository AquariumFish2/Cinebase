import { useContext, useEffect, useState } from "react";
import { authContext } from "../../controllers/AuthController";
import { useNotification } from "../../controllers/NotificationController";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase";
import type { Profile as UserProfileType } from "../../utils/interfaces";
import { favoritesContext } from "../../controllers/FavoritesController";

// Sub-components
import ProfileHeader from "./components/ProfileHeader";
import FavoriteMedia from "./components/FavoriteMedia";
import FavoriteCompanies from "./components/FavoriteCompanies";
import TopTalent from "./components/TopTalent";

export default function Profile() {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const [dbProfile, setDbProfile] = useState<UserProfileType | null>(null);
  const [_, setLoadingData] = useState(false);
  
  const { user, signOut } = useContext(authContext)!;
  const { favorites, removeFavorite } = useContext(favoritesContext)!;
  const { showNotification } = useNotification();

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  // Handle email verification from OTP tokens in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token_hash = params.get('token_hash');
    const type = params.get('type') as any;

    if (token_hash) {
      setVerifying(true);
      supabase.auth
        .verifyOtp({ token_hash, type: type || 'email' })
        .then(({ error }) => {
          if (!error) {
            window.history.replaceState({}, document.title, '/profile');
          }
        })
        .finally(() => setVerifying(false));
    }
  }, []);

  const fetchProfileData = async () => {
    setLoadingData(true);
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (data) setDbProfile(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoadingData(false);
    }
  };


  const handleRemove = async (id: number, type: any) => {
    await removeFavorite(id, type);
    showNotification(`Removed from collection`, 'error');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  // Automatic redirection for unauthenticated users
  useEffect(() => {
    if (user === null) {
      navigate("/sign-up");
    }
  }, [user, navigate]);

  if (verifying || user === undefined) {
    return (
      <div className="bg-bg-color min-h-screen pt-32 pb-20 px-6 text-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-8"></div>
        <h1 className="text-2xl font-bold text-primary italic uppercase tracking-[0.5em]">Verifying Identity...</h1>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-bg-color min-h-screen pt-32 pb-20 px-6 text-white overflow-hidden">

      <div className="max-w-6xl mx-auto">
        <ProfileHeader 
          dbProfile={dbProfile}
          userMetadata={user.user_metadata}
          counts={{
            movies: favorites.filter(f => f.type === 'movie').length,
            companies: favorites.filter(f => f.type === 'company').length,
            cast: favorites.filter(f => f.type === 'cast').length
          }}
          onSignOut={handleSignOut}
        />

        <div className="space-y-32">
          <FavoriteMedia title="CineBase Archive" favorites={favorites} type="movie" />
          <FavoriteMedia title="Series Collection" favorites={favorites} type="tv" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <FavoriteCompanies favorites={favorites} onRemove={handleRemove} />
            <TopTalent favorites={favorites} onRemove={handleRemove} />
          </div>
        </div>
      </div>
    </div>
  );
}
