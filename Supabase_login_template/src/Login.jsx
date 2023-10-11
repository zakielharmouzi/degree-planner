import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Authcontext';
import { useNavigate  } from 'react-router-dom';


function Login() {
  const { signIn } = useAuth();
  const { user } = useAuth();
  const Navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try { 
    signIn(email, password);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
  if(!user){
    Navigate('/')
    
  }else{
    Navigate('/home')
  }
  }, [user]);      
  return (
   <div className="flex justify-center items-center min-h-screen">
  <div className="bg-white shadow-md p-8 rounded-lg">
    <h1 className="text-2xl font-bold mb-4">Supabase Login Template</h1>
    <h2 className="text-lg mb-4">Sign In</h2>
    <form onSubmit={handleSignIn} className="mb-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mt-2"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Sign In
      </button>
    </form>
    {error && <p className="text-red-500">{error}</p>}
  </div>
</div>

  );
}

export default Login;
