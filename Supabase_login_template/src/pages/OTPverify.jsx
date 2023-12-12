import React, { useState } from "react";
import { useAuth } from "../../components/Authcontext";
import GP from "../Photos/GP.png";
import PasswordReset from "./PasswordReset";
import { Ripples } from "react-ripples-continued";
import { Navigate, useNavigate } from 'react-router-dom';

function OTPverify(props) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  let results = false;

  const handleInputChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const onPaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text/plain");
    const newOtpValues = pasted
      .split("")
      .slice(0, otpValues.length)
      .map((char) => char);

    setOtpValues(newOtpValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = otpValues.join("");
    console.log("OTP:", token);
  
    try {
      const results = await resetPassword(token);
      console.log("OTP:", results);
  
      if (results === false) {
        console.log("Invalid OTP");
      } else {
        navigate('/Changepassword');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  return (
    <div className="flex flex-col justify-center items-center md:p-">
      <div className="w-screen">
        <img src={GP} className="w-40 mx-auto px-6 pt-10 pb-9" alt="nn" />
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl font-Libre">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-Montserrat font-medium text-[#445858]">
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
                      onPaste={onPaste}
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className=" rounded-lg flex flex-col space-y-5">
                <button
                  type="submit"
                  className="relative overflow-hidden font-Montserrat rounded-xl w-1/2 h-12 mx-auto bg-[#445858] text-white whitespace-nowrap px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] border border-[#9ca3af] outline-none p-3 ">
                  Submit
                  <Ripples
                    color="#658383"
                    opacity={0.5}
                    blur={0.4}
                    duration={800}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPverify;