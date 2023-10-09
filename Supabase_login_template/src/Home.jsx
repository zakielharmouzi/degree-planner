import React, { useEffect } from "react";
import { useAuth } from "../components/Authcontext";
import { useNavigate } from "react-router-dom";

function Home(){
const {signOut} = useAuth();
const Navigate = useNavigate();
const {user} = useAuth();

const byebye = async (e) => {
    e.preventDefault();
    try{
        signOut();
    }
    catch(error){
        console.error("Sign-out failed", error);
        throw error;
    }
}
useEffect(() => {
    if(!user){
        Navigate('/')
    }
}, [user]);


    return(
        <div>
            <h1>Helloooo    </h1>
            <button onClick={byebye}>Sign Out</button>
        </div>
    );
}

export default Home;