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
      // Call the signIn function from Authcontext
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
    <>
      <div className="Form">
        <h1>Supabase Login Template</h1>
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default Login;
