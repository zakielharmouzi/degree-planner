import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import toast from 'react-hot-toast';
import GP from '../Photos/GP.png';
import { Navigate, useNavigate } from 'react-router-dom';
import supabase from "../../utils/Supabase";


function PasswordReset() {
  const { sendOtpEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setEmail2} = useAuth();



  const handleLogin = async (event) => {
    event.preventDefault()
    setEmail2(email);
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
      navigate('/Verification');
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      sendOtpEmail(email);
      setEmailSent(true);
      navigate('/xd');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeChange = (e) => {
    if (emailSent) {
      setCode(e.target.value);
    }
  };

  console.log('Rendering. emailSent:', emailSent);

  return (

    <div className="flex flex-col justify-center items-center md:p-14">
      <div>
        <img src={GP} className="w-32 mx-auto " alt="nn" />
        <div className="font-bold text-center mt-5 ">
          <h2>Forgot Password?</h2>
        </div>
        <h1 className="mt-2">No worries, we'll send you reset instructions.</h1>
        <form onSubmit={handleLogin} action="">
          <div className="relative block items-stretch mt-5">
            <label className="block text-sm" htmlFor="">
              Email
            </label>
            <input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 border border-[#9ca3af] outline-none p-3 h-10"
            />
            <button
              type="submit"
              className="mx-auto mt-6 block bg-[#445858] text-white items-center whitespace-nowrap px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] border border-[#9ca3af] outline-none p-3 h-10"
            >
              Send Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
