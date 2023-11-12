import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { signIn, error } = useAuth();
  const { user } = useAuth();
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      signIn(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      Navigate('/home');
    }
  }, [user, Navigate]);

  const handleRouting = () => {
    Navigate('/signup');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Al_Akhawayn_University_Logo.png"
            className="mx-auto h-40 w-40 flex justify-center object-center"
            alt=""
          />
          <form onSubmit={handleSignIn}>
            <div className="py-4">
              <label htmlFor="email" className="mb-2 text-md">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="F.LastName@aui.ma"
              />
            </div>
            <div className="py-4">
              <label htmlFor="pass" className="mb-2 text-md">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="mr-24 flex justify-between w-full py-4">
              <button
                type="submit"
                className="mx-auto text-center w-28 h-150 rounded px-5 py-2.5 overflow-hidden group bg-[#166432] relative hover:bg-gradient-to-r hover:from-green-900 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-600 transition-all ease-out duration-200"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Login</span>
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 px-12 ">{error}</p>}

          <div className="text-center text-gray-400">
            Don't have an account?
            <button
              className="font-bold text-black cursor-pointer"
              onClick={handleRouting}
            >
              {' '}
              Create one!
            </button>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://pbs.twimg.com/media/Etympz0WgAE4iS1?format=jpg&name=4096x4096"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;