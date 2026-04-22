import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { authContext } from "./AuthController";
import type { Favorite, FavoriteType } from "../utils/interfaces";

interface FavoritesContextType {
  favorites: Favorite[];
  isFavorite: (id: number, type: FavoriteType) => boolean;
  addFavorite: (item: { 
    favorite_id: number; 
    type: FavoriteType; 
    title: string; 
    poster_path: string; 
    overview: string; 
    vote_average?: number;
  }) => Promise<{ success: boolean; message?: string }>;
  removeFavorite: (favorite_id: number, type: FavoriteType) => Promise<void>;
  loading: boolean;
}

export const favoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesController({ children }: { children: React.ReactNode }) {
  const { user } = useContext(authContext)!;
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user?.id);

    if (error) {
      console.error("Error fetching favorites:", error);
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  const isFavorite = (id: number, type: FavoriteType) => {
    return favorites.some(f =>f.favorite_id === id && f.type === type);
  };

  const addFavorite = async (item: { 
    favorite_id: number; 
    type: FavoriteType; 
    title: string; 
    poster_path: string; 
    overview: string; 
    vote_average?: number;
  }): Promise<{ success: boolean; message?: string }> => {
    if (!user) return { success: false, message: "User not authenticated" };

    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { 
          user_id: user.id, 
          favorite_id: item.favorite_id, 
          type: item.type, 
          title: item.title, 
          poster_path: item.poster_path, 
          overview: item.overview,
          vote_average: item.vote_average || 0
        }
      ])
      .select();

    if (error) {
      if (error.code === '23505') {
        return { success: false, message: "Already in your collection" };
      }
      console.error("Error adding favorite:", error);
      return { success: false, message: error.message };
    } else if (data) {
      setFavorites(prev => [...prev, data[0]]);
      return { success: true, message: "Added to your collection" };
    }
    return { success: false, message: "Something went wrong" };
  };

  const removeFavorite = async (favorite_id: number, type: FavoriteType) => {
    if (!user) return;

    const target = favorites.find(f => Number(f.favorite_id) === Number(favorite_id) && f.type === type);
    if (!target) return;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', target.id);

    if (error) {
      console.error("Database failure: Could not remove archive entry [ID: " + target.id + "]:", error);
    } else {
      setFavorites(prev => prev.filter(f => f.id !== target.id));
    }
  };

  return (
    <favoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite, loading }}>
      {children}
    </favoritesContext.Provider>
  );
}
