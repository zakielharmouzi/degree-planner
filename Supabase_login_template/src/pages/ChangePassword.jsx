import React from 'react';
import { useAuth } from '../../components/Authcontext';

function PasswordReset() {
    return (
        <div className="max-w-sm mx-auto px-4 py-8">

            <h1 className="text-3xl text-slate-800 font-bold mb-6 mt-32">Change your Password</h1>
            <form>
                <div className="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">New Password <span class="text-rose-500">*</span></label>
                        <input type="password" className="pl-3 outline-none border border-gray h-7" />
                        <label class=" block text-sm font-medium mb-1">Confirm New Password <span class="text-rose-500">*</span></label>
                        <input type="password" className="pl-3 outline-none border border-gray h-7 " />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit" className=" bg-[#445858] text-white  py-2 px-4">
                        Reset password
                    </button>
                </div>
                <div className="text-sm">
                    Have an account? <a class="font-medium text-indigo-500 hover:text-indigo-600" href="signin.html">Sign In</a>
                </div>
            </form>

        </div>

    );

}

export default PasswordReset;
