import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/Authcontext';
import { Navigate, useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { HashLoader } from "react-spinners";


function UpdatePassword() {
    const { updatePassword } = useAuth();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [currentpassword, setCurrentPassword] = useState('');
    const [pw, setPw] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const routeChange = () => {
        navigate('/home');
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false); // 
        }, 2500);
    
        return () => clearTimeout(timer);
      }, []);
    

    const handleChange = async (event) => {
        event.preventDefault()
        try {
            const res = await updatePassword(currentpassword,password2);
            if (res === true) {
             routeChange();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {loading && (
                <div className="loader-container flex items-center justify-center h-screen">
                    <HashLoader color="#166432" size={100} />
                </div>
            )}
        <div className="max-w-sm mx-auto px-4 py-8">
            <h1 className="font-Libre text-3xl text-slate-800 font-bold mb-6 mt-32">Update your Password</h1>
            <form onSubmit={handleChange}>
                <div className="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1 font-Montserrat">Current Password <span class="text-rose-500">*</span></label>
                        <input type="password" placeholder="Enter your password"
                            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
                            value={currentpassword} onChange={e => setCurrentPassword(e.target.value)}
                        />

                        <label class="mt-10 block text-sm font-medium mb-1 font-Montserrat">New Password <span class="text-rose-500">*</span></label>
                        <input type="password" placeholder="Enter your password"
                            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <PasswordStrengthBar password={password} />
                        <label class=" block text-sm font-medium mb-1 mt-5 font-Montserrat">Confirm New Password <span class="text-rose-500">*</span></label>
                        <input type="password" placeholder="Confirm your password"
                            className="w-full placeholder:font-Montserrat border border-[#9ca3af] outline-none p-3 h-10"
                            value={password2} onChange={e => { setPassword2(e.target.value) }}
                        />
                        {password && password2 && password !== password2 && <p className='font-Montserrat text-sm text-rose-500'>Your passwords mismatch.</p>}
                        {password && password2 && password === password2 && <p className='font-Montserrat text-sm text-green-500'>Your passwords match.</p>}

                    </div>

                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className="font-Montserrat bg-[#445858] text-white  py-2 px-4">
                        Reset password
                    </button>
                </div>
            </form>

        </div>
        </>
    );

}

export default UpdatePassword;
