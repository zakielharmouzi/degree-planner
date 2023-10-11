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
        <div class="flex flex-col items-center justify-center space-y-4 p-4 bg-gray-100">
    <h1 class="text-center text-3xl font-bold">Helloooo</h1>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={byebye}>Sign Out</button>
</div>

    );
}

export default Home;