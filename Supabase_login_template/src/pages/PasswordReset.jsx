import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import toast from 'react-hot-toast';
import GP from '../Photos/GP.png';
import { Navigate, useNavigate } from 'react-router-dom';


function PasswordReset() {
  const { sendOtpEmail } = useAuth();
  const [email, setEmail] = useState('');
  const Navigate = useNavigate();
  const {setEmail2} = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault()
    setEmail2(email);
    try {
      sendOtpEmail(email);  
      Navigate('/xd');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="flex flex-col justify-center items-center md:p-14">
      <div>
        <img src={GP} className="w-32 mx-auto " alt="nn" />
        <div className="text-3xl font-Libre font-bold text-center mt-5 ">
          Forgot Password?
        </div>
        <h1 className="font-Montserrat mt-7">No worries, we'll send you reset instructions.</h1>
        <form onSubmit={handleLogin} action="">
          <div className="relative items-stretch mt-5">
            <label className="font-Montserrat block text-sm" htmlFor="">
              Email
            </label>
            <input
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
            />
            <button
              type="submit"
              className="font-Montserrat mx-auto mt-6 block bg-[#445858] text-white items-center whitespace-nowrap px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] border border-[#9ca3af] outline-none p-3 h-10"
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
