import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/Authcontext";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import supabase from "../../utils/Supabase";
import "reactflow/dist/style.css";
import Flowchart from "./elements";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";

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
        <Navbar fname={fname} />
          <Flowchart />
        </>
      )}
    </div>
  );
}

export default Home;
