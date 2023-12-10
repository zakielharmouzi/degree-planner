import React, { useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/Supabase';
import axios from 'axios';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-screen-md">
        <div className="flex-1/3 bg-white shadow-2xl rounded-l-2xl p-8">
          <img
            src="../src/Photos/GP.png"
            className="mx-auto h-40 w-40 flex justify-center object-center mb-4"
            alt=""
          />
          <form onSubmit={handleSignup} className="flex flex-wrap">
            <div className="w-full mb-4">
              <label htmlFor="fname" className="mb-2 text-md">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="lname" className="mb-2 text-md">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Doe"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="id" className="mb-2 text-md">
                ID
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="123456"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="email" className="mb-2 text-md">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="w-full mb-4">
              <label htmlFor="password" className="mb-2 text-md">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
              />
            </div>
            <div className="w-full flex justify-between py-4">
              <button
                type="submit"
                className="mx-auto text-center w-full h-12 rounded px-5 overflow-hidden group bg-[#166432] relative hover:bg-gradient-to-r hover:from-green-900 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-600 transition-all ease-out duration-200"
              >
                <span className="absolute right-0 w-8 h-12 -mt-4 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="mx-auto relative">Sign Up</span>
              </button>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {/* <button
          type="button"
          onClick={handleTriggerPythonScript}
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Trigger Python Script
        </button> */}
          <div className="text-center text-gray-400">
            Already have an account?
            <span className="font-bold text-black cursor-pointer" onClick={hadlerouting}>
              {' '}
              Login!
            </span>
          </div>
        </div>
        <div className="flex-2/3">
          <img
            src="https://pbs.twimg.com/media/Etympz0WgAE4iS1?format=jpg&name=4096x4096"
            alt="img"
            className="w-full h-screen rounded-r-2xl object-cover"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Signup