import React, { useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/Supabase';
import axios from 'axios';
import GP from '../Photos/GP.png';

const Signup = () => {
  const { user } = useAuth();
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId] = useState('');

  const [error, setError] = useState(null);

  const isFormValid = () => {
    return email && password && fname && lname && id;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please fill out all fields before signing up.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Update user data in the 'users' table
      const { error: updateError } = await supabase
        .from('users')
        .update([
          {
            Student_id: id,
            firstname: fname,
            lastname: lname,
          },
        ])
        .match({ email });

      if (updateError) throw updateError;

      alert('Check your email for the signup link!');
      Navigate('/');
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleTriggerPythonScript = async () => {
    console.log('Triggering Python script...');
    try {
      const response = await axios.get('http://localhost:3000/trigger-python-script');
      if (response.status === 200) {
        alert('Python script executed successfully!');
      } else {
        alert('Failed to execute Python script.');
      }
    } catch (error) {
      console.error('Error triggering Python script:', error);
    }
  };

  const hadlerouting = async (e) => {
    e.preventDefault();
    Navigate('/');
  };

  return (
    <>
      <div>
        <img src={GP} alt="GP" className="absolute w-40" />
      </div>
      <div className="max-w-sm mx-auto px-4 py-8">
        <h1 className="font-Libre text-3xl text-slate-800 font-bold mb-4 mt-10 text-center">Welcome!</h1>
        <h1 className="font-Libre mb-6">Please create an account to access our services.</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium mb-1 font-Montserrat">First Name <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="John"
              className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 mt-5 font-Montserrat">Last Name <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
              onChange={(e) => setLname(e.target.value)}
            />
            <label className="block text-sm font-medium mb-1 mt-5 font-Montserrat">AUI ID <span className="text-rose-500">*</span></label>
            <input
              type="text"
              placeholder="123456"
              className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
              onChange={(e) => setId(e.target.value)}
            />
            <label className="block text-sm font-medium mb-1 mt-5 font-Montserrat">Email <span className="text-rose-500">*</span></label>
            <input
              type="email"
              placeholder="F.Lastname@aui.ma"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
            />
            <label className="block text-sm font-medium mb-1 mt-5 font-Montserrat">Password <span className="text-rose-500">*</span></label>
            <input
              type="password"
              placeholder="***"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center mt-6">
            <button type="submit" className="font-Montserrat bg-[#445858] text-white py-2 px-8">
              Sign Up!
            </button>
          </div>
        </form>
        <div className="font-Montserrat mt-5 text-sm">
          Have an account? <button className="font-medium text-indigo-500 hover:text-indigo-600" onClick={hadlerouting}>Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
