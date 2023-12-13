import {
    FiEdit,
    FiChevronDown,
    FiLogOut,
    FiPlusSquare,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { Dispatch, SetStateAction, useState } from "react";
  import { useNavigate} from "react-router-dom";
  import { useAuth } from "../../components/Authcontext";

  
  const Menu = () => {
    const [open, setOpen] = useState(false);
    const Navigate = useNavigate();
    const {signOut} = useAuth();
    const byebye = async (e) => {
        e.preventDefault();
        try {
          signOut();
          Navigate("/");
        } catch (error) {
          console.error("Sign-out failed", error);
          throw error;
        }
      };

    return (
<div className="flex items-center justify-center">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            onClick={() => setOpen((pv) => !pv)}
            className="flex items-center gap-2 px-3 py-2 rounded-md "
          >
            <span className="font-medium font-sm">Settings</span>
            <motion.span 
            variants={iconVariants}>
              <FiChevronDown />
            </motion.span>
          </button>
  
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          >
            <Option setOpen={setOpen} Icon={FiEdit} text="Update Email"  />
            <Option setOpen={setOpen} onClick={() => Navigate('/updatepassword')} Icon={FiPlusSquare} text="Update Password" />
            <Option setOpen={setOpen} onClick={byebye} Icon={FiLogOut} text="Sign out" />
          </motion.ul>
        </motion.div>
      </div>
    );
  };
  
  const Option = ({ text, Icon, onClick}) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={onClick}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md  transition-colors cursor-pointer"
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    );
  };
  
  export default Menu;
  
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };