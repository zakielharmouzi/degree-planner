import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authcontext';
import toast from "react-hot-toast"

function PasswordReset() {

    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            resetPassword(email)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <div className="font-bold">Reset Your Password</div>
                    <h1>Enter the email address associated with your account, and we'll send you a link to reset your password.</h1>
                    <form onSubmit={handleSubmit} action="">
                        <input placeholder="Email" type="email"         onChange={(e) => setEmail(e.target.value)}
 className="border border-[#9ca3af] outline-none p-3 h-10" />
                        <button type="submit" className="mt-5 block bg-[#445858] text-white  py-2 px-4">
                            Reset password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
