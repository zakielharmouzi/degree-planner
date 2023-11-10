import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../components/Authcontext";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import supabase from "../../utils/Supabase";
import "reactflow/dist/style.css";
import "./style.css";
import Flowchart from "./elements";

function Home() {
  const { signOut } = useAuth();
  const Navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true); // New state for loading spinner
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId] = useState('');


  const getdata = async () => {
    console.log(user.email);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const { data, error } = await supabase.from('users').select('*').eq('email', user.email);
      if (error) throw error;
      setFname(data[0].firstname);
      setLname(data[0].lastname);
      setId(data[0].Student_id);
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    } finally {
      setLoading(false); 
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  const byebye = async (e) => {
    e.preventDefault();
    try {
      signOut();
    } catch (error) {
      console.error("Sign-out failed", error);
      throw error;
    }
  }

  useEffect(() => {
    if (!user) {
      Navigate('/')
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#f0f8ff' }}>
        <div id="header">
          <div className="titleContainer">{loading ? ( 
        <div className="loader-container">
          <PropagateLoader color={"#3498db"} loading={true} />
        </div>
      ) : (
            <h1 className="pageTitle">Welcome, {fname}!</h1>
            )}
          </div>
          <div className="SignOutButtonContainer">
            <button className="signOutButton" onClick={byebye}>
              Sign Out
            </button>
          </div>
        </div>
        <Flowchart />
    </div>
  );
}

export default Home;
