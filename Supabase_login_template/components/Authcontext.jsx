import React, { useEffect, useState, useContext } from "react";
import supabase from "../utils/Supabase";
import toast from 'react-hot-toast';

export const Authcontext = React.createContext({
  user: null,
  email_2: null,
  session: null,
  supabase: null,
  signIn: () => {},
  signOut: () => {},
  verificationOTP: () => {},
  sendOtpEmail: () => {},
  setEmail2: () => {},
  updatePassword: () => {},
});

export function useAuth() {
  return React.useContext(Authcontext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [email_2, setEmail_2] = useState(null);

  const [error, setError] = useState(null); 

const signIn = async (email, password) => {
  console.log("Signing in");
  const {error: authError} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
   if (authError) {
      setError(authError.message); // Set the error message in the context
    } else {
      console.log("Sign-in successful");
      setError(null); // Clear the error message
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Sign-out successful");
    } catch (error) {
      console.error("Sign-out failed", error);
      throw error; 
    }
  };

  const sendOtpEmail = async (email) => {
    console.log("Sending email");
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
      navigate('/xd');
    }
    console.log("Reseting successful");

  };

  const updatePassword = async (password) => {
    console.log("Updating password");
    const { data, error } = await supabase.auth.updateUser({ password: new_password });
    if (error){
      alert(error.message);
    }
    console.log("aaaa",data);
  };


  const setEmail2 = async (email) => {
    console.log("setting email");
    setEmail_2(email);
    console.log("email", email);
  };

  const verificationOTP = async ( email_2, OTptok) => {
    console.log("resetting");
    console.log("session", OTptok);
    console.log("mail waaa MIIII", email_2);
    const { data, error } = await supabase.auth.verifyOtp({ email:email_2, token:OTptok, type: 'recovery'})
    if (error){
      alert(error.message);
    }
    console.log("aaaa",data);
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
    
    verificationOTP,
    sendOtpEmail,
    setEmail2,
    updatePassword,
    error,
  };





  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
