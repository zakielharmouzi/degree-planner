import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Menu from "./Menu.jsx";



const Navbar = ({ fname }) => {
    
    const Navigate = useNavigate();

    return (
<nav className="sticky top-0 z-10 bg-white">
        
        <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
        <span className="font-Montserrat">Hi, {fname}! </span>
        <div className="font-Montserrat font-sm flex space-x-4 text-gray-900 ms-auto">
        <motion.button
        initial={{ borderRadius: '10px' }}
        whileHover={{ backgroundColor: '#445858', scale: 1.1, borderRadius: '10px' }}
        whileTap={{ scale: 0.77 }}
        onClick={() => Navigate('/home')}
        >
        Degree Planner
        </motion.button>
        <motion.button
        initial={{ borderRadius: '10px' }}
        whileHover={{ backgroundColor: '#445858', scale: 1.1, borderRadius: '10px' }}
        whileTap={{ scale: 0.77 }}
        onClick={() => Navigate('/GPACalc')}
        >
        GPA Calculator
        </motion.button>
        <Menu />
        </div>
        </div>
        </div>
        </nav>
        
    );
}

export default Navbar;
