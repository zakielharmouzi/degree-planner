import React, {useState} from 'react';
import { useAuth } from '../../components/Authcontext';
import { Navigate, useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';


function PasswordReset() {
    const { updatePassword } = useAuth();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [pw, setPw] = useState(true);
    const navigate = useNavigate();
    const routeChange = () =>{ 
        navigate('/');
      }

      const handleChange = async (event) => {
        event.preventDefault()
        try {
          updatePassword(password2);  
        } catch (error) {
          console.log(error);
        }
      }
    
    return (
        <div className="max-w-sm mx-auto px-4 py-8">
            <h1 className="font-Libre text-3xl text-slate-800 font-bold mb-6 mt-32">Change your Password</h1>
            <form onSubmit ={handleChange}>
                <div className="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1 font-Montserrat">New Password <span class="text-rose-500">*</span></label>
                        <input placeholder="Enter your password"
                            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <PasswordStrengthBar password={password} />
                        <label class=" block text-sm font-medium mb-1 mt-5 font-Montserrat">Confirm New Password <span class="text-rose-500">*</span></label>
                        <input placeholder="Confirm your password"
                            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
                            value={password2} onChange={e => {setPassword2(e.target.value)}}
                        />
                {password && password2 && password !== password2 && <p className='font-Montserrat text-sm text-rose-500'>Your passwords mismatch.</p>}
                {password && password2 && password === password2 && <p className='font-Montserrat text-sm text-green-500'>Your passwords match.</p>}

                    </div>
                    
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className=" bg-[#445858] text-white  py-2 px-4">
                        Reset password
                    </button>
                </div>
                <div className="font-Montserrat mt-5 text-sm">
                    Have an account? <button onClick={routeChange} class="font-medium text-indigo-500 hover:text-indigo-600">Sign In</button>
                </div>
            </form>

        </div>

    );

}

export default PasswordReset;
