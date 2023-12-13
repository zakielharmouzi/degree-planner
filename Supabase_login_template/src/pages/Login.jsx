import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/Supabase';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import GP from '../Photos/GP.png';


function Login() {
  const { signIn, error } = useAuth();
  const { user } = useAuth();
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setFlag] = useState('false');
  
  const checkflag = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);
    console.log("data",data);
    if (data[0].pdf_flag == "false") {
      setFlag(false);
    } else {
      setFlag(true);
    }
    };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      signIn(email, password);
      if(email){
        checkflag(email);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  useEffect(() => {
    console.log(flag);
    if (user && flag==false) {
      Navigate('/home');
    }
    if (user && flag==true) {
      Navigate('/fileupload');
    }
  }, [user]);


  const handleRouting = () => {
    Navigate('/signup');
  };

  return (
    <>
    <div>
      <img src={GP} alt="GP" className="absolute w-40"/>
    </div>
    <div className="max-w-sm mx-auto px-4 py-8">
      <h1 className="font-Libre text-3xl text-slate-800 font-bold mb-4 mt-32 text-center">Welcome!</h1>
      <h1 className="font-Libre mb-6">Please login to access our services.</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <label className="block text-sm font-medium mb-1 font-Montserrat">Email <span className="text-rose-500">*</span></label>
          <input
            type="email"
            placeholder="F.Lastname@aui.ma"
            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 mt-5 font-Montserrat">Password <span className="text-rose-500">*</span></label>
          <input
            type="password"
            placeholder="***"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
          />
<a className="font-Montserrat flex justify-end">
  <Link to="/reset">I forgot my password...</Link>
</a>
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="font-Montserrat bg-[#445858] text-white  py-2 px-8">
            Login!
          </button>
        </div>
        <div className="font-Montserrat mt-5 text-sm">
        Don't have an account? <button onClick={handleRouting} className="font-medium text-indigo-500 hover:text-indigo-600">Create one!</button>
        </div>
      </form>
    </div>
    </>
  );

}

export default Login;