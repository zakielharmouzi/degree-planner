import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Authcontext";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import supabase from "../../utils/Supabase";
import "reactflow/dist/style.css";
import Flowchart from "./elements";

function Home() {
  const { signOut } = useAuth();
  const Navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId] = useState('');

  const getdata = async () => {
    console.log(user.email);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email);
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
  };

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
  };

  useEffect(() => {
    if (!user) {
      Navigate("/");
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen bg-grey-100">
      {loading && (
        <div className="loader-container flex items-center justify-center h-screen">
          <HashLoader color={"#166432"} loading={true} size={100} />
        </div>
      )}
      {!loading && (
        <>
        <div className="headerContainer flex justify-between items-center bg-grey-100">
            <div className="flex items-right">
          <img
            src="../src/Photos/GP.png"
            className="mx-auto h-28 w-28 flex justify-center object-center"
            alt=""
          />
            </div>
            <div className="titleContainer flex-grow text-center">
              <h1 className="pageTitle text-4xl font-bold text-green-900 mb-0">
                Welcome, {fname}!
              </h1>
            </div>
            <div className="signOutButtonContainer flex items-center">
              <button
                className="signOutButton mr-3 mt-0 text-center w-28 h-100 rounded px-5 py-2.5 overflow-hidden group bg-[#166432] relative hover:bg-gradient-to-r hover:from-green-900 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-600 transition-all ease-out duration-200"
                onClick={byebye}
              >
                Sign Out
              </button>
            </div>
        </div>
          <Flowchart />
        </>
      )}
    </div>
  );
}

export default Home;

