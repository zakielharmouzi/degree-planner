import React, { useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/Supabase';

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
      alert('Check your email for the signup link!');
    } catch (error) {
      alert(error.error_description || error.message);
    }
   try {
     const { error } = await supabase.from('users').update(
    [
      {
        Student_id: id,
        firstname: fname,
        lastname: lname,
      }
    ],
  ).match({ email });


    if (error) throw error;
    alert('User created!');
    Navigate('/');
} catch (error) {
    alert(error.error_description || error.message);
}

  };

  const hadlerouting = async (e) => {
    e.preventDefault();
    Navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center"> Signup </h1>
        <form onSubmit={handleSignup} className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Sign Up
          </button>
        </form>
        <form onSubmit={hadlerouting} className="">
          <button
            type="submit"
            className="w-full bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            LOGIN
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
