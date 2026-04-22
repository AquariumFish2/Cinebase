import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { type User, type Session } from "@supabase/supabase-js";

export interface AuthResponse {
    success: boolean;
    error?: string;
    needsVerification?: boolean;
    data?: any;
}

interface AuthContextType {
    user: User | null | undefined;
    signIn: (email: string, password: string) => Promise<AuthResponse>;
    signUp: (email: string, password: string, userName: string) => Promise<AuthResponse>;
    signOut: () => Promise<void>;
}

export const authContext = createContext<AuthContextType | null>(null);

export const AuthController = function ({ children }: any) {

    const [user, setUser] = useState<User | null | undefined>(undefined)

    const signIn = async (email: string, password: string): Promise<AuthResponse> => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.log("an error occured:", error)
            return { success: false, error: error.message }
        }
        return { success: true, data }
    }

    const signUp = async (email: string, password: string, userName: string): Promise<AuthResponse> => {
        const { data, error } = await supabase.auth.signUp({
            email, password, options: {
                data: {
                    userName
                }
            }
        })
        if (error) {
            console.log("an error occured:", error)
            return { success: false, error: error.message }
        }

        if (!data.session) {
            return { success: true, needsVerification: true, data };
        }

        return { success: true, needsVerification: false, data }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("an error occured signing out", error.message)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        })

        return () => subscription.unsubscribe();
    }, [])


    return <authContext.Provider value={{ user, signIn, signUp, signOut }}>
        {children}
    </authContext.Provider>
}