import React, { useEffect, useState, useContext } from "react";
import supabase from "../utils/Supabase";

export const Authcontext = React.createContext({
  user: null,
  session: null,
  supabase: null,
  signIn: () => {},
  signOut: () => {},
  resetPassword: () => {},
});

export function useAuth() {
  return React.useContext(Authcontext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

const signIn = async (email, password) => {
  console.log("Signing in");
  const {error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error){
    alert(error.message);
  }
  console.log("Sign-in successful");
  
};

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Sign-out successful");
    } catch (error) {
      console.error("Sign-out failed", error);
      throw error; // Rethrow the error for higher-level error handling if needed.
    }
  };

  const resetPassword = async (email) => {
    console.log("reseting");
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://supabase.com/docs/guides/auth/auth-password-reset',
    });   if (error){
      alert(error.message);
    }
    console.log("Reseting successful");
    
  };

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    supabase,
    signIn,
    signOut,
    resetPassword,
  };





  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
