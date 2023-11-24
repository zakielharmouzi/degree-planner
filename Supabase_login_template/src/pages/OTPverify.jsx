import React, { useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import GP from '../Photos/GP.png';
import PasswordReset from './PasswordReset';

function OTPverify() {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const {resetPassword } = useAuth();
  const [email, setEmail] = useState(''); 

  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = otpValues.join('');
    console.log('OTP:', token);
    try {   
        resetPassword(email, token);
    }
    catch(error) {
        console.log(error);
    }
  };




  return (
    <div className="flex flex-col justify-center items-center md:p-">
      <div className='w-screen'>
        <img src={GP} className="w-40 mx-auto px-6 pt-10 pb-9" alt="nn" />
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-[#445858]">
              <p>We have sent a code to your email</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between">
                {otpValues.map((value, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#445858]"
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    type="submit"
                    className="rounded-xl w-full bg-[#445858] text-white whitespace-nowrap px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] border border-[#9ca3af] outline-none p-3 h-10"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPverify;
